// src/lib/woo/orders.ts

import type { CartAccessorySnapshot, CartItem, CartOptionSnapshot } from "@src/lib/cart/types";
import type { CheckoutOrderRequest, CheckoutOrderSuccessResponse } from "@src/lib/checkout/types";
import {
    getCheckoutErrorMessage,
    getContactMethodLabel,
    getCustomerTypeLabel,
    validateCheckoutOrderRequest,
} from "@src/lib/checkout/validation";
import { buildAbsoluteUrl } from "@src/lib/seo/site";
import { wooGet, wooPost } from "@src/lib/woo/client";
import { mapDoorOrderOptions } from "@src/lib/woo/products";
import type {
    DoorOptionGroup,
    WooCreateOrderPayload,
    WooCreatedOrder,
    WooMetaDataItem,
    WooOrderLineItemPayload,
    WooOrderMetaDataItem,
    WooProduct,
} from "@src/lib/woo/types";

const ORDER_STATUS_FOR_MANAGER_PROCESSING = "on-hold";
const DEFAULT_COUNTRY_CODE = "RU";
const CHECKOUT_CONTRACT_VERSION = "mvp-checkout-order-v2";

const ALLOWED_DOOR_CATEGORY_SLUGS = new Set([
    "mezhkomnatnye-dveri",
    "skrytye-dveri",
    "protivopozharnye-dveri",
]);

const ALLOWED_ACCESSORY_CATEGORY_SLUGS = new Set([
    "furnitura",
    "ruchki",
    "petli",
    "zamki",
]);

const DOOR_RELATED_ACCESSORY_META_KEYS = [
    "configurator_related_handles",
    "configurator_related_handless",
    "related_handles",
    "configurator_related_hinges",
    "related_hinges",
    "configurator_related_locks",
    "related_locks",
];

type ValidatedDoorItem = {
    lineItem: WooOrderLineItemPayload;
    accessoryLineItems: WooOrderLineItemPayload[];
    lineTotal: number;
};

function trim(value: string | null | undefined): string {
    return (value ?? "").trim();
}

function parseMoney(value: string | number | null | undefined): number | null {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    if (!value) {
        return null;
    }

    const normalized = Number(value.replace(",", "."));
    return Number.isFinite(normalized) ? normalized : null;
}

function roundMoney(value: number): number {
    return Math.round(value * 100) / 100;
}

function formatMoney(value: number): string {
    return roundMoney(value).toFixed(2);
}

function getMetaValue(metaData: WooMetaDataItem[] | undefined, key: string): unknown {
    return metaData?.find((item) => item.key === key)?.value ?? null;
}

function getMetaString(metaData: WooMetaDataItem[] | undefined, key: string): string | null {
    const value = getMetaValue(metaData, key);

    if (typeof value === "string" && value.trim() !== "") {
        return value;
    }

    if (typeof value === "number") {
        return String(value);
    }

    return null;
}

function getMetaNumberArrayByKeys(metaData: WooMetaDataItem[] | undefined, keys: string[]): number[] {
    const values: number[] = [];

    for (const key of keys) {
        const value = getMetaValue(metaData, key);

        if (Array.isArray(value)) {
            values.push(
                ...value
                    .map((item) => Number(item))
                    .filter((item) => Number.isInteger(item) && item > 0),
            );
            continue;
        }

        if (typeof value === "number" && Number.isInteger(value) && value > 0) {
            values.push(value);
            continue;
        }

        if (typeof value === "string" && value.trim() !== "") {
            values.push(
                ...value
                    .split(",")
                    .map((item) => Number(item.trim()))
                    .filter((item) => Number.isInteger(item) && item > 0),
            );
        }
    }

    return Array.from(new Set(values));
}

function getCategorySlugs(product: WooProduct): string[] {
    return product.categories.map((category) => category.slug);
}

function hasAnyCategorySlug(product: WooProduct, allowedSlugs: Set<string>): boolean {
    return getCategorySlugs(product).some((slug) => allowedSlugs.has(slug));
}

function assertProductHasAllowedCategory(
    product: WooProduct,
    allowedSlugs: Set<string>,
    roleLabel: string,
): void {
    if (hasAnyCategorySlug(product, allowedSlugs)) {
        return;
    }

    const categoryList = getCategorySlugs(product).join(", ") || "без категории";
    throw new Error(`Товар "${product.name}" не может быть оформлен как ${roleLabel}. Категории товара: ${categoryList}`);
}

function getAllowedAccessoryIdsForDoor(product: WooProduct): Set<number> {
    return new Set(getMetaNumberArrayByKeys(product.meta_data, DOOR_RELATED_ACCESSORY_META_KEYS));
}

