// src/lib/woo/client.ts

import type { WooListResponse } from "@src/lib/woo/types";

// -----------------------------------------------------
// Низкоуровневый Woo client.
// Его задача:
// 1) собрать URL к Woo REST API
// 2) добавить Authorization header
// 3) отдать JSON или понятную ошибку
// -----------------------------------------------------

// Тип примитивов, которые можно передавать в query string.
type QueryPrimitive = string | number | boolean;

// Значение query-параметра.
// Поддерживаем одиночное значение или массив значений.
type QueryValue =
    | QueryPrimitive
    | QueryPrimitive[]
    | null
    | undefined;

// Объект query string.
type QueryParams = Record<string, QueryValue>;

// Базовое время кэша для server fetch.
// Для каталога этого достаточно на старте.
const DEFAULT_REVALIDATE_SECONDS = 60;

// -----------------------------------------------------
// Читаем env.
// Используем ИМЕННО те названия, которые уже есть в твоём .env.local.
// -----------------------------------------------------

function getRequiredEnv(name: string): string {
    const value = process.env[name];
    
    if (!value) {
        throw new Error(
            `Отсутствует обязательная переменная окружения: ${name}`,
        );
    }
    
    return value;
}

// Убираем хвостовые слэши, чтобы URL не собирался криво.
function normalizeBaseUrl(url: string): string {
    return url.replace(/\/+$/, "");
}

// Собираем URL вида:
// https://site.local/wp-json/wc/v3/products?status=publish
function buildWooUrl(path: string, query: QueryParams = {}): string {
    const baseUrl = normalizeBaseUrl(getRequiredEnv("WORDPRESS_URL"));
    const normalizedPath = path.replace(/^\/+/, "");
    const url = new URL(`/wp-json/wc/v3/${normalizedPath}`, baseUrl);
    
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
    
    return url.toString();
}

// Собираем Basic auth header для Woo REST API.
function buildAuthorizationHeader(): string {
    const key = getRequiredEnv("WC_CONSUMER_KEY");
    const secret = getRequiredEnv("WC_CONSUMER_SECRET");
    
    const token = Buffer.from(`${key}:${secret}`).toString("base64");
    return `Basic ${token}`;
}

// Формируем читаемую ошибку HTTP.
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
    
    return `Woo API request failed (${response.status}): ${details}`;
}

// -----------------------------------------------------
// Универсальный GET для единичного ответа.
// -----------------------------------------------------

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
        // Кэшируем ответ на стороне Next server.
        next: {
            revalidate: revalidateSeconds,
        },
    });
    
    if (!response.ok) {
        throw new Error(await buildHttpErrorMessage(response));
    }
    
    return (await response.json()) as T;
}

// -----------------------------------------------------
// GET для списков.
// Помимо массива items достаём общее количество товаров
// и число страниц из WP headers.
// -----------------------------------------------------

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