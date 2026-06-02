"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@src/lib/cart/CartProvider";
import type { CartAccessorySnapshot, CartItemInput, CartOptionSnapshot } from "@src/lib/cart/types";
import type {
    DoorAccessoryCard,
    DoorCartCandidate,
    DoorOptionChoice,
    DoorOptionGroup,
    DoorProductDetails,
} from "@src/lib/woo/types";

type SelectedOptions = DoorCartCandidate["selectedOptions"];
type SelectedAccessoryMap = Record<number, number>;

function toNumber(price: string | null): number | null {
    if (!price) return null;
    const normalized = Number(price.replace(",", "."));
    return Number.isFinite(normalized) ? normalized : null;
}

function formatPrice(value: number | string | null): string {
    if (value === null || value === "") return "Цена по запросу";
    const numberValue = typeof value === "number" ? value : toNumber(value);
    if (numberValue === null) return `${value} ₽`;
    return `${new Intl.NumberFormat("ru-RU").format(numberValue)} ₽`;
}

function formatDelta(priceDelta: number): string {
    if (priceDelta === 0) return "без доплаты";
    if (priceDelta > 0) return `+ ${formatPrice(priceDelta)}`;
    return `− ${formatPrice(Math.abs(priceDelta))}`;
}

function getInitialSelectedOptions(product: DoorProductDetails): SelectedOptions {
    return {
        box: product.orderOptions.box.defaultOptionId,
        openingSide: product.orderOptions.openingSide.defaultOptionId,
        soundproofing: product.orderOptions.soundproofing.defaultOptionId,
        threshold: product.orderOptions.threshold.defaultOptionId,
    };
}

function findSelectedChoice(group: DoorOptionGroup, selectedId: string): DoorOptionChoice | null {
    return group.choices.find((choice) => choice.id === selectedId) ?? null;
}

function getSelectedChoiceOrFallback(group: DoorOptionGroup, selectedId: string): DoorOptionChoice {
    return (
        findSelectedChoice(group, selectedId) ??
        group.choices.find((choice) => choice.id === group.defaultOptionId) ??
        group.choices[0]
    );
}

function getOptionsDelta(product: DoorProductDetails, selectedOptions: SelectedOptions): number {
    const selectedChoices = [
        findSelectedChoice(product.orderOptions.box, selectedOptions.box),
        findSelectedChoice(product.orderOptions.openingSide, selectedOptions.openingSide),
        findSelectedChoice(product.orderOptions.soundproofing, selectedOptions.soundproofing),
        findSelectedChoice(product.orderOptions.threshold, selectedOptions.threshold),
    ];

    return selectedChoices.reduce((sum, choice) => sum + (choice?.priceDelta ?? 0), 0);
}

function getAllAccessories(product: DoorProductDetails): DoorAccessoryCard[] {
    return [
        ...product.accessories.handles,
        ...product.accessories.hinges,
        ...product.accessories.locks,
    ];
}

function buildSelectedOptionSnapshots(
    product: DoorProductDetails,
    selectedOptions: SelectedOptions,
): CartOptionSnapshot[] {
    const optionGroups = [
        product.orderOptions.box,
        product.orderOptions.openingSide,
        product.orderOptions.soundproofing,
        product.orderOptions.threshold,
    ];

    return optionGroups.map((group) => {
        const selectedId = selectedOptions[group.key];
        const choice = getSelectedChoiceOrFallback(group, selectedId);

        return {
            groupKey: group.key,
            groupTitle: group.title,
            choiceId: choice.id,
            choiceLabel: choice.label,
            priceDelta: choice.priceDelta,
        };
    });
}

function buildSelectedAccessorySnapshots(
    product: DoorProductDetails,
    selectedAccessories: SelectedAccessoryMap,
): CartAccessorySnapshot[] {
    return getAllAccessories(product)
        .filter((item) => (selectedAccessories[item.id] ?? 0) > 0)
        .map((item) => ({
            productId: item.id,
            name: item.name,
            slug: item.slug,
            sku: item.sku,
            image: item.image,
            price: toNumber(item.price),
            qty: selectedAccessories[item.id] ?? 0,
        }));
}

function buildCartItemInput(
    product: DoorProductDetails,
    selectedOptions: SelectedOptions,
    selectedAccessories: SelectedAccessoryMap,
): CartItemInput {
    return {
        productId: product.id,
        slug: product.slug,
        path: product.path,
        name: product.name,
        sku: product.sku,
        publicArticleNo: product.publicArticleNo,
        image: product.image,
        basePrice: toNumber(product.price),
        selectedOptions: buildSelectedOptionSnapshots(product, selectedOptions),
        selectedAccessories: buildSelectedAccessorySnapshots(product, selectedAccessories),
        quantity: 1,
    };
}

