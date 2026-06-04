// src/lib/checkout/validation.ts

import type { CartItem } from "@src/lib/cart/types";
import type {
    CheckoutContactMethod,
    CheckoutCustomer,
    CheckoutCustomerType,
    CheckoutFieldError,
    CheckoutOrderRequest,
} from "@src/lib/checkout/types";

const CONTACT_METHOD_LABELS: Record<CheckoutContactMethod, string> = {
    phone: "Телефон",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    email: "Email",
};

const CUSTOMER_TYPE_LABELS: Record<CheckoutCustomerType, string> = {
    person: "Частное лицо",
    company: "Компания",
};

const CONTACT_METHODS = new Set<CheckoutContactMethod>(["phone", "whatsapp", "telegram", "email"]);
const CUSTOMER_TYPES = new Set<CheckoutCustomerType>(["person", "company"]);

function isObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeWhitespace(value: unknown): string {
    return typeof value === "string"
        ? value.replace(/\s+/g, " ").trim()
        : "";
}

function normalizeEmail(value: unknown): string {
    return normalizeWhitespace(value).toLowerCase();
}

function normalizePhone(value: unknown): string {
    const rawValue = normalizeWhitespace(value);
    const digits = rawValue.replace(/\D/g, "");

    if (digits.length === 10) {
        return `+7${digits}`;
    }

    if (digits.length === 11 && digits.startsWith("8")) {
        return `+7${digits.slice(1)}`;
    }

    if (digits.length === 11 && digits.startsWith("7")) {
        return `+${digits}`;
    }

    if (rawValue.startsWith("+") && digits.length >= 10 && digits.length <= 15) {
        return `+${digits}`;
    }

    return rawValue;
}

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
}

function normalizeContactMethod(value: unknown): CheckoutContactMethod {
    return CONTACT_METHODS.has(value as CheckoutContactMethod)
        ? value as CheckoutContactMethod
        : "phone";
}

function normalizeCustomerType(value: unknown): CheckoutCustomerType {
    return CUSTOMER_TYPES.has(value as CheckoutCustomerType)
        ? value as CheckoutCustomerType
        : "person";
}

function normalizeCustomer(value: unknown): CheckoutCustomer {
    const customer = isObject(value) ? value : {};

    return {
        firstName: normalizeWhitespace(customer.firstName),
        lastName: normalizeWhitespace(customer.lastName),
        phone: normalizePhone(customer.phone),
        email: normalizeEmail(customer.email),
        city: normalizeWhitespace(customer.city),
        address: normalizeWhitespace(customer.address),
        apartment: normalizeWhitespace(customer.apartment),
        deliveryComment: normalizeWhitespace(customer.deliveryComment),
        orderComment: normalizeWhitespace(customer.orderComment),
        contactMethod: normalizeContactMethod(customer.contactMethod),
        customerType: normalizeCustomerType(customer.customerType),
        companyName: normalizeWhitespace(customer.companyName),
        termsAccepted: customer.termsAccepted === true,
    };
}

function getCartItemName(item: CartItem, index: number): string {
    return item.name || item.sku || `позиция №${index + 1}`;
}

function validateItems(items: unknown): CheckoutFieldError[] {
    if (!Array.isArray(items) || items.length === 0) {
        return [{ field: "items", message: "Корзина пуста" }];
    }

    const errors: CheckoutFieldError[] = [];

    items.forEach((rawItem, index) => {
        if (!isObject(rawItem)) {
            errors.push({ field: "items", message: `Некорректная позиция корзины №${index + 1}` });
            return;
        }

        const item = rawItem as CartItem;
        const itemName = getCartItemName(item, index);

        if (!Number.isInteger(item.productId) || item.productId <= 0) {
            errors.push({ field: "items", message: `У товара "${itemName}" некорректный ID` });
        }

        if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
            errors.push({ field: "items", message: `У товара "${itemName}" некорректное количество` });
        }

        if (typeof item.path !== "string" || !item.path.startsWith("/mezhkomnatnye-dveri/")) {
            errors.push({ field: "items", message: `У товара "${itemName}" некорректная ссылка на карточку` });
        }

        if (item.lineTotal === null || !Number.isFinite(item.lineTotal)) {
            errors.push({ field: "items", message: `У товара "${itemName}" не рассчитана итоговая цена` });
        }
    });

    return errors;
}

export function getContactMethodLabel(value: CheckoutContactMethod): string {
    return CONTACT_METHOD_LABELS[value];
}

export function getCustomerTypeLabel(value: CheckoutCustomerType): string {
    return CUSTOMER_TYPE_LABELS[value];
}

export function validateCheckoutOrderRequest(payload: unknown): {
    ok: true;
    value: CheckoutOrderRequest;
} | {
    ok: false;
    value: CheckoutOrderRequest;
    errors: CheckoutFieldError[];
} {
    const rawPayload = isObject(payload) ? payload : {};
    const customer = normalizeCustomer(rawPayload.customer);
    const items = Array.isArray(rawPayload.items) ? rawPayload.items as CartItem[] : [];
    const errors: CheckoutFieldError[] = [];

    if (customer.firstName.length < 2) {
        errors.push({ field: "firstName", message: "Укажите имя — минимум 2 символа" });
    }

    if (!isValidPhone(customer.phone)) {
        errors.push({ field: "phone", message: "Укажите корректный телефон" });
    }

    if (!isValidEmail(customer.email)) {
        errors.push({ field: "email", message: "Укажите корректный email" });
    }

    if (customer.city.length < 2) {
        errors.push({ field: "city", message: "Укажите город" });
    }

    if (customer.address.length < 5) {
        errors.push({ field: "address", message: "Укажите адрес доставки подробнее" });
    }

    if (customer.customerType === "company" && customer.companyName.length < 2) {
        errors.push({ field: "companyName", message: "Укажите название компании" });
    }

    if (!customer.termsAccepted) {
        errors.push({ field: "termsAccepted", message: "Подтвердите согласие на обработку данных" });
    }

    errors.push(...validateItems(items));

    const value: CheckoutOrderRequest = {
        customer,
        items,
    };

    if (errors.length > 0) {
        return { ok: false, value, errors };
    }

    return { ok: true, value };
}

export function getCheckoutErrorMessage(errors: CheckoutFieldError[]): string {
    return errors[0]?.message ?? "Проверьте данные заказа";
}
