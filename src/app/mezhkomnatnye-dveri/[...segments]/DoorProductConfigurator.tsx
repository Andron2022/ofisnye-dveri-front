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
    quantity: number,
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
        quantity,
    };
}

function OptionGroupBlock({ group, value, onChange }: {
    group: DoorOptionGroup;
    value: string;
    onChange: (nextValue: string) => void;
}) {
    return (
        <div className="border rounded-4 p-4 bg-white h-100 shadow-sm">
            <div className="mb-3 pb-3 border-bottom">
                <h3 className="fs-5 mb-1">{group.title}</h3>
                <div className="small text-muted">Выберите подходящий вариант</div>
            </div>

            <div className="d-flex flex-wrap gap-2">
                {group.choices.map((choice) => {
                    const inputId = `${group.key}-${choice.id}`;
                    const isSelected = value === choice.id;

                    return (
                        <label
                            key={choice.id}
                            htmlFor={inputId}
                            className={`border rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 ${isSelected ? "border-dark bg-dark text-white" : "bg-light"} ${choice.enabled ? "" : "opacity-50"}`}
                            style={{ cursor: choice.enabled ? "pointer" : "not-allowed" }}
                        >
                            <input
                                id={inputId}
                                className="visually-hidden"
                                type="radio"
                                name={group.key}
                                value={choice.id}
                                checked={isSelected}
                                disabled={!choice.enabled}
                                onChange={() => onChange(choice.id)}
                            />
                            <span className="fw-medium fs-14">{choice.label}</span>
                            <span className={`fs-12 ${isSelected ? "text-white-50" : "text-muted"}`}>{formatDelta(choice.priceDelta)}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

function AccessoryRow({ item, qty, onQtyChange }: {
    item: DoorAccessoryCard;
    qty: number;
    onQtyChange: (nextQty: number) => void;
}) {
    const price = toNumber(item.price);
    const lineTotal = price === null ? null : price * qty;

    return (
        <tr>
            <td style={{ width: 120 }}>
                <div className="bg-light overflow-hidden d-flex align-items-center justify-content-center" style={{ width: 96, height: 72 }}>
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                    ) : (
                        <span className="small text-muted text-center px-2">Нет фото</span>
                    )}
                </div>
            </td>
            <td>
                <div className="fw-medium">{item.shortLabel || item.name}</div>
                <div className="small text-muted">Артикул: {item.sku || item.publicArticleNo || "—"}</div>
            </td>
            <td className="text-nowrap fw-medium">{formatPrice(item.price)}</td>
            <td className="text-nowrap">
                <div className="input-step border rounded-pill bg-white mx-auto">
                    <button type="button" aria-label="Уменьшить количество" onClick={() => onQtyChange(Math.max(0, qty - 1))}>−</button>
                    <input
                        id={`accessory-${item.id}`}
                        type="number"
                        min={0}
                        step={1}
                        value={qty}
                        onChange={(event) => {
                            const nextQty = Math.max(0, Math.floor(Number(event.target.value) || 0));
                            onQtyChange(nextQty);
                        }}
                    />
                    <button type="button" aria-label="Увеличить количество" onClick={() => onQtyChange(qty + 1)}>+</button>
                </div>
            </td>
            <td className="text-nowrap fw-medium">{formatPrice(lineTotal)}</td>
            <td className="text-end">
                <button
                    type="button"
                    className="btn btn-info text-white rounded-3 px-3 text-nowrap"
                    onClick={() => onQtyChange(Math.max(qty, item.recommendedQty || 1))}
                >
                    <i className="iccl iccl-cart me-2" />
                    Добавить к комплекту
                </button>
            </td>
        </tr>
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
        <div className="mb-5">
            <h3 className="fs-5 mb-3">{title}</h3>
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                    <thead>
                    <tr>
                        <th scope="col">Фото</th>
                        <th scope="col">Фурнитура</th>
                        <th scope="col">Цена</th>
                        <th scope="col" className="text-center">Количество</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col" className="text-end">Выбор</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <AccessoryRow
                            key={item.id}
                            item={item}
                            qty={selectedAccessories[item.id] ?? 0}
                            onQtyChange={(nextQty) => onQtyChange(item.id, nextQty)}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function DoorProductConfigurator({ product }: { product: DoorProductDetails }) {
    const { addItem, isHydrated } = useCart();
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => getInitialSelectedOptions(product));
    const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessoryMap>({});
    const [quantity, setQuantity] = useState(1);
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
        () => buildCartItemInput(product, selectedOptions, selectedAccessories, quantity),
        [product, selectedOptions, selectedAccessories, quantity],
    );

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
        <section id="door-configurator" className="py-5 bg-light border-top">
            <div className="container">
                <div className="bg-white p-4 p-lg-5 mb-5">
                    <div className="mb-4 pb-4 border-bottom">
                        <p className="text-uppercase text-muted mb-2 small">Выбор комплектации</p>
                        <h2 className="fs-3 mb-2">Комплектация двери</h2>
                        <p className="text-muted mb-0">Выберите коробку, сторону открывания, звукоизоляцию и порог. Итоговая стоимость пересчитывается автоматически.</p>
                    </div>

                    <div className="row g-4 row-cols-1 row-cols-xl-2">
                        <div className="col"><OptionGroupBlock group={product.orderOptions.box} value={selectedOptions.box} onChange={(value) => changeOption("box", value)} /></div>
                        <div className="col"><OptionGroupBlock group={product.orderOptions.openingSide} value={selectedOptions.openingSide} onChange={(value) => changeOption("openingSide", value)} /></div>
                        <div className="col"><OptionGroupBlock group={product.orderOptions.soundproofing} value={selectedOptions.soundproofing} onChange={(value) => changeOption("soundproofing", value)} /></div>
                        <div className="col"><OptionGroupBlock group={product.orderOptions.threshold} value={selectedOptions.threshold} onChange={(value) => changeOption("threshold", value)} /></div>
                    </div>
                </div>

                <div className="bg-white p-4 p-lg-5 mb-5">
                    <p className="text-uppercase text-muted mb-2 small">Фурнитура</p>
                    <h2 className="fs-3 mb-4">Фурнитура</h2>
                    <AccessoriesGroup title="Ручки" items={product.accessories.handles} selectedAccessories={selectedAccessories} onQtyChange={changeAccessoryQty} />
                    <AccessoriesGroup title="Петли" items={product.accessories.hinges} selectedAccessories={selectedAccessories} onQtyChange={changeAccessoryQty} />
                    <AccessoriesGroup title="Замки" items={product.accessories.locks} selectedAccessories={selectedAccessories} onQtyChange={changeAccessoryQty} />
                </div>

                <div className="bg-white p-4">
                    <div className="mb-3 pb-3 border-bottom">
                        <h3 className="fs-5 mb-1">Добавить выбранный комплект в корзину</h3>
                        <p className="text-muted mb-0 small">Проверьте состав комплекта перед добавлением в корзину.</p>
                    </div>

                    <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-stretch">
                        <div className="border rounded-3 p-3 bg-light flex-grow-1" style={{ flexBasis: "66.666%" }}>
                            <div className="d-flex justify-content-between gap-3 small mb-1"><span className="text-muted">Полотно</span><span>{formatPrice(product.price)}</span></div>
                            <div className="d-flex justify-content-between gap-3 small mb-1"><span className="text-muted">Опции</span><span>{formatDelta(optionsDelta)}</span></div>
                            <div className="d-flex justify-content-between gap-3 small mb-2"><span className="text-muted">Фурнитура</span><span>{formatPrice(accessoriesTotal)}</span></div>
                            <div className="d-flex justify-content-between gap-3 border-top pt-2 fw-bold"><span>Итого без доставки</span><span>{formatPrice(totalPrice)}</span></div>

                            <div className="border-top mt-3 pt-3">
                                <h4 className="fs-6 mb-2">Комплектация</h4>
                                <ul className="list-unstyled small text-muted mb-0 d-grid gap-1">
                                    {cartItemInput.selectedOptions.map((option) => (
                                        <li key={option.groupKey} className="d-flex justify-content-between gap-3">
                                            <span>{option.groupTitle}</span>
                                            <span className="text-body text-end">{option.choiceLabel} · {formatDelta(option.priceDelta)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-top mt-3 pt-3">
                                <h4 className="fs-6 mb-2">Фурнитура</h4>
                                {cartItemInput.selectedAccessories.length > 0 ? (
                                    <ul className="list-unstyled small text-muted mb-0 d-grid gap-1">
                                        {cartItemInput.selectedAccessories.map((accessory) => (
                                            <li key={accessory.productId} className="d-flex justify-content-between gap-3">
                                                <span>{accessory.name}</span>
                                                <span className="text-body text-end">× {accessory.qty}{accessory.price !== null ? ` · ${formatPrice(accessory.price * accessory.qty)}` : ""}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="small text-muted mb-0">Фурнитура пока не выбрана.</p>
                                )}
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-3 flex-shrink-0" style={{ flexBasis: "33.333%" }}>
                            <div className="d-flex align-items-center gap-3 justify-content-lg-end">
                                <div className="input-step border rounded-pill bg-white">
                                    <button type="button" aria-label="Уменьшить количество комплектов" onClick={() => { setQuantity((current) => Math.max(1, current - 1)); setAddedItemKey(null); }}>−</button>
                                    <input
                                        id="door-kit-quantity"
                                        type="number"
                                        min={1}
                                        step={1}
                                        value={quantity}
                                        onChange={(event) => {
                                            const nextQuantity = Math.max(1, Math.floor(Number(event.target.value) || 1));
                                            setQuantity(nextQuantity);
                                            setAddedItemKey(null);
                                        }}
                                    />
                                    <button type="button" aria-label="Увеличить количество комплектов" onClick={() => { setQuantity((current) => current + 1); setAddedItemKey(null); }}>+</button>
                                </div>
                                <button type="button" className="btn btn-info text-white rounded-pill px-5" onClick={handleAddToCart} disabled={!isHydrated}>
                                    {isHydrated ? "Добавить в корзину" : "Загружаем корзину…"}
                                </button>
                            </div>

                            <p className="text-muted mb-0 small">В корзину попадёт дверь, выбранная комплектация и отмеченная фурнитура. Доставка и установка подтверждаются менеджером.</p>
                        </div>
                    </div>
                </div>

                {addedItemKey ? (
                    <div className="alert alert-success mt-3 mb-0 d-flex flex-column flex-md-row justify-content-between gap-2 align-items-md-center">
                        <span>Комплект добавлен в корзину.</span>
                        <Link href="/shopping-cart" className="btn btn-sm btn-outline-dark rounded-pill">
                            Перейти в корзину
                        </Link>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
