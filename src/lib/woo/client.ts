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
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: buildAuthorizationHeader(),
            Accept: "application/json",
        },
        next: {
            revalidate: revalidateSeconds,
        },
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
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: buildAuthorizationHeader(),
            Accept: "application/json",
        },
        next: {
            revalidate: revalidateSeconds,
        },
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
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        next: {
            revalidate: revalidateSeconds,
        },
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
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        next: {
            revalidate: revalidateSeconds,
        },
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
