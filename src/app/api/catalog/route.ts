// src/app/api/catalog/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCatalogProducts } from "@src/lib/woo/products";
import { parseDoorCatalogFiltersFromURLSearchParams } from "@src/lib/woo/catalog-filters";
import type { CatalogType } from "@src/lib/woo/types";

// -----------------------------------------------------
// Это первый реальный BFF endpoint проекта.
// Он нужен для:
// - быстрой проверки JSON в браузере
// - будущих клиентских фильтров
// - повторного использования фронтом без прямого знания о Woo REST
// -----------------------------------------------------


// Проверяет, является ли переданное значение допустимым типом каталога.

function isCatalogType(value: string | null): value is CatalogType {
    return value === "doors" || value === "panels";
}


// Безопасно парсит строку в положительное число. Если значение некорректно, возвращает fallback-значение.

function parsePositiveNumber(
    value: string | null,
    fallback: number,
): number {
    if (!value) {
        return fallback;
    }
    
    const parsed = Number(value);
    
    if (!Number.isFinite(parsed) || parsed <= 0) {
        return fallback;
    }
    
    return Math.floor(parsed);
}


// Главный обработчик GET-запроса для API каталога.
// Извлекает параметры из URL и возвращает JSON со списком товаров.

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        
        const rawType = searchParams.get("type");
        const type: CatalogType = isCatalogType(rawType) ? rawType : "doors";
        
        const page = parsePositiveNumber(searchParams.get("page"), 1);
        const perPage = Math.min(
            parsePositiveNumber(searchParams.get("perPage"), 24),
            48,
        );
        
        const categorySlug = searchParams.get("categorySlug") ?? undefined;
        const filters = parseDoorCatalogFiltersFromURLSearchParams(searchParams);
        
        const catalog = await getCatalogProducts({
            type,
            page,
            perPage,
            categorySlug,
            filters,
        });
        
        return NextResponse.json(catalog, {
            status: 200,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Неизвестная ошибка при чтении каталога WooCommerce";
        
        return NextResponse.json(
            {
                message,
            },
            {
                status: 500,
            },
        );
    }
}
