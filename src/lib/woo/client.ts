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

const DEFAULT_REVALIDATE_SECONDS = 60;
const REST_DEBUG_ENV = "WP_REST_DEBUG";
const REST_TIMEOUT_ENV = "WP_REST_TIMEOUT_MS";

let restRequestCounter = 0;

function isRestDebugEnabled(): boolean {
    return process.env[REST_DEBUG_ENV] === "1";
}

function getRequestTimeoutMs(): number | null {
    const rawValue = process.env[REST_TIMEOUT_ENV];
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
    const controller = timeoutMs ? new AbortController() : undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (timeoutMs && controller) {
        timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    }

    if (debugEnabled) {
        console.log(`[${options.label} #${requestId}] START ${options.method} ${safeUrl}`);
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
            console.log(`[${options.label} #${requestId}] END ${response.status} ${Date.now() - startedAt}ms ${safeUrl}`);
        }

        return response;
    } catch (error) {
        if (debugEnabled) {
            console.error(`[${options.label} #${requestId}] ERROR ${Date.now() - startedAt}ms ${safeUrl}`, error);
        }

        throw error;
    } finally {
        if (timeoutId) clearTimeout(timeoutId);
    }
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

function buildAuthorizationHeader(): string {
    const key = getRequiredEnv("WC_CONSUMER_KEY");
    const secret = getRequiredEnv("WC_CONSUMER_SECRET");
    
    const token = Buffer.from(`${key}:${secret}`).toString("base64");
    return `Basic ${token}`;
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
    
    return `Woo/WP API request failed (${response.status}): ${details}`;
}

export async function wooGet<T>(
    path: string,
    query: QueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<T> {
    const url = buildWooUrl(path, query);
    
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
        throw new Error(await buildHttpErrorMessage(response));
    }
    
    return (await response.json()) as T;
}

export async function wooGetList<T>(
    path: string,
    query: QueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<WooListResponse<T>> {
    const url = buildWooUrl(path, query);
    
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
        throw new Error(await buildHttpErrorMessage(response));
    }
    
    const items = (await response.json()) as T[];
    
    const total = Number(response.headers.get("X-WP-Total") ?? 0);
    const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 0);
    
    return {
        items,
        total,
        totalPages,
    };
}


export async function wooPost<TRequest, TResponse>(
    path: string,
    body: TRequest,
    query: QueryParams = {},
): Promise<TResponse> {
    const url = buildWooUrl(path, query);
    
    const response = await fetchRest(url, {
        method: "POST",
        headers: {
            Authorization: buildAuthorizationHeader(),
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
        label: "Woo REST",
    });
    
    if (!response.ok) {
        throw new Error(await buildHttpErrorMessage(response));
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
    
    const response = await fetchRest(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        revalidateSeconds,
        label: "WP REST",
    });
    
    if (!response.ok) {
        throw new Error(await buildHttpErrorMessage(response));
    }
    
    return (await response.json()) as T;
}

export async function wpGetList<T>(
    path: string,
    query: QueryParams = {},
    revalidateSeconds = DEFAULT_REVALIDATE_SECONDS,
): Promise<WooListResponse<T>> {
    const url = buildWpUrl(path, query);
    
    const response = await fetchRest(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        revalidateSeconds,
        label: "WP REST",
    });
    
    if (!response.ok) {
        throw new Error(await buildHttpErrorMessage(response));
    }
    
    const items = (await response.json()) as T[];
    
    const total = Number(response.headers.get("X-WP-Total") ?? 0);
    const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 0);
    
    return {
        items,
        total,
        totalPages,
    };
}