function OptionGroupBlock({ group, value, onChange }: {
    group: DoorOptionGroup;
    value: string;
    onChange: (nextValue: string) => void;
}) {
    return (
        <div className="border rounded-3 p-3 bg-white">
            <h3 className="fs-6 mb-3">{group.title}</h3>
            <div className="d-flex flex-column gap-2">
                {group.choices.map((choice) => {
                    const inputId = `${group.key}-${choice.id}`;

                    return (
                        <label
                            key={choice.id}
                            htmlFor={inputId}
                            className={`border rounded-3 p-3 d-flex justify-content-between gap-3 ${choice.enabled ? "" : "opacity-50"}`}
                        >
                            <span className="d-flex gap-2 align-items-start">
                                <input
                                    id={inputId}
                                    className="form-check-input mt-1"
                                    type="radio"
                                    name={group.key}
                                    value={choice.id}
                                    checked={value === choice.id}
                                    disabled={!choice.enabled}
                                    onChange={() => onChange(choice.id)}
                                />
                                <span>
                                    <span className="d-block fw-medium">{choice.label}</span>
                                    {choice.isDefault ? <span className="small text-muted">Вариант по умолчанию</span> : null}
                                </span>
                            </span>
                            <span className="small text-muted text-nowrap">{formatDelta(choice.priceDelta)}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

function AccessoryCard({ item, qty, onQtyChange }: {
    item: DoorAccessoryCard;
    qty: number;
    onQtyChange: (nextQty: number) => void;
}) {
    const price = toNumber(item.price);
    const lineTotal = price === null ? null : price * qty;

    return (
        <article className="border rounded-3 p-3 bg-white h-100 d-flex flex-column">
            <div className="d-flex gap-3 align-items-start">
                <div
                    className="rounded-3 bg-light border overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ width: 88, height: 88 }}
                >
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                    ) : (
                        <span className="small text-muted text-center px-2">Нет фото</span>
                    )}
                </div>

                <div className="flex-grow-1">
                    <h4 className="fs-6 mb-1">{item.shortLabel || item.name}</h4>
                    <div className="small text-muted mb-2">SKU: {item.sku || "—"}</div>
                    <div className="fw-medium">{formatPrice(item.price)}</div>
                </div>
            </div>

            <div className="mt-auto pt-3 d-flex align-items-center justify-content-between gap-3">
                <label className="small text-muted" htmlFor={`accessory-${item.id}`}>Количество</label>
                <input
                    id={`accessory-${item.id}`}
                    className="form-control form-control-sm"
                    type="number"
                    min={0}
                    step={1}
                    value={qty}
                    style={{ maxWidth: 96 }}
                    onChange={(event) => {
                        const nextQty = Math.max(0, Math.floor(Number(event.target.value) || 0));
                        onQtyChange(nextQty);
                    }}
                />
            </div>

            {qty > 0 ? <div className="small text-muted mt-2 text-end">Сумма: {formatPrice(lineTotal)}</div> : null}
        </article>
    );
}

function AccessoriesGroup({ title, items, selectedAccessories, onQtyChange }: {
    title: string;
    items: DoorAccessoryCard[];
    selectedAccessories: SelectedAccessoryMap;
    onQtyChange: (productId: number, nextQty: number) => void;
}) {
    if (items.length === 0) return null;

    return (
        <div className="mb-4">
            <h3 className="fs-5 mb-3">{title}</h3>
            <div className="row g-3">
                {items.map((item) => (
                    <div key={item.id} className="col-12 col-md-6 col-xl-4">
                        <AccessoryCard
                            item={item}
                            qty={selectedAccessories[item.id] ?? 0}
                            onQtyChange={(nextQty) => onQtyChange(item.id, nextQty)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function DoorProductConfigurator({ product }: { product: DoorProductDetails }) {
    const { addItem, isHydrated } = useCart();
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => getInitialSelectedOptions(product));
    const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessoryMap>({});
    const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

    const basePrice = toNumber(product.price);
    const optionsDelta = getOptionsDelta(product, selectedOptions);
    const allAccessories = getAllAccessories(product);
    const selectedAccessoryItems = allAccessories.filter((item) => (selectedAccessories[item.id] ?? 0) > 0);
    const accessoriesTotal = selectedAccessoryItems.reduce((sum, item) => {
        const itemPrice = toNumber(item.price) ?? 0;
        return sum + itemPrice * (selectedAccessories[item.id] ?? 0);
    }, 0);
    const totalPrice = basePrice === null ? null : basePrice + optionsDelta + accessoriesTotal;

    const cartItemInput = useMemo(
        () => buildCartItemInput(product, selectedOptions, selectedAccessories),
        [product, selectedOptions, selectedAccessories],
    );

    const cartCandidate: DoorCartCandidate = {
        productId: product.id,
        name: product.name,
        sku: product.sku,
        qty: 1,
        basePrice: product.price,
        selectedOptions,
        selectedAccessories: selectedAccessoryItems.map((item) => ({
            productId: item.id,
            qty: selectedAccessories[item.id] ?? 0,
        })),
    };

    const changeOption = (key: keyof SelectedOptions, value: string) => {
        setSelectedOptions((current) => ({ ...current, [key]: value }));
        setAddedItemKey(null);
    };

    const changeAccessoryQty = (productId: number, nextQty: number) => {
        setSelectedAccessories((current) => {
            const next = { ...current };

            if (nextQty <= 0) {
                delete next[productId];
                return next;
            }

            next[productId] = nextQty;
            return next;
        });
        setAddedItemKey(null);
    };

    const handleAddToCart = () => {
        const item = addItem(cartItemInput);
        setAddedItemKey(item.itemKey);
    };

    return (
        <section className="mt-5 border-top pt-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
                <div>
                    <p className="text-uppercase text-muted mb-2 small">Конфигуратор заказа</p>
                    <h2 className="fs-3 mb-0">Комплектация двери</h2>
                </div>

                <div className="border rounded-3 p-3 bg-light" style={{ minWidth: 260 }}>
                    <div className="d-flex justify-content-between gap-3 small mb-1"><span className="text-muted">Полотно</span><span>{formatPrice(product.price)}</span></div>
                    <div className="d-flex justify-content-between gap-3 small mb-1"><span className="text-muted">Опции</span><span>{formatDelta(optionsDelta)}</span></div>
                    <div className="d-flex justify-content-between gap-3 small mb-2"><span className="text-muted">Фурнитура</span><span>{formatPrice(accessoriesTotal)}</span></div>
                    <div className="d-flex justify-content-between gap-3 border-top pt-2 fw-bold"><span>Итого без доставки</span><span>{formatPrice(totalPrice)}</span></div>
                </div>
            </div>

            <div className="row g-3 mb-5">
                <div className="col-12 col-lg-6"><OptionGroupBlock group={product.orderOptions.box} value={selectedOptions.box} onChange={(value) => changeOption("box", value)} /></div>
                <div className="col-12 col-lg-6"><OptionGroupBlock group={product.orderOptions.openingSide} value={selectedOptions.openingSide} onChange={(value) => changeOption("openingSide", value)} /></div>
                <div className="col-12 col-lg-6"><OptionGroupBlock group={product.orderOptions.soundproofing} value={selectedOptions.soundproofing} onChange={(value) => changeOption("soundproofing", value)} /></div>
                <div className="col-12 col-lg-6"><OptionGroupBlock group={product.orderOptions.threshold} value={selectedOptions.threshold} onChange={(value) => changeOption("threshold", value)} /></div>
            </div>

            <div className="mb-5">
                <p className="text-uppercase text-muted mb-2 small">Доп. товары</p>
                <h2 className="fs-3 mb-4">Подходящая фурнитура</h2>
                <AccessoriesGroup title="Ручки" items={product.accessories.handles} selectedAccessories={selectedAccessories} onQtyChange={changeAccessoryQty} />
                <AccessoriesGroup title="Петли" items={product.accessories.hinges} selectedAccessories={selectedAccessories} onQtyChange={changeAccessoryQty} />
                <AccessoriesGroup title="Замки" items={product.accessories.locks} selectedAccessories={selectedAccessories} onQtyChange={changeAccessoryQty} />
            </div>

            <div className="border rounded-3 p-3 bg-light">
                <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
                    <div>
                        <h3 className="fs-5 mb-1">Добавить комплектацию в корзину</h3>
                        <p className="text-muted mb-0 small">Корзина сохраняется локально в браузере. Оформить заказ можно на странице checkout.</p>
                    </div>
                    <button type="button" className="btn btn-dark rounded-pill px-4" onClick={handleAddToCart} disabled={!isHydrated}>
                        {isHydrated ? "Добавить в корзину" : "Загружаем корзину…"}
                    </button>
                </div>

                {addedItemKey ? (
                    <div className="alert alert-success mt-3 mb-0 d-flex flex-column flex-md-row justify-content-between gap-2 align-items-md-center">
                        <span>Комплектация добавлена в корзину.</span>
                        <Link href="/shopping-cart" className="btn btn-sm btn-outline-dark rounded-pill">
                            Перейти в корзину
                        </Link>
                    </div>
                ) : null}

                <details className="mt-3">
                    <summary className="small text-muted">Показать cart-ready payload</summary>
                    <pre className="small bg-white border rounded-3 p-3 mt-2 mb-0 overflow-auto">
                        {JSON.stringify({ cartCandidate, cartItemInput }, null, 2)}
                    </pre>
                </details>
            </div>
        </section>
    );
}
