// src/lib/wall-panels/request.ts

import { StorefrontWriteError, type StorefrontWriteContext } from "@src/lib/bff/write-security";
import { wooPost } from "@src/lib/woo/client";
import type { WooCreateOrderPayload, WooCreatedOrder } from "@src/lib/woo/types";
import { buildAbsoluteUrl } from "@src/lib/seo/site";
import { getWallPanelProductById } from "@src/lib/wall-panels/products";
import type {
    WallPanelProduct,
    WallPanelRequestErrorResponse,
    WallPanelRequestPayload,
    WallPanelRequestSuccessResponse,
} from "@src/lib/wall-panels/types";

const WALL_PANEL_ORDER_STATUS = "on-hold";
const DEFAULT_COUNTRY_CODE = "RU";
const WALL_PANEL_CONTRACT_VERSION = "mvp-wall-panel-request-v2";

type WallPanelRequestFieldError = NonNullable<WallPanelRequestErrorResponse["errors"]>[number];

type WallPanelRequestValidationResult =
    | { ok: true; value: WallPanelRequestPayload }
    | { ok: false; errors: WallPanelRequestFieldError[] };

function rejectWallPanelRequest(message: string, status = 409, code = "ORDER_REJECTED"): never {
    throw new StorefrontWriteError({
        code,
        status,
        publicMessage: message,
        internalReason: message,
    });
}

function normalizeWhitespace(value: unknown): string {
    return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function normalizePhone(value: unknown): string {
    return normalizeWhitespace(value).replace(/[\s()\-]+/g, "");
}

function normalizeEmail(value: unknown): string {
    return normalizeWhitespace(value).toLowerCase();
}

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeArea(value: unknown): number {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const normalized = value.trim().replace(",", ".");
        const parsed = Number(normalized);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    return 0;
}

function isObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function formatArea(value: number): string {
    return new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: 2,
    }).format(value);
}

function buildPanelSummary(product: WallPanelProduct): string {
    const parts = [
        product.name,
        product.sku ? `SKU: ${product.sku}` : "",
        product.publicArticleNo ? `Артикул: ${product.publicArticleNo}` : "",
    ].filter(Boolean);

    return parts.join(" / ");
}

export function validateWallPanelRequestPayload(rawPayload: unknown): WallPanelRequestValidationResult {
    const payload = isObject(rawPayload) ? rawPayload : {};

    const normalized: WallPanelRequestPayload = {
        productId: Number(payload.productId),
        areaSqm: normalizeArea(payload.areaSqm),
        name: normalizeWhitespace(payload.name),
        phone: normalizePhone(payload.phone),
        email: normalizeEmail(payload.email),
        comment: normalizeWhitespace(payload.comment),
        termsAccepted: payload.termsAccepted === true,
    };

    const errors: WallPanelRequestFieldError[] = [];

    if (!Number.isInteger(normalized.productId) || normalized.productId <= 0) {
        errors.push({ field: "productId", message: "Выберите вариант стеновой панели" });
    }

    if (!Number.isFinite(normalized.areaSqm) || normalized.areaSqm <= 0) {
        errors.push({ field: "areaSqm", message: "Укажите примерную площадь в м²" });
    }

    if (normalized.areaSqm > 10000) {
        errors.push({ field: "areaSqm", message: "Проверьте площадь: значение слишком большое" });
    }

    if (!normalized.phone) {
        errors.push({ field: "phone", message: "Укажите телефон для связи" });
    }

    if (normalized.phone && normalized.phone.length < 6) {
        errors.push({ field: "phone", message: "Проверьте номер телефона" });
    }

    if (normalized.phone.length > 32) {
        errors.push({ field: "phone", message: "Телефон должен быть не длиннее 32 символов" });
    }

    if (normalized.name.length > 120) {
        errors.push({ field: "name", message: "Имя должно быть не длиннее 120 символов" });
    }

    if (normalized.email && !isValidEmail(normalized.email)) {
        errors.push({ field: "email", message: "Проверьте email или оставьте поле пустым" });
    }

    if (normalized.email.length > 254) {
        errors.push({ field: "email", message: "Email должен быть не длиннее 254 символов" });
    }

    if (normalized.comment.length > 700) {
        errors.push({ field: "comment", message: "Комментарий должен быть не длиннее 700 символов" });
    }

    if (!normalized.termsAccepted) {
        errors.push({ field: "termsAccepted", message: "Подтвердите согласие на обработку данных" });
    }

    if (errors.length > 0) {
        return { ok: false, errors };
    }

    return { ok: true, value: normalized };
}

