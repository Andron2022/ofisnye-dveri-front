// src/lib/woo/client.ts

import type { WooListResponse } from "@src/lib/woo/types";

// -----------------------------------------------------
// Низкоуровневый Woo / WP client.
// Его задача:
// 1) собрать URL к REST API
// 2) добавить нужные headers
// 3) отдать JSON или понятную ошибку
// -----------------------------------------------------

type QueryPrimitive = string | number | boolean;

type QueryValue = QueryPrimitive | QueryPrimitive[] | null | undefined;

type QueryParams = Record<string, QueryValue>;

export class WooRestError extends Error {
    readonly status: number;
    readonly code?: string;
    readonly details?: unknown;

    constructor(args: { status: number; message: string; code?: string; details?: unknown }) {
        super(args.message);
        this.name = "WooRestError";
        this.status = args.status;
        this.code = args.code;
        this.details = args.details;
    }
}

export function isWooRestError(error: unknown): error is WooRestError {
    return error instanceof WooRestError;
}

const DEFAULT_REVALIDATE_SECONDS = 60;
const REST_DEBUG_ENV = "WP_REST_DEBUG";
const REST_TIMEOUT_ENV = "WP_REST_TIMEOUT_MS";
const REST_RETRY_COUNT_ENV = "WP_REST_RETRY_COUNT";
const DEFAULT_GET_RETRY_COUNT = 1;

let restRequestCounter = 0;

type MemoryCacheEntry<T> = {
    expiresAt: number;
    promise: Promise<T>;
};

const restMemoryCache = new Map<string, MemoryCacheEntry<unknown>>();

function getCacheTtlMs(revalidateSeconds: number): number {
    if (!Number.isFinite(revalidateSeconds) || revalidateSeconds <= 0) return 0;

    return revalidateSeconds * 1000;
}

function getCachedRestResult<T>(key: string, revalidateSeconds: number, loader: () => Promise<T>): Promise<T> {
    const ttlMs = getCacheTtlMs(revalidateSeconds);

    if (ttlMs <= 0) {
        return loader();
    }

    const now = Date.now();
    const existing = restMemoryCache.get(key);

    if (existing && existing.expiresAt > now) {
        return existing.promise as Promise<T>;
    }

    const promise = loader().catch((error) => {
        restMemoryCache.delete(key);
        throw error;
    });

    restMemoryCache.set(key, {
        expiresAt: now + ttlMs,
        promise: promise as Promise<unknown>,
    });

    return promise;
}

function isRestDebugEnabled(): boolean {
    return process.env[REST_DEBUG_ENV] === "1";
}

function getRequestTimeoutMs(): number | null {
    const rawValue = process.env[REST_TIMEOUT_ENV];
    if (!rawValue) return null;

    const value = Number(rawValue);
    return Number.isFinite(value) && value > 0 ? value : null;
}

function getRetryCount(method: RestFetchOptions["method"]): number {
    if (method !== "GET") return 0;

    const rawValue = process.env[REST_RETRY_COUNT_ENV];
    if (!rawValue) return DEFAULT_GET_RETRY_COUNT;

    const value = Number(rawValue);
    return Number.isFinite(value) && value >= 0 ? Math.floor(value) : DEFAULT_GET_RETRY_COUNT;
}

