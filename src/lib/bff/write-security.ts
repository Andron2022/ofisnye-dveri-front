// src/lib/bff/write-security.ts

import { createHash, createHmac, randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";

export type StorefrontWriteEndpoint = "checkout-order" | "wall-panel-request";

export type StorefrontWriteContext = {
    requestId: string;
    idempotencyKey: string;
    payloadHash: string;
    ipHash: string;
    endpoint: StorefrontWriteEndpoint;
};

export type RateLimitSnapshot = {
    limit: number;
    remaining: number;
    resetAt: number;
};

export type PreparedWriteRequest = {
    rawPayload: unknown;
    requestId: string;
    idempotencyKey: string;
    ipHash: string;
    rateLimit: RateLimitSnapshot;
};

type WriteGuardConfig = {
    endpoint: StorefrontWriteEndpoint;
    maxBodyBytes: number;
    rateLimit: number;
    rateWindowMs: number;
};

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

type IdempotencyEntry<T> = {
    payloadHash: string;
    expiresAt: number;
    promise: Promise<T>;
};

type WriteSecurityGlobal = typeof globalThis & {
    __odBffRateLimits?: Map<string, RateLimitEntry>;
    __odBffIdempotency?: Map<string, IdempotencyEntry<unknown>>;
    __odBffCleanupCounter?: number;
};

const securityGlobal = globalThis as WriteSecurityGlobal;
const rateLimitStore = securityGlobal.__odBffRateLimits ?? new Map<string, RateLimitEntry>();
const idempotencyStore = securityGlobal.__odBffIdempotency ?? new Map<string, IdempotencyEntry<unknown>>();

securityGlobal.__odBffRateLimits = rateLimitStore;
securityGlobal.__odBffIdempotency = idempotencyStore;
securityGlobal.__odBffCleanupCounter ??= 0;

const IDEMPOTENCY_TTL_MS = 10 * 60 * 1000;
const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{15,127}$/;
const MIN_FORM_FILL_TIME_MS = 800;
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const MAX_IDEMPOTENCY_ENTRIES = 5_000;

export class StorefrontWriteError extends Error {
    readonly code: string;
    readonly status: number;
    readonly publicMessage: string;
    readonly retryAfterSeconds?: number;
    readonly internalReason?: string;
    readonly rateLimit?: RateLimitSnapshot;

    constructor(args: {
        code: string;
        status: number;
        publicMessage: string;
        retryAfterSeconds?: number;
        internalReason?: string;
        rateLimit?: RateLimitSnapshot;
    }) {
        super(args.internalReason ?? args.publicMessage);
        this.name = "StorefrontWriteError";
        this.code = args.code;
        this.status = args.status;
        this.publicMessage = args.publicMessage;
        this.retryAfterSeconds = args.retryAfterSeconds;
        this.internalReason = args.internalReason;
        this.rateLimit = args.rateLimit;
    }
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function getWriteGuardConfig(endpoint: StorefrontWriteEndpoint): WriteGuardConfig {
    const rateWindowMs = parsePositiveInteger(process.env.BFF_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000);

    if (endpoint === "checkout-order") {
        return {
            endpoint,
            maxBodyBytes: 64 * 1024,
            rateLimit: parsePositiveInteger(process.env.BFF_CHECKOUT_RATE_LIMIT, 5),
            rateWindowMs,
        };
    }

    return {
        endpoint,
        maxBodyBytes: 16 * 1024,
        rateLimit: parsePositiveInteger(process.env.BFF_WALL_PANEL_RATE_LIMIT, 8),
        rateWindowMs,
    };
}

function getSecuritySecret(): string {
    const configured = process.env.BFF_SECURITY_SECRET?.trim();
    if (configured) return configured;

    if (process.env.NODE_ENV === "production") {
        throw new StorefrontWriteError({
            code: "BFF_CONFIG_ERROR",
            status: 503,
            publicMessage: "Сервис оформления временно недоступен. Попробуйте позже.",
            internalReason: "BFF_SECURITY_SECRET is required in production",
        });
    }

    return "local-development-only-change-before-production";
}

function normalizeOrigin(value: string | null | undefined): string | null {
    if (!value?.trim()) return null;

    try {
        return new URL(value.trim()).origin;
    } catch {
        return null;
    }
}

function getForwardedOrigin(request: NextRequest): string | null {
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const host = forwardedHost || request.headers.get("host")?.trim();
    if (!host) return null;

    const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const protocol = forwardedProto || request.nextUrl.protocol.replace(":", "") || "https";

    return normalizeOrigin(`${protocol}://${host}`);
}

function getAllowedOrigins(request: NextRequest): Set<string> {
    const allowed = new Set<string>();
    const candidates = [
        process.env.NEXT_PUBLIC_SITE_URL,
        process.env.SITE_URL,
        request.nextUrl.origin,
        getForwardedOrigin(request),
        ...(process.env.BFF_ALLOWED_ORIGINS?.split(",") ?? []),
    ];

    for (const candidate of candidates) {
        const origin = normalizeOrigin(candidate);
        if (origin) allowed.add(origin);
    }

    return allowed;
}

function assertAllowedOrigin(request: NextRequest): void {
    const fetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();
    if (fetchSite === "cross-site") {
        throw new StorefrontWriteError({
            code: "REQUEST_ORIGIN_REJECTED",
            status: 403,
            publicMessage: "Не удалось обработать запрос. Обновите страницу и попробуйте ещё раз.",
            internalReason: "sec-fetch-site reported cross-site",
        });
    }

    const rawOrigin = request.headers.get("origin");
    const requireOrigin = process.env.BFF_REQUIRE_ORIGIN === "1" || process.env.BFF_REQUIRE_ORIGIN === "true";

    if (!rawOrigin) {
        if (requireOrigin) {
            throw new StorefrontWriteError({
                code: "REQUEST_ORIGIN_REQUIRED",
                status: 403,
                publicMessage: "Не удалось обработать запрос. Обновите страницу и попробуйте ещё раз.",
                internalReason: "Origin header is required but missing",
            });
        }
        return;
    }

    const origin = normalizeOrigin(rawOrigin);
    if (!origin || !getAllowedOrigins(request).has(origin)) {
        throw new StorefrontWriteError({
            code: "REQUEST_ORIGIN_REJECTED",
            status: 403,
            publicMessage: "Не удалось обработать запрос. Обновите страницу и попробуйте ещё раз.",
            internalReason: `Origin is not allowed: ${rawOrigin}`,
        });
    }
}

function getClientIp(request: NextRequest): string {
    const candidates = [
        request.headers.get("cf-connecting-ip"),
        request.headers.get("x-real-ip"),
        request.headers.get("x-forwarded-for")?.split(",")[0],
    ];

    const value = candidates.find((candidate) => candidate?.trim())?.trim() ?? "unknown";
    return value.slice(0, 128);
}

export function hashIdentifier(value: string): string {
    return createHmac("sha256", getSecuritySecret()).update(value).digest("hex").slice(0, 24);
}

export function getClientIpHash(request: NextRequest): string {
    return hashIdentifier(getClientIp(request));
}

export function createWriteRequestId(): string {
    return randomUUID();
}

export function buildPayloadHash(payload: unknown): string {
    return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

function evictOldestEntry<T>(store: Map<string, T>, maxEntries: number): void {
    if (store.size < maxEntries) return;

    const oldestKey = store.keys().next().value as string | undefined;
    if (oldestKey) store.delete(oldestKey);
}

function maybeCleanupStores(now: number): void {
    securityGlobal.__odBffCleanupCounter = (securityGlobal.__odBffCleanupCounter ?? 0) + 1;
    if (securityGlobal.__odBffCleanupCounter % 50 !== 0) return;

    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.resetAt <= now) rateLimitStore.delete(key);
    }

    for (const [key, entry] of idempotencyStore.entries()) {
        if (entry.expiresAt <= now) idempotencyStore.delete(key);
    }
}

function consumeRateLimit(
    endpoint: StorefrontWriteEndpoint,
    ipHash: string,
    limit: number,
    windowMs: number,
): RateLimitSnapshot {
    const now = Date.now();
    maybeCleanupStores(now);

    const key = `${endpoint}:${ipHash}`;
    const current = rateLimitStore.get(key);
    const entry = !current || current.resetAt <= now
        ? { count: 0, resetAt: now + windowMs }
        : current;

    entry.count += 1;
    if (!current) evictOldestEntry(rateLimitStore, MAX_RATE_LIMIT_ENTRIES);
    rateLimitStore.set(key, entry);

    const snapshot: RateLimitSnapshot = {
        limit,
        remaining: Math.max(0, limit - entry.count),
        resetAt: entry.resetAt,
    };

    if (entry.count > limit) {
        const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
        throw new StorefrontWriteError({
            code: "RATE_LIMITED",
            status: 429,
            publicMessage: "Слишком много попыток отправки. Подождите немного и повторите.",
            retryAfterSeconds,
            internalReason: `Rate limit exceeded for ${endpoint}`,
            rateLimit: snapshot,
        });
    }

    return snapshot;
}

function getIdempotencyKey(request: NextRequest): string {
    const key = request.headers.get("idempotency-key")?.trim() ?? "";

    if (!IDEMPOTENCY_KEY_PATTERN.test(key)) {
        throw new StorefrontWriteError({
            code: "IDEMPOTENCY_KEY_INVALID",
            status: 400,
            publicMessage: "Не удалось подготовить повторную отправку. Обновите страницу и попробуйте ещё раз.",
            internalReason: "Missing or invalid Idempotency-Key header",
        });
    }

    return key;
}

function assertJsonContentType(request: NextRequest): void {
    const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
    if (!contentType.startsWith("application/json")) {
        throw new StorefrontWriteError({
            code: "UNSUPPORTED_MEDIA_TYPE",
            status: 415,
            publicMessage: "Некорректный формат запроса.",
            internalReason: `Unsupported content-type: ${contentType || "missing"}`,
        });
    }
}

function assertContentLength(request: NextRequest, maxBodyBytes: number): void {
    const rawLength = request.headers.get("content-length");
    if (!rawLength) return;

    const contentLength = Number(rawLength);
    if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
        throw new StorefrontWriteError({
            code: "PAYLOAD_TOO_LARGE",
            status: 413,
            publicMessage: "Запрос слишком большой. Сократите комментарии и повторите отправку.",
            internalReason: `Content-Length ${contentLength} exceeds ${maxBodyBytes}`,
        });
    }
}

function isObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertAntiAbuseFields(payload: unknown): void {
    if (!isObject(payload) || !isObject(payload.antiAbuse)) {
        throw new StorefrontWriteError({
            code: "REQUEST_REJECTED",
            status: 400,
            publicMessage: "Не удалось обработать запрос. Обновите страницу и попробуйте ещё раз.",
            internalReason: "Anti-abuse fields are missing",
        });
    }

    if (typeof payload.antiAbuse.website !== "string") {
        throw new StorefrontWriteError({
            code: "REQUEST_REJECTED",
            status: 400,
            publicMessage: "Не удалось обработать запрос. Обновите страницу и попробуйте ещё раз.",
            internalReason: "Honeypot field has an invalid type",
        });
    }

    if (payload.antiAbuse.website.trim()) {
        throw new StorefrontWriteError({
            code: "REQUEST_REJECTED",
            status: 400,
            publicMessage: "Не удалось обработать запрос. Обновите страницу и попробуйте ещё раз.",
            internalReason: "Honeypot field was filled",
        });
    }

    const startedAt = Number(payload.antiAbuse.startedAt);
    const elapsedMs = Date.now() - startedAt;

    if (!Number.isFinite(startedAt) || startedAt <= 0 || elapsedMs < MIN_FORM_FILL_TIME_MS || elapsedMs > 24 * 60 * 60 * 1000) {
        throw new StorefrontWriteError({
            code: "REQUEST_REJECTED",
            status: 400,
            publicMessage: "Не удалось обработать запрос. Обновите страницу и попробуйте ещё раз.",
            internalReason: `Invalid form fill time: ${elapsedMs}`,
        });
    }
}