export function getWallPanelRequestErrorMessage(errors: WallPanelRequestFieldError[]): string {
    return errors[0]?.message ?? "Проверьте данные заявки";
}

function buildCustomerNote(payload: WallPanelRequestPayload, product: WallPanelProduct): string {
    const parts = [
        "Заявка на расчёт стеновых панелей.",
        `Выбранный вариант: ${buildPanelSummary(product)}.`,
        `Площадь: ${formatArea(payload.areaSqm)} м².`,
        payload.name ? `Имя: ${payload.name}.` : "",
        `Телефон: ${payload.phone}.`,
        payload.email ? `Email: ${payload.email}.` : "",
        payload.comment ? `Комментарий: ${payload.comment}.` : "",
        "Стоимость рассчитывается менеджером после проверки размеров, раскладки, системы крепления и условий монтажа.",
    ].filter(Boolean);

    return parts.join("\n\n");
}

function buildWooOrderPayload(
    payload: WallPanelRequestPayload,
    product: WallPanelProduct,
    context: StorefrontWriteContext,
): WooCreateOrderPayload {
    const customerName = payload.name || "Клиент";
    const frontendUrl = buildAbsoluteUrl(product.path);

    return {
        status: WALL_PANEL_ORDER_STATUS,
        set_paid: false,
        payment_method: "wall_panel_request",
        payment_method_title: "Расчёт стеновых панелей менеджером",
        billing: {
            first_name: customerName,
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            country: DEFAULT_COUNTRY_CODE,
            phone: payload.phone,
            ...(payload.email ? { email: payload.email } : {}),
        },
        shipping: {
            first_name: customerName,
            last_name: "",
            address_1: "",
            address_2: "",
            city: "",
            country: DEFAULT_COUNTRY_CODE,
        },
        customer_note: buildCustomerNote(payload, product),
        line_items: [],
        meta_data: [
            { key: "_storefront_idempotency_key", value: context.idempotencyKey },
            { key: "_storefront_payload_hash", value: context.payloadHash },
            { key: "_storefront_request_id", value: context.requestId },
            { key: "storefront_endpoint", value: context.endpoint },
            { key: "Источник заказа", value: "Next.js storefront" },
            { key: "Версия wall panels contract", value: WALL_PANEL_CONTRACT_VERSION },
            { key: "order_kind", value: "wall_panel_request" },
            { key: "Тип заявки", value: "Расчёт стеновых панелей" },
            { key: "selected_panel_id", value: product.id },
            { key: "selected_panel_name", value: product.name },
            { key: "selected_panel_slug", value: product.slug },
            { key: "selected_panel_sku", value: product.sku || "—" },
            ...(product.publicArticleNo ? [{ key: "selected_panel_public_article_no", value: product.publicArticleNo }] : []),
            { key: "selected_panel_frontend_url", value: frontendUrl },
            { key: "wall_area_sqm", value: payload.areaSqm },
            { key: "Площадь стены, м²", value: formatArea(payload.areaSqm) },
            { key: "customer_name", value: payload.name || "—" },
            { key: "customer_phone", value: payload.phone },
            ...(payload.email ? [{ key: "customer_email", value: payload.email }] : []),
            ...(payload.comment ? [{ key: "customer_comment", value: payload.comment }] : []),
            { key: "Согласие на обработку данных", value: payload.termsAccepted },
        ],
    };
}

export async function createWallPanelRequestOrder(
    payload: WallPanelRequestPayload,
    context: StorefrontWriteContext,
): Promise<WallPanelRequestSuccessResponse & { idempotencyReplayed?: boolean }> {
    const validation = validateWallPanelRequestPayload(payload);

    if (!validation.ok) {
        rejectWallPanelRequest(getWallPanelRequestErrorMessage(validation.errors), 422, "VALIDATION_ERROR");
    }

    const product = await getWallPanelProductById(validation.value.productId);

    if (!product) {
        rejectWallPanelRequest("Выбранная стеновая панель не найдена или не опубликована", 409);
    }

    const wooPayload = buildWooOrderPayload(validation.value, product, context);
    const order = await wooPost<WooCreateOrderPayload, WooCreatedOrder>("orders", wooPayload, {
        headers: {
            "X-Storefront-Request-Id": context.requestId,
            "X-Storefront-Idempotency-Key": context.idempotencyKey,
        },
    });

    return {
        success: true,
        orderId: order.id,
        orderNumber: order.number,
        status: order.status,
        idempotencyReplayed: order.storefront_idempotency_replayed === true,
    };
}
