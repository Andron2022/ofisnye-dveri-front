// src/lib/wp/client.ts

// -----------------------------------------------------
// Низкоуровневый public WordPress REST client для headless-контента.
// Используем только публичные WP REST endpoints: pages, posts,
// wp_navigation и portfolio_project. WooCommerce-логику не трогаем.
// -----------------------------------------------------

type QueryPrimitive = string | number | boolean;

type QueryValue = QueryPrimitive | QueryPrimitive[] | null | undefined;

export type WpQueryParams = Record<string, QueryValue>;

export type WpListResponse<T> = {
    items: T[];
    total: number;
    totalPages: number;
};

const DEFAULT_REVALIDATE_SECONDS = 300;
const WP_REST_DEBUG_ENV = "WP_REST_DEBUG";
const WP_REST_TIMEOUT_ENV = "WP_REST_TIMEOUT_MS";
const WP_REST_RETRY_COUNT_ENV = "WP_REST_RETRY_COUNT";
const DEFAULT_GET_RETRY_COUNT = 1;
const DEVELOPMENT_MEMORY_CACHE_TTL_MS = 1000;

let wpRestRequestCounter = 0;

type MemoryCacheEntry<T> = {
    expiresAt: number;
    promise: Promise<T>;
};

const wpRestMemoryCache = new Map<string, MemoryCacheEntry<unknown>>();

function getCacheTtlMs(revalidateSeconds: number): number {
    if (process.env.NODE_ENV === "development") return DEVELOPMENT_MEMORY_CACHE_TTL_MS;
    if (!Number.isFinite(revalidateSeconds) || revalidateSeconds <= 0) return 0;

    return revalidateSeconds * 1000;
}

function getCachedRestResult<T>(key: string, revalidateSeconds: number, loader: () => Promise<T>): Promise<T> {
    const ttlMs = getCacheTtlMs(revalidateSeconds);

    if (ttlMs <= 0) {
        return loader();
    }

    const now = Date.now();
    const existing = wpRestMemoryCache.get(key);

    if (existing && existing.expiresAt > now) {
        return existing.promise as Promise<T>;
    }

    const promise = loader().catch((error) => {
        wpRestMemoryCache.delete(key);
        throw error;
    });

    wpRestMemoryCache.set(key, {
        expiresAt: now + ttlMs,
        promise: promise as Promise<unknown>,
    });

    return promise;
}

function isWpRestDebugEnabled(): boolean {
    return process.env[WP_REST_DEBUG_ENV] === "1";
}

function getRequestTimeoutMs(): number | null {
    const rawValue = process.env[WP_REST_TIMEOUT_ENV];
    if (!rawValue) return null;

    const value = Number(rawValue);
    return Number.isFinite(value) && value > 0 ? value : null;
}

function getRetryCount(): number {
    const rawValue = process.env[WP_REST_RETRY_COUNT_ENV];
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

async function fetchWpRest(url: string, revalidateSeconds: number): Promise<Response> {
    const requestId = ++wpRestRequestCounter;
    const debugEnabled = isWpRestDebugEnabled();
    const timeoutMs = getRequestTimeoutMs();
    const startedAt = Date.now();
    const safeUrl = getSafeUrlForLog(url);
    const retryCount = getRetryCount();
    const totalAttempts = retryCount + 1;
    let lastError: unknown;

    for (let attempt = 1; attempt <= totalAttempts; attempt += 1) {
        const controller = timeoutMs ? new AbortController() : undefined;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        if (timeoutMs && controller) {
            timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        }

        if (debugEnabled) {
            console.log(`[WP REST #${requestId}] START attempt ${attempt}/${totalAttempts} ${safeUrl}`);
        }

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                ...(process.env.NODE_ENV === "development"
                    ? { cache: "no-store" as const }
                    : {
                        next: {
                            revalidate: revalidateSeconds,
                        },
                    }),
                signal: controller?.signal,
            });

            if (debugEnabled) {
                console.log(`[WP REST #${requestId}] END ${response.status} ${Date.now() - startedAt}ms attempt ${attempt}/${totalAttempts} ${safeUrl}`);
            }

            return response;
        } catch (error) {
            lastError = error;
            const canRetry = attempt < totalAttempts && isRetriableRestError(error);

            if (debugEnabled) {
                const log = canRetry ? console.warn : console.error;
                log(
                    `[WP REST #${requestId}] ERROR ${Date.now() - startedAt}ms attempt ${attempt}/${totalAttempts}${canRetry ? " RETRY" : ""} ${safeUrl}`,
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

function normalizeBaseUrl(url: string): string {
    return url.replace(/\/+$/, "");
}

export function getWordPressBaseUrl(): string | null {
    const value = process.env.WORDPRESS_URL;

    if (!value?.trim()) return null;

    return normalizeBaseUrl(value.trim());
}

function appendQuery(url: URL, query: WpQueryParams = {}): void {
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

function buildWpUrl(path: string, query: WpQueryParams = {}): string {
    const baseUrl = getWordPressBaseUrl();

    if (!baseUrl) {
        throw new Error("Отсутствует обязательная переменная окружения: WORDPRESS_URL");
    }

    const normalizedPath = path.replace(/^\/+/, "");
    const url = new URL(`/wp-json/wp/v2/${normalizedPath}`, baseUrl);

    appendQuery(url, query);

    return url.toString();
}

async function buildHttpErrorMessage(response: Response): Promise<string> {
    let details = response.statusText;

    try {
        const bodyText = await response.text();
        if (bodyText) {
            details = `${details}. ${bodyText}`;
        }
    } catch {
        // Если тело ошибки не прочиталось, оставляем statusText.
    }

    return `WP API request failed (${response.status}): ${details}`;
}

export async function wpPublicGet<T>(
    path: string,
    query: WpQueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<T> {
    const url = buildWpUrl(path, query);

    return getCachedRestResult<T>(`wp:get:${url}`, revalidateSeconds, async () => {
        const response = await fetchWpRest(url, revalidateSeconds);

        if (!response.ok) {
            throw new Error(await buildHttpErrorMessage(response));
        }

        return (await response.json()) as T;
    });
}

export async function wpPublicGetList<T>(
    path: string,
    query: WpQueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<WpListResponse<T>> {
    const url = buildWpUrl(path, query);

    return getCachedRestResult<WpListResponse<T>>(`wp:list:${url}`, revalidateSeconds, async () => {
        const response = await fetchWpRest(url, revalidateSeconds);

        if (!response.ok) {
            throw new Error(await buildHttpErrorMessage(response));
        }

        const items = (await response.json()) as T[];

        return {
            items,
            total: Number(response.headers.get("X-WP-Total") ?? 0),
            totalPages: Number(response.headers.get("X-WP-TotalPages") ?? 0),
        };
    });
}
