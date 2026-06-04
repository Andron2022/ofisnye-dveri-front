// src/lib/checkout/types.ts

import type { CartItem } from "@src/lib/cart/types";

export type CheckoutContactMethod = "phone" | "whatsapp" | "telegram" | "email";

export type CheckoutCustomerType = "person" | "company";

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
    contactMethod: CheckoutContactMethod;
    customerType: CheckoutCustomerType;
    companyName: string;
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
    successPath: string;
};

export type CheckoutFieldError = {
    field: keyof CheckoutCustomer | "items" | "root";
    message: string;
};

export type CheckoutOrderErrorCode = "VALIDATION_ERROR" | "ORDER_CREATE_ERROR";

export type CheckoutOrderErrorResponse = {
    success: false;
    message: string;
    code?: CheckoutOrderErrorCode;
    errors?: CheckoutFieldError[];
};

export type CheckoutOrderResponse = CheckoutOrderSuccessResponse | CheckoutOrderErrorResponse;