async function readJsonBody(request: NextRequest, maxBodyBytes: number): Promise<unknown> {
    if (!request.body) {
        throw new StorefrontWriteError({
            code: "INVALID_JSON",
            status: 400,
            publicMessage: "Получен пустой запрос.",
            internalReason: "Request body is empty",
        });
    }

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;

        totalBytes += value.byteLength;
        if (totalBytes > maxBodyBytes) {
            await reader.cancel().catch(() => undefined);
            throw new StorefrontWriteError({
                code: "PAYLOAD_TOO_LARGE",
                status: 413,
                publicMessage: "Запрос слишком большой. Сократите комментарии и повторите отправку.",
                internalReason: `Streamed body size exceeds ${maxBodyBytes}`,
            });
        }

        chunks.push(value);
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }

    const bodyText = new TextDecoder().decode(bytes);
    if (!bodyText.trim()) {
        throw new StorefrontWriteError({
            code: "INVALID_JSON",
            status: 400,
            publicMessage: "Получен пустой запрос.",
            internalReason: "Request body is empty",
        });
    }

    try {
        return JSON.parse(bodyText) as unknown;
    } catch {
        throw new StorefrontWriteError({
            code: "INVALID_JSON",
            status: 400,
            publicMessage: "Некорректный формат запроса.",
            internalReason: "Request body is not valid JSON",
        });
    }
}