function getErrorName(error: unknown): string | null {
    return error instanceof Error ? error.name : null;
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

function getErrorCauseCode(error: unknown): string | null {
    if (!(error instanceof Error) || typeof error.cause !== "object" || error.cause === null) return null;

    const cause = error.cause as { code?: unknown };
    return typeof cause.code === "string" ? cause.code : null;
}

function isRetriableRestError(error: unknown): boolean {
    const name = getErrorName(error);
    const message = getErrorMessage(error).toLowerCase();
    const causeCode = getErrorCauseCode(error);

    return (
        name === "AbortError" ||
        name === "TimeoutError" ||
        message.includes("fetch failed") ||
        message.includes("operation was aborted") ||
        causeCode === "UND_ERR_CONNECT_TIMEOUT" ||
        causeCode === "UND_ERR_HEADERS_TIMEOUT" ||
        causeCode === "UND_ERR_SOCKET"
    );
}

function getSafeUrlForLog(rawUrl: string): string {
    try {
        const url = new URL(rawUrl);
        if (url.username || url.password) {
            url.username = "***";
            url.password = "***";
        }
        return url.toString();
    } catch {
        return rawUrl;
    }
}

type RestFetchOptions = {
    method: "GET" | "POST";
    headers: HeadersInit;
    revalidateSeconds?: number;
    body?: string;
    cache?: RequestCache;
    label: "Woo REST" | "WP REST";
};

async function fetchRest(url: string, options: RestFetchOptions): Promise<Response> {
    const requestId = ++restRequestCounter;
    const debugEnabled = isRestDebugEnabled();
    const timeoutMs = getRequestTimeoutMs();
    const startedAt = Date.now();
    const safeUrl = getSafeUrlForLog(url);
    const retryCount = getRetryCount(options.method);
    const totalAttempts = retryCount + 1;
    let lastError: unknown;

    for (let attempt = 1; attempt <= totalAttempts; attempt += 1) {
        const controller = timeoutMs ? new AbortController() : undefined;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (timeoutMs && controller) {
            timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        }

        if (debugEnabled) {
            console.log(`[${options.label} #${requestId}] START ${options.method} attempt ${attempt}/${totalAttempts} ${safeUrl}`);
        }

        try {
            const response = await fetch(url, {
                method: options.method,
                headers: options.headers,
                body: options.body,
                cache: options.cache,
                next: options.revalidateSeconds === undefined ? undefined : {
                    revalidate: options.revalidateSeconds,
                },
                signal: controller?.signal,
            });

            if (debugEnabled) {
                console.log(`[${options.label} #${requestId}] END ${response.status} ${Date.now() - startedAt}ms attempt ${attempt}/${totalAttempts} ${safeUrl}`);
            }

            return response;
        } catch (error) {
            lastError = error;
            const canRetry = attempt < totalAttempts && isRetriableRestError(error);

            if (debugEnabled) {
                const log = canRetry ? console.warn : console.error;
                log(
                    `[${options.label} #${requestId}] ERROR ${Date.now() - startedAt}ms attempt ${attempt}/${totalAttempts}${canRetry ? " RETRY" : ""} ${safeUrl}`,
                    error,
                );
            }

            if (!canRetry) {
                throw error;
            }
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
        }
    }

    throw lastError;
}

function getRequiredEnv(name: string): string {
    const value = process.env[name];
    
    if (!value) {
        throw new Error(`Отсутствует обязательная переменная окружения: ${name}`);
    }
    
    return value;
}

function normalizeBaseUrl(url: string): string {
    return url.replace(/\/+$/, "");
}

function appendQuery(url: URL, query: QueryParams = {}): void {
    for (const [key, rawValue] of Object.entries(query)) {
        if (rawValue === undefined || rawValue === null || rawValue === "") {
            continue;
        }
        
        if (Array.isArray(rawValue)) {
            for (const value of rawValue) {
                url.searchParams.append(key, String(value));
            }
            continue;
        }
        
        url.searchParams.set(key, String(rawValue));
    }
}

function buildWooUrl(path: string, query: QueryParams = {}): string {
    const baseUrl = normalizeBaseUrl(getRequiredEnv("WORDPRESS_URL"));
    const normalizedPath = path.replace(/^\/+/, "");
    const url = new URL(`/wp-json/wc/v3/${normalizedPath}`, baseUrl);
    
    appendQuery(url, query);
    
    return url.toString();
}

function buildWpUrl(path: string, query: QueryParams = {}): string {
    const baseUrl = normalizeBaseUrl(getRequiredEnv("WORDPRESS_URL"));
    const normalizedPath = path.replace(/^\/+/, "");
    const url = new URL(`/wp-json/wp/v2/${normalizedPath}`, baseUrl);
    
    appendQuery(url, query);
    
    return url.toString();
}

function buildAuthorizationHeader(mode: "read" | "write" = "read"): string {
    const writeKey = process.env.WC_WRITE_CONSUMER_KEY?.trim();
    const writeSecret = process.env.WC_WRITE_CONSUMER_SECRET?.trim();

    if (mode === "write" && Boolean(writeKey) !== Boolean(writeSecret)) {
        throw new Error("WC_WRITE_CONSUMER_KEY and WC_WRITE_CONSUMER_SECRET must be configured together");
    }

    const key = mode === "write" && writeKey ? writeKey : getRequiredEnv("WC_CONSUMER_KEY");
    const secret = mode === "write" && writeSecret ? writeSecret : getRequiredEnv("WC_CONSUMER_SECRET");
    const token = Buffer.from(`${key}:${secret}`).toString("base64");

    return `Basic ${token}`;
}

async function buildHttpError(response: Response): Promise<WooRestError> {
    let details: unknown;
    let code: string | undefined;
    let publicMessage = response.statusText || "REST request failed";

    try {
        const bodyText = await response.text();
        if (bodyText) {
            try {
                details = JSON.parse(bodyText) as unknown;
            } catch {
                details = bodyText;
            }

            if (details && typeof details === "object" && !Array.isArray(details)) {
                const body = details as { code?: unknown; message?: unknown };
                if (typeof body.code === "string") code = body.code;
                if (typeof body.message === "string" && body.message.trim()) publicMessage = body.message.trim();
            }
        }
    } catch {
        // Keep the HTTP status when the error body cannot be read.
    }

    return new WooRestError({
        status: response.status,
        code,
        message: `Woo/WP API request failed (${response.status}): ${publicMessage}`,
        details,
    });
}

export async function wooGet<T>(
    path: string,
    query: QueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<T> {
    const url = buildWooUrl(path, query);

    return getCachedRestResult<T>(`woo:get:${url}`, revalidateSeconds, async () => {
        const response = await fetchRest(url, {
            method: "GET",
            headers: {
                Authorization: buildAuthorizationHeader(),
                Accept: "application/json",
            },
            revalidateSeconds,
            label: "Woo REST",
        });

        if (!response.ok) {
            throw await buildHttpError(response);
        }

        return (await response.json()) as T;
    });
}

export async function wooGetList<T>(
    path: string,
    query: QueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<WooListResponse<T>> {
    const url = buildWooUrl(path, query);

    return getCachedRestResult<WooListResponse<T>>(`woo:list:${url}`, revalidateSeconds, async () => {
        const response = await fetchRest(url, {
            method: "GET",
            headers: {
                Authorization: buildAuthorizationHeader(),
                Accept: "application/json",
            },
            revalidateSeconds,
            label: "Woo REST",
        });

        if (!response.ok) {
            throw await buildHttpError(response);
        }

        const items = (await response.json()) as T[];
        const total = Number(response.headers.get("X-WP-Total") ?? 0);
        const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 0);

        return {
            items,
            total,
            totalPages,
        };
    });
}


export async function wooPost<TRequest, TResponse>(
    path: string,
    body: TRequest,
    options: { query?: QueryParams; headers?: HeadersInit } = {},
): Promise<TResponse> {
    const url = buildWooUrl(path, options.query ?? {});

    const response = await fetchRest(url, {
        method: "POST",
        headers: {
            ...Object.fromEntries(new Headers(options.headers).entries()),
            Authorization: buildAuthorizationHeader("write"),
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
        label: "Woo REST",
    });

    if (!response.ok) {
        throw await buildHttpError(response);
    }

    return (await response.json()) as TResponse;
}

// -----------------------------------------------------
// Публичный WordPress REST client.
// Используем его только там, где нужен доступ к show_in_rest
// сущностям, например к custom taxonomy door_family.
// -----------------------------------------------------

export async function wpGet<T>(
    path: string,
    query: QueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<T> {
    const url = buildWpUrl(path, query);

    return getCachedRestResult<T>(`wp:get:${url}`, revalidateSeconds, async () => {
        const response = await fetchRest(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            revalidateSeconds,
            label: "WP REST",
        });

        if (!response.ok) {
            throw await buildHttpError(response);
        }

        return (await response.json()) as T;
    });
}

export async function wpGetList<T>(
    path: string,
    query: QueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<WooListResponse<T>> {
    const url = buildWpUrl(path, query);

    return getCachedRestResult<WooListResponse<T>>(`wp:list:${url}`, revalidateSeconds, async () => {
        const response = await fetchRest(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            revalidateSeconds,
            label: "WP REST",
        });

        if (!response.ok) {
            throw await buildHttpError(response);
        }

        const items = (await response.json()) as T[];
        const total = Number(response.headers.get("X-WP-Total") ?? 0);
        const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 0);

        return {
            items,
            total,
            totalPages,
        };
    });
}