function getPublicArticleNo(product: WooProduct): string | null {
    if (typeof product.public_article_no === "string" && product.public_article_no.trim() !== "") {
        return product.public_article_no;
    }

    return getMetaString(product.meta_data, "public_article_no");
}

function ensureProductCanBeOrdered(product: WooProduct, role: "door" | "accessory"): void {
    if (role === "door") {
        assertProductHasAllowedCategory(product, ALLOWED_DOOR_CATEGORY_SLUGS, "дверь");
    } else {
        assertProductHasAllowedCategory(product, ALLOWED_ACCESSORY_CATEGORY_SLUGS, "фурнитуру");
    }

    if (product.status && product.status !== "publish") {
        throw new Error(`Товар "${product.name}" сейчас не опубликован`);
    }

    if (product.stock_status && product.stock_status !== "instock") {
        throw new Error(`Товар "${product.name}" сейчас не в наличии`);
    }

    const price = parseMoney(product.price);
    if (price === null) {
        const label = role === "door" ? "двери" : "фурнитуры";
        throw new Error(`У товара ${label} "${product.name}" не задана цена. Заказ можно оформить после заполнения цены в Woo`);
    }
}

async function getWooProduct(productId: number): Promise<WooProduct> {
    if (!Number.isFinite(productId) || productId <= 0) {
        throw new Error("Некорректный ID товара в корзине");
    }

    return wooGet<WooProduct>(`products/${productId}`, {}, 0);
}

function getOptionGroupByKey(
    product: WooProduct,
    key: CartOptionSnapshot["groupKey"],
): DoorOptionGroup {
    const groups = mapDoorOrderOptions(product);
    return groups[key];
}

function normalizeSelectedOption(product: WooProduct, option: CartOptionSnapshot): CartOptionSnapshot {
    const group = getOptionGroupByKey(product, option.groupKey);
    const choice = group.choices.find((item) => item.id === option.choiceId);

    if (!choice) {
        throw new Error(`У товара "${product.name}" не найдена опция "${option.groupTitle}: ${option.choiceLabel}"`);
    }

    if (!choice.enabled) {
        throw new Error(`Опция "${group.title}: ${choice.label}" недоступна для товара "${product.name}"`);
    }

    return {
        groupKey: group.key,
        groupTitle: group.title,
        choiceId: choice.id,
        choiceLabel: choice.label,
        priceDelta: choice.priceDelta,
    };
}

function normalizeDoorOptions(product: WooProduct, item: CartItem): CartOptionSnapshot[] {
    const groups = mapDoorOrderOptions(product);
    const normalizedOptions: CartOptionSnapshot[] = [];

    for (const group of Object.values(groups)) {
        const selectedOption = item.selectedOptions.find((option) => option.groupKey === group.key);
        const selectedChoiceId = selectedOption?.choiceId ?? group.defaultOptionId;
        const choice = group.choices.find((itemChoice) => itemChoice.id === selectedChoiceId);

        if (!choice) {
            throw new Error(`У товара "${product.name}" не найдена опция "${group.title}: ${selectedChoiceId}"`);
        }

        if (!choice.enabled) {
            throw new Error(`Опция "${group.title}: ${choice.label}" недоступна для товара "${product.name}"`);
        }

        normalizedOptions.push(normalizeSelectedOption(product, {
            groupKey: group.key,
            groupTitle: group.title,
            choiceId: choice.id,
            choiceLabel: choice.label,
            priceDelta: choice.priceDelta,
        }));
    }

    return normalizedOptions;
}

function optionMetaData(options: CartOptionSnapshot[]): WooOrderMetaDataItem[] {
    return options.map((option) => ({
        key: option.groupTitle,
        value: option.priceDelta === 0
            ? option.choiceLabel
            : `${option.choiceLabel} (${option.priceDelta > 0 ? "+" : ""}${formatMoney(option.priceDelta)} ₽)`,
    }));
}

