// src/app/api/wall-panels/request/route.ts

import { NextRequest, NextResponse } from "next/server";
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
import type { WallPanelRequestErrorResponse } from "@src/lib/wall-panels/types";
import {
    createWallPanelRequestOrder,
    getWallPanelRequestErrorMessage,
    validateWallPanelRequestPayload,
} from "@src/lib/wall-panels/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENDPOINT = "wall-panel-request" as const;

type PublicRequestError = {
    code: string;
    status: number;
    message: string;
    retryAfterSeconds?: number;
};

function normalizeRequestError(error: unknown): PublicRequestError {
    if (error instanceof StorefrontWriteError) {
        return {
            code: error.code,
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
                message: "Заявка уже создаётся. Подождите пару секунд и повторите.",
                retryAfterSeconds: 2,
            };
        }

        if (error.code === "storefront_idempotency_conflict") {
            return {
                code: "IDEMPOTENCY_CONFLICT",
                status: 409,
                message: "Повторная отправка содержит другие данные. Закройте форму и заполните её заново.",
            };
        }

        return {
            code: "ORDER_CREATE_ERROR",
            status: 502,
            message: "Сервис заявок временно недоступен. Повторите попытку позже.",
        };
    }

    return {
        code: "ORDER_CREATE_ERROR",
        status: 500,
        message: "Не удалось отправить заявку. Повторите попытку позже.",
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

        const validation = validateWallPanelRequestPayload(prepared.rawPayload);
        if (!validation.ok) {
            const response: WallPanelRequestErrorResponse = {
                success: false,
                code: "VALIDATION_ERROR",
                message: getWallPanelRequestErrorMessage(validation.errors),
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
            loader: () => createWallPanelRequestOrder(validation.value, context),
        });
        const replayed = operation.replayed || operation.value.idempotencyReplayed === true;
        const responseBody = {
            success: true as const,
            orderId: operation.value.orderId,
            orderNumber: operation.value.orderNumber,
            status: operation.value.status,
        };

        logWriteEvent({
            level: "info",
            event: replayed ? "request-replayed" : "request-created",
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
        const normalized = normalizeRequestError(error);
        const response: WallPanelRequestErrorResponse = {
            success: false,
            code: normalized.code,
            message: normalized.message,
            requestId,
        };

        logWriteEvent({
            level: normalized.status >= 500 ? "error" : "warn",
            event: "request-rejected",
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
