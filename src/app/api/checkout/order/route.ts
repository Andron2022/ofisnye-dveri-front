// src/app/api/checkout/order/route.ts

import { NextRequest, NextResponse } from "next/server";
import type { CheckoutOrderErrorCode, CheckoutOrderErrorResponse } from "@src/lib/checkout/types";
import { getCheckoutErrorMessage, validateCheckoutOrderRequest } from "@src/lib/checkout/validation";
import {
    buildPayloadHash,
    buildWriteResponseHeaders,
    createWriteRequestId,
    getClientIpHash,
    getWriteGuardConfig,
    logWriteEvent,
    prepareWriteRequest,
    runIdempotentWrite,
    StorefrontWriteError,
    type RateLimitSnapshot,
    type StorefrontWriteContext,
} from "@src/lib/bff/write-security";
import { isWooRestError } from "@src/lib/woo/client";
import { createCheckoutOrder } from "@src/lib/woo/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENDPOINT = "checkout-order" as const;

type PublicOrderError = {
    code: CheckoutOrderErrorCode;
    status: number;
    message: string;
    retryAfterSeconds?: number;
};

function getWooRetryAfter(error: unknown): number | undefined {
    if (!isWooRestError(error) || !error.details || typeof error.details !== "object") return undefined;

    const data = (error.details as { data?: unknown }).data;
    if (!data || typeof data !== "object") return undefined;

    const value = Number((data as { retry_after?: unknown }).retry_after);
    return Number.isFinite(value) && value > 0 ? Math.ceil(value) : undefined;
}

function normalizeOrderError(error: unknown): PublicOrderError {
    if (error instanceof StorefrontWriteError) {
        const knownCodes = new Set<CheckoutOrderErrorCode>([
            "VALIDATION_ERROR",
            "REQUEST_REJECTED",
            "RATE_LIMITED",
            "IDEMPOTENCY_CONFLICT",
            "ORDER_IN_PROGRESS",
            "ORDER_REJECTED",
            "ORDER_CREATE_ERROR",
        ]);

        return {
            code: knownCodes.has(error.code as CheckoutOrderErrorCode)
                ? error.code as CheckoutOrderErrorCode
                : "REQUEST_REJECTED",
            status: error.status,
            message: error.publicMessage,
            retryAfterSeconds: error.retryAfterSeconds,
        };
    }

    if (isWooRestError(error)) {
        if (error.code === "storefront_order_in_progress") {
            return {
                code: "ORDER_IN_PROGRESS",
                status: 409,
                message: "Заказ уже создаётся. Подождите пару секунд и повторите.",
                retryAfterSeconds: getWooRetryAfter(error) ?? 2,
            };
        }

        if (error.code === "storefront_idempotency_conflict") {
            return {
                code: "IDEMPOTENCY_CONFLICT",
                status: 409,
                message: "Повторная отправка содержит другие данные. Обновите страницу и попробуйте ещё раз.",
            };
        }

        return {
            code: "ORDER_CREATE_ERROR",
            status: 502,
            message: "Сервис заказов временно недоступен. Повторите попытку позже.",
        };
    }

    return {
        code: "ORDER_CREATE_ERROR",
        status: 500,
        message: "Не удалось оформить заказ. Повторите попытку позже.",
    };
}

export async function POST(request: NextRequest) {
    const startedAt = Date.now();
    const requestId = createWriteRequestId();
    let ipHash = "unavailable";
    let rateLimit: RateLimitSnapshot | undefined;
    let idempotencyKey: string | undefined;

    try {
        ipHash = getClientIpHash(request);
        const prepared = await prepareWriteRequest(
            request,
            requestId,
            ipHash,
            getWriteGuardConfig(ENDPOINT),
        );

        rateLimit = prepared.rateLimit;
        idempotencyKey = prepared.idempotencyKey;

        const validation = validateCheckoutOrderRequest(prepared.rawPayload);
        if (!validation.ok) {
            const response: CheckoutOrderErrorResponse = {
                success: false,
                code: "VALIDATION_ERROR",
                message: getCheckoutErrorMessage(validation.errors),
                errors: validation.errors,
                requestId,
            };

            logWriteEvent({
                level: "warn",
                event: "validation-rejected",
                endpoint: ENDPOINT,
                requestId,
                ipHash,
                idempotencyKey,
                status: 422,
                durationMs: Date.now() - startedAt,
            });

            return NextResponse.json(response, {
                status: 422,
                headers: buildWriteResponseHeaders({ requestId, rateLimit }),
            });
        }

        const payloadHash = buildPayloadHash(validation.value);
        const context: StorefrontWriteContext = {
            requestId,
            idempotencyKey: prepared.idempotencyKey,
            payloadHash,
            ipHash,
            endpoint: ENDPOINT,
        };

        const operation = await runIdempotentWrite({
            endpoint: ENDPOINT,
            idempotencyKey: prepared.idempotencyKey,
            payloadHash,
            loader: () => createCheckoutOrder(validation.value, context),
        });
        const replayed = operation.replayed || operation.value.idempotencyReplayed === true;
        const responseBody = {
            success: true as const,
            orderId: operation.value.orderId,
            orderNumber: operation.value.orderNumber,
            status: operation.value.status,
            total: operation.value.total,
            successPath: operation.value.successPath,
        };

        logWriteEvent({
            level: "info",
            event: replayed ? "order-replayed" : "order-created",
            endpoint: ENDPOINT,
            requestId,
            ipHash,
            idempotencyKey,
            status: replayed ? 200 : 201,
            durationMs: Date.now() - startedAt,
            replayed,
        });

        return NextResponse.json(responseBody, {
            status: replayed ? 200 : 201,
            headers: buildWriteResponseHeaders({ requestId, rateLimit, replayed }),
        });
    } catch (error) {
        const normalized = normalizeOrderError(error);
        const response: CheckoutOrderErrorResponse = {
            success: false,
            code: normalized.code,
            message: normalized.message,
            requestId,
        };

        logWriteEvent({
            level: normalized.status >= 500 ? "error" : "warn",
            event: "order-rejected",
            endpoint: ENDPOINT,
            requestId,
            ipHash,
            idempotencyKey,
            status: normalized.status,
            durationMs: Date.now() - startedAt,
            error,
        });

        return NextResponse.json(response, {
            status: normalized.status,
            headers: buildWriteResponseHeaders({
                requestId,
                rateLimit: error instanceof StorefrontWriteError ? error.rateLimit ?? rateLimit : rateLimit,
                retryAfterSeconds: normalized.retryAfterSeconds,
            }),
        });
    }
}