function baseDoorMetaData(product: WooProduct, item: CartItem, normalizedOptions: CartOptionSnapshot[]): WooOrderMetaDataItem[] {
    const publicArticleNo = getPublicArticleNo(product);
    const frontendUrl = buildAbsoluteUrl(item.path);
    const doorBasePrice = parseMoney(product.price);
    const doorOptionsDelta = normalizedOptions.reduce((sum, option) => sum + option.priceDelta, 0);

    return [
        { key: "Тип позиции", value: "Дверь" },
        { key: "Product ID", value: product.id },
        { key: "SKU", value: product.sku || item.sku || "—" },
        ...(publicArticleNo ? [{ key: "Артикул UI", value: publicArticleNo }] : []),
        { key: "Ссылка на фронте", value: frontendUrl },
        { key: "Путь на фронте", value: item.path },
        { key: "Ключ позиции корзины", value: item.itemKey },
        { key: "Цена двери из Woo", value: doorBasePrice === null ? "—" : formatMoney(doorBasePrice) },
        { key: "Дельта опций", value: formatMoney(doorOptionsDelta) },
        ...optionMetaData(normalizedOptions),
    ];
}

function accessoryMetaData(
    accessory: CartAccessorySnapshot,
    parentProduct: WooProduct,
    parentItem: CartItem,
    totalQuantity: number,
): WooOrderMetaDataItem[] {
    return [
        { key: "Тип позиции", value: "Фурнитура" },
        { key: "Комплектуется с", value: `${parentProduct.name} (${parentProduct.sku || parentItem.sku || "SKU не указан"})` },
        { key: "Родительская позиция корзины", value: parentItem.itemKey },
        { key: "Количество на одну дверь", value: accessory.qty },
        { key: "Количество дверей", value: parentItem.quantity },
        { key: "Итоговое количество", value: totalQuantity },
    ];
}

async function validateDoorCartItem(item: CartItem): Promise<ValidatedDoorItem> {
    if (!Number.isFinite(item.quantity) || item.quantity < 1 || item.quantity > 99) {
        throw new Error(`Некорректное количество товара в корзине: ${item.name}`);
    }

    const doorProduct = await getWooProduct(item.productId);
    ensureProductCanBeOrdered(doorProduct, "door");

    const doorBasePrice = parseMoney(doorProduct.price);
    if (doorBasePrice === null) {
        throw new Error(`У двери "${doorProduct.name}" не задана цена`);
    }

    const normalizedOptions = normalizeDoorOptions(doorProduct, item);
    const optionsDelta = normalizedOptions.reduce((sum, option) => sum + option.priceDelta, 0);
    const doorUnitTotal = roundMoney(doorBasePrice + optionsDelta);
    const doorLineTotal = roundMoney(doorUnitTotal * item.quantity);

    const lineItem: WooOrderLineItemPayload = {
        product_id: doorProduct.id,
        quantity: item.quantity,
        subtotal: formatMoney(doorLineTotal),
        total: formatMoney(doorLineTotal),
        meta_data: baseDoorMetaData(doorProduct, item, normalizedOptions),
    };

    const accessoryLineItems: WooOrderLineItemPayload[] = [];
    const allowedAccessoryIds = getAllowedAccessoryIdsForDoor(doorProduct);
    let accessoriesTotal = 0;

    for (const accessory of item.selectedAccessories.filter((cartAccessory) => cartAccessory.qty > 0)) {
        if (!Number.isFinite(accessory.qty) || accessory.qty < 1 || accessory.qty > 99) {
            throw new Error(`Некорректное количество фурнитуры в корзине: ${accessory.name}`);
        }

        if (!allowedAccessoryIds.has(accessory.productId)) {
            throw new Error(`Фурнитура "${accessory.name}" не привязана к двери "${doorProduct.name}" и не может быть оформлена в этом заказе`);
        }

        const accessoryProduct = await getWooProduct(accessory.productId);
        ensureProductCanBeOrdered(accessoryProduct, "accessory");

        const accessoryPrice = parseMoney(accessoryProduct.price);
        if (accessoryPrice === null) {
            throw new Error(`У фурнитуры "${accessoryProduct.name}" не задана цена`);
        }

        const quantity = accessory.qty * item.quantity;
        const accessoryLineTotal = roundMoney(accessoryPrice * quantity);
        accessoriesTotal += accessoryLineTotal;

        accessoryLineItems.push({
            product_id: accessoryProduct.id,
            quantity,
            subtotal: formatMoney(accessoryLineTotal),
            total: formatMoney(accessoryLineTotal),
            meta_data: accessoryMetaData(accessory, doorProduct, item, quantity),
        });
    }

    return {
        lineItem,
        accessoryLineItems,
        lineTotal: roundMoney(doorLineTotal + accessoriesTotal),
    };
}

