// src/lib/checkout/types.ts

import type { CartItem } from "@src/lib/cart/types";

export type CheckoutCustomer = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    apartment: string;
    deliveryComment: string;
    orderComment: string;
    termsAccepted: boolean;
};

export type CheckoutOrderRequest = {
    customer: CheckoutCustomer;
    items: CartItem[];
};

export type CheckoutOrderSuccessResponse = {
    success: true;
    orderId: number;
    orderNumber: string;
    status: string;
    total: string;
};

export type CheckoutOrderErrorResponse = {
    success: false;
    message: string;
};

export type CheckoutOrderResponse = CheckoutOrderSuccessResponse | CheckoutOrderErrorResponse;
