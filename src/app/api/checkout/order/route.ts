// src/app/api/checkout/order/route.ts

import { NextRequest, NextResponse } from "next/server";
import type { CheckoutOrderErrorResponse, CheckoutOrderRequest } from "@src/lib/checkout/types";
import { createCheckoutOrder } from "@src/lib/woo/orders";

export async function POST(request: NextRequest) {
    try {
        const payload = (await request.json()) as CheckoutOrderRequest;
        const result = await createCheckoutOrder(payload);

        return NextResponse.json(result, {
            status: 201,
        });
    } catch (error) {
        const response: CheckoutOrderErrorResponse = {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Не удалось создать заказ в WooCommerce",
        };

        return NextResponse.json(response, {
            status: 400,
        });
    }
}