function buildCustomerNote(payload: CheckoutOrderRequest): string {
    const parts = [
        `Предпочтительный способ связи: ${getContactMethodLabel(payload.customer.contactMethod)}`,
        `Тип клиента: ${getCustomerTypeLabel(payload.customer.customerType)}`,
        payload.customer.customerType === "company" && trim(payload.customer.companyName)
            ? `Компания: ${trim(payload.customer.companyName)}`
            : "",
        trim(payload.customer.deliveryComment) ? `Комментарий по доставке: ${trim(payload.customer.deliveryComment)}` : "",
        trim(payload.customer.orderComment) ? `Комментарий к заказу: ${trim(payload.customer.orderComment)}` : "",
        "Доставка: стоимость уточняется менеджером после проверки адреса и объёма заказа.",
        "Оплата: после подтверждения менеджером, онлайн-оплаты на сайте пока нет.",
        "Установка: не запрошена. Услуга будет добавлена отдельным order service позже.",
    ].filter(Boolean);

    return parts.join("\n\n");
}

function buildWooOrderPayload(
    payload: CheckoutOrderRequest,
    lineItems: WooOrderLineItemPayload[],
    calculatedTotal: number,
): WooCreateOrderPayload {
    const firstName = trim(payload.customer.firstName);
    const lastName = trim(payload.customer.lastName);
    const city = trim(payload.customer.city);
    const address = trim(payload.customer.address);
    const apartment = trim(payload.customer.apartment);
    const companyName = payload.customer.customerType === "company" ? trim(payload.customer.companyName) : "";

    return {
        status: ORDER_STATUS_FOR_MANAGER_PROCESSING,
        set_paid: false,
        payment_method: "manager_confirmation",
        payment_method_title: "Оплата после подтверждения менеджером",
        billing: {
            first_name: firstName,
            last_name: lastName,
            company: companyName || undefined,
            address_1: address,
            address_2: apartment,
            city,
            country: DEFAULT_COUNTRY_CODE,
            email: trim(payload.customer.email),
            phone: trim(payload.customer.phone),
        },
        shipping: {
            first_name: firstName,
            last_name: lastName,
            company: companyName || undefined,
            address_1: address,
            address_2: apartment,
            city,
            country: DEFAULT_COUNTRY_CODE,
        },
        customer_note: buildCustomerNote(payload),
        line_items: lineItems,
        meta_data: [
            { key: "Источник заказа", value: "Next.js storefront" },
            { key: "Версия checkout contract", value: CHECKOUT_CONTRACT_VERSION },
            { key: "Тип оформления", value: "Checkout MVP без онлайн-оплаты" },
            { key: "Статус оплаты", value: "Оплата после подтверждения менеджером" },
            { key: "Доставка", value: "Стоимость доставки не рассчитана. Уточняется менеджером." },
            { key: "Установка", value: "Не запрошена. Будущий order service." },
            { key: "Тип клиента", value: getCustomerTypeLabel(payload.customer.customerType) },
            { key: "Предпочтительный способ связи", value: getContactMethodLabel(payload.customer.contactMethod) },
            ...(companyName ? [{ key: "Компания", value: companyName }] : []),
            { key: "Расчётная сумма фронта/BFF без доставки", value: formatMoney(calculatedTotal) },
            { key: "Количество товарных строк Woo", value: lineItems.length },
            { key: "Согласие на обработку данных", value: payload.customer.termsAccepted },
        ],
    };
}

function buildCheckoutSuccessPath(order: WooCreatedOrder): string {
    const params = new URLSearchParams({
        orderNumber: order.number,
        orderId: String(order.id),
        status: order.status,
        total: order.total,
    });

    return `/checkout/success?${params.toString()}`;
}

export async function createCheckoutOrder(payload: CheckoutOrderRequest): Promise<CheckoutOrderSuccessResponse> {
    const validation = validateCheckoutOrderRequest(payload);

    if (!validation.ok) {
        throw new Error(getCheckoutErrorMessage(validation.errors));
    }

    const normalizedPayload = validation.value;
    const validatedItems = await Promise.all(normalizedPayload.items.map(validateDoorCartItem));
    const lineItems = validatedItems.flatMap((item) => [item.lineItem, ...item.accessoryLineItems]);
    const calculatedTotal = roundMoney(validatedItems.reduce((sum, item) => sum + item.lineTotal, 0));

    if (lineItems.length === 0) {
        throw new Error("В заказе нет валидных позиций");
    }

    const wooPayload = buildWooOrderPayload(normalizedPayload, lineItems, calculatedTotal);
    const order = await wooPost<WooCreateOrderPayload, WooCreatedOrder>("orders", wooPayload);

    return {
        success: true,
        orderId: order.id,
        orderNumber: order.number,
        status: order.status,
        total: order.total,
        successPath: buildCheckoutSuccessPath(order),
    };
}