export async function prepareWriteRequest(
    request: NextRequest,
    requestId: string,
    ipHash: string,
    config: WriteGuardConfig,
): Promise<PreparedWriteRequest> {
    assertAllowedOrigin(request);
    assertJsonContentType(request);
    assertContentLength(request, config.maxBodyBytes);

    const idempotencyKey = getIdempotencyKey(request);
    const rateLimit = consumeRateLimit(config.endpoint, ipHash, config.rateLimit, config.rateWindowMs);
    const rawPayload = await readJsonBody(request, config.maxBodyBytes);

    assertAntiAbuseFields(rawPayload);

    return {
        rawPayload,
        requestId,
        idempotencyKey,
        ipHash,
        rateLimit,
    };
}

export async function runIdempotentWrite<T>(args: {
    endpoint: StorefrontWriteEndpoint;
    idempotencyKey: string;
    payloadHash: string;
    loader: () => Promise<T>;
}): Promise<{ value: T; replayed: boolean }> {
    const now = Date.now();
    maybeCleanupStores(now);

    const key = `${args.endpoint}:${args.idempotencyKey}`;
    const existing = idempotencyStore.get(key) as IdempotencyEntry<T> | undefined;

    if (existing && existing.expiresAt > now) {
        if (existing.payloadHash !== args.payloadHash) {
            throw new StorefrontWriteError({
                code: "IDEMPOTENCY_CONFLICT",
                status: 409,
                publicMessage: "Повторная отправка содержит другие данные. Обновите страницу и попробуйте ещё раз.",
                internalReason: `Idempotency key payload mismatch for ${args.endpoint}`,
            });
        }

        return {
            value: await existing.promise,
            replayed: true,
        };
    }

    const promise = args.loader().catch((error) => {
        idempotencyStore.delete(key);
        throw error;
    });

    evictOldestEntry(idempotencyStore, MAX_IDEMPOTENCY_ENTRIES);
    idempotencyStore.set(key, {
        payloadHash: args.payloadHash,
        expiresAt: now + IDEMPOTENCY_TTL_MS,
        promise: promise as Promise<unknown>,
    });

    return {
        value: await promise,
        replayed: false,
    };
}

export function buildWriteResponseHeaders(args: {
    requestId: string;
    rateLimit?: RateLimitSnapshot;
    retryAfterSeconds?: number;
    replayed?: boolean;
}): Record<string, string> {
    const headers: Record<string, string> = {
        "Cache-Control": "no-store",
        "X-Request-Id": args.requestId,
    };

    if (args.rateLimit) {
        headers["X-RateLimit-Limit"] = String(args.rateLimit.limit);
        headers["X-RateLimit-Remaining"] = String(args.rateLimit.remaining);
        headers["X-RateLimit-Reset"] = String(Math.ceil(args.rateLimit.resetAt / 1000));
    }

    if (args.retryAfterSeconds) {
        headers["Retry-After"] = String(args.retryAfterSeconds);
    }

    if (args.replayed) {
        headers["X-Idempotent-Replay"] = "true";
    }

    return headers;
}

export function logWriteEvent(args: {
    level: "info" | "warn" | "error";
    event: string;
    endpoint: StorefrontWriteEndpoint;
    requestId: string;
    ipHash: string;
    idempotencyKey?: string;
    status: number;
    durationMs: number;
    error?: unknown;
    replayed?: boolean;
}): void {
    const error = args.error instanceof Error
        ? { name: args.error.name, message: args.error.message }
        : args.error === undefined
            ? undefined
            : { message: String(args.error) };

    const record = {
        scope: "storefront-write",
        event: args.event,
        endpoint: args.endpoint,
        requestId: args.requestId,
        ipHash: args.ipHash,
        idempotencyKeyHash: args.idempotencyKey ? hashIdentifier(args.idempotencyKey) : undefined,
        status: args.status,
        durationMs: args.durationMs,
        replayed: args.replayed,
        error,
    };

    const line = JSON.stringify(record);
    if (args.level === "error") console.error(line);
    else if (args.level === "warn") console.warn(line);
    else console.info(line);
}
