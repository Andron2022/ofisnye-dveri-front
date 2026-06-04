// src/app/api/checkout/order/route.ts

import { NextRequest, NextResponse } from "next/server";
import type { CheckoutOrderErrorResponse } from "@src/lib/checkout/types";
import { getCheckoutErrorMessage, validateCheckoutOrderRequest } from "@src/lib/checkout/validation";
import { createCheckoutOrder } from "@src/lib/woo/orders";

export async function POST(request: NextRequest) {
    try {
        const rawPayload = await request.json();
        const validation = validateCheckoutOrderRequest(rawPayload);

        if (!validation.ok) {
            const response: CheckoutOrderErrorResponse = {
                success: false,
                code: "VALIDATION_ERROR",
                message: getCheckoutErrorMessage(validation.errors),
                errors: validation.errors,
            };

            return NextResponse.json(response, {
                status: 422,
            });
        }

        const result = await createCheckoutOrder(validation.value);

        return NextResponse.json(result, {
            status: 201,
        });
    } catch (error) {
        const response: CheckoutOrderErrorResponse = {
            success: false,
            code: "ORDER_CREATE_ERROR",
            message: error instanceof Error
                ? error.message
                : "Не удалось создать заказ в WooCommerce",
        };

        return NextResponse.json(response, {
            status: 400,
        });
    }
}
