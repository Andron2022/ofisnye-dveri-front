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

let wpRestRequestCounter = 0;

function isWpRestDebugEnabled(): boolean {
    return process.env[WP_REST_DEBUG_ENV] === "1";
}

function getRequestTimeoutMs(): number | null {
    const rawValue = process.env[WP_REST_TIMEOUT_ENV];
    if (!rawValue) return null;

    const value = Number(rawValue);
    return Number.isFinite(value) && value > 0 ? value : null;
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
    const controller = timeoutMs ? new AbortController() : undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (timeoutMs && controller) {
        timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    }

    if (debugEnabled) {
        console.log(`[WP REST #${requestId}] START ${safeUrl}`);
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            next: {
                revalidate: revalidateSeconds,
            },
            signal: controller?.signal,
        });

        if (debugEnabled) {
            console.log(`[WP REST #${requestId}] END ${response.status} ${Date.now() - startedAt}ms ${safeUrl}`);
        }

        return response;
    } catch (error) {
        if (debugEnabled) {
            console.error(`[WP REST #${requestId}] ERROR ${Date.now() - startedAt}ms ${safeUrl}`, error);
        }

        throw error;
    } finally {
        if (timeoutId) clearTimeout(timeoutId);
    }
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

    const response = await fetchWpRest(url, revalidateSeconds);

    if (!response.ok) {
        throw new Error(await buildHttpErrorMessage(response));
    }

    return (await response.json()) as T;
}

export async function wpPublicGetList<T>(
    path: string,
    query: WpQueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<WpListResponse<T>> {
    const url = buildWpUrl(path, query);

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
}
