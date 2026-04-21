// src/app/api/catalog/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCatalogProducts } from "@src/lib/woo/products";
import type { CatalogType } from "@src/lib/woo/types";

// -----------------------------------------------------
// Этот route handler нужен не потому, что серверная страница
// не может читать Woo напрямую.
// Она может.
// Он нужен как первый реальный BFF endpoint:
// - для быстрой проверки JSON в браузере
// - для будущих клиентских фильтров
// - для последующего повторного использования
// -----------------------------------------------------

// Проверяем, что type допустимый.
function isCatalogType(value: string | null): value is CatalogType {
    return value === "doors" || value === "panels";
}

// Безопасно парсим положительное число из query string.
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
        
        const catalog = await getCatalogProducts({
            type,
            page,
            perPage,
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