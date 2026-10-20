"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { AccessoryImageLightbox } from "@src/components/storefront/AccessoryImageLightbox";
import { DoorPdpCartFeedback, type CartAdditionFeedback } from "@src/components/storefront/DoorPdpCartFeedback";
import { useCart } from "@src/lib/cart/CartProvider";
import type { CartAccessorySnapshot, CartItemInput, CartOptionSnapshot } from "@src/lib/cart/types";
import type {
    DoorAccessoryCard,
    DoorCartCandidate,
    DoorOptionChoice,
    DoorOptionGroup,
    DoorProductDetails,
} from "@src/lib/woo/types";
import type { DoorPdpConfiguratorComplectContent } from "@src/lib/wp/door-pdp-service-tabs";
import styles from "./DoorProductConfigurator.module.scss";

type SelectedOptions = DoorCartCandidate["selectedOptions"];
type SelectedAccessoryMap = Record<number, number>;

// Match the existing cart/checkout quantity range without changing their contracts.
function normalizeQuantity(value: number, minimum: number): number {
    return Number.isFinite(value) ? Math.max(minimum, Math.min(99, Math.floor(value))) : minimum;
}

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
    return Object.fromEntries(product.orderOptions.map((group) => [group.key, group.defaultOptionId]));
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
    return product.orderOptions.reduce((sum, group) => {
        const selectedId = selectedOptions[group.key] ?? group.defaultOptionId;
        return sum + (findSelectedChoice(group, selectedId)?.priceDelta ?? 0);
    }, 0);
}

function getAllAccessories(product: DoorProductDetails): DoorAccessoryCard[] {
    const unique = new Map<number, DoorAccessoryCard>();
    for (const group of product.accessories) {
        for (const item of group.items) unique.set(item.id, item);
    }
    return Array.from(unique.values());
}

function buildSelectedOptionSnapshots(
    product: DoorProductDetails,
    selectedOptions: SelectedOptions,
): CartOptionSnapshot[] {
    return product.orderOptions.map((group) => {
        const selectedId = selectedOptions[group.key] ?? group.defaultOptionId;
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
    const [imageOpen, setImageOpen] = useState(false);
    const price = toNumber(item.price);
    const lineTotal = price === null ? null : price * qty;

    return (
        <tr>
            <td style={{ width: 120 }}>
                {item.image ? (
                    <>
                        <button type="button" className={styles.photo} aria-label={`Увеличить фото: ${item.name}`} onClick={() => setImageOpen(true)}>
                            <img src={item.image} alt={item.name} width={96} height={72} />
                            <span className={styles.zoom} aria-hidden="true"><FiZoomIn size={16} /></span>
                        </button>
                        {imageOpen ? <AccessoryImageLightbox src={item.image} name={item.name} onClose={() => setImageOpen(false)} /> : null}
                    </>
                ) : (
                    <div className={styles.photo}>
                        <span className="small text-muted text-center px-2">Нет фото</span>
                    </div>
                )}
            </td>
            <td>
                <div className="fw-medium">{item.shortLabel || item.name}</div>
                <div className="small text-muted">Артикул: {item.sku || item.publicArticleNo || "—"}</div>
            </td>
            <td className="text-nowrap fw-medium">{formatPrice(item.price)}</td>
            <td className="text-nowrap">
                <div className={`input-step border rounded-pill bg-white ${styles.quantity}`}>
                    <button type="button" aria-label={`Уменьшить количество: ${item.name}`} disabled={qty <= 0} onClick={() => onQtyChange(qty - 1)}>−</button>
                    <input
                        id={`accessory-${item.id}`}
                        type="number"
                        min={0}
                        max={99}
                        step={1}
                        inputMode="numeric"
                        aria-label={`Количество: ${item.name}`}
                        value={qty}
                        onChange={(event) => {
                            const nextQty = normalizeQuantity(Number(event.target.value), 0);
                            onQtyChange(nextQty);
                        }}
                    />
                    <button type="button" aria-label={`Увеличить количество: ${item.name}`} disabled={qty >= 99} onClick={() => onQtyChange(qty + 1)}>+</button>
                </div>
            </td>
            <td className="text-nowrap fw-medium">{formatPrice(lineTotal)}</td>
        </tr>
    );
}

function AccessoriesGroup({ title, items, selectedAccessories, onQtyChange, panelId, tabId }: {
    title: string;
    items: DoorAccessoryCard[];
    selectedAccessories: SelectedAccessoryMap;
    onQtyChange: (productId: number, nextQty: number) => void;
    panelId: string;
    tabId: string;
}) {
    if (items.length === 0) return null;

    return (
        <div id={panelId} role="tabpanel" aria-labelledby={tabId} tabIndex={0}>
            <h3 className="visually-hidden">{title}</h3>
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                    <thead>
                    <tr>
                        <th scope="col">Фото</th>
                        <th scope="col">Фурнитура</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Стоимость</th>
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

export default function DoorProductConfigurator({ product, complectContent }: {
    product: DoorProductDetails;
    complectContent: DoorPdpConfiguratorComplectContent;
}) {
    const { addItem, isHydrated, items } = useCart();
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(() => getInitialSelectedOptions(product));
    const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessoryMap>({});
    const [quantity, setQuantity] = useState(1);
    const accessoryGroups = product.accessories.filter((group) => group.items.length > 0);
    const [activeGroupKey, setActiveGroupKey] = useState(() => accessoryGroups[0]?.key ?? "");
    const activeGroup = accessoryGroups.find((group) => group.key === activeGroupKey) ?? accessoryGroups[0];
    const tabsId = useId();
    const additionId = useRef(0);
    const [pendingAddition, setPendingAddition] = useState<{
        id: number; itemKey: string; previousQuantity: number; requestedQuantity: number;
    } | null>(null);
    const [cartFeedback, setCartFeedback] = useState<CartAdditionFeedback | null>(null);

    useEffect(() => {
        if (!pendingAddition) return;
        const updatedItem = items.find((item) => item.itemKey === pendingAddition.itemKey);
        if (!updatedItem) return;
        setCartFeedback({
            id: pendingAddition.id,
            addedQuantity: Math.max(0, updatedItem.quantity - pendingAddition.previousQuantity),
            requestedQuantity: pendingAddition.requestedQuantity,
        });
        setPendingAddition(null);
    }, [items, pendingAddition]);

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

    const changeOption = (key: string, value: string) => {
        setSelectedOptions((current) => ({ ...current, [key]: value }));
    };

    const changeAccessoryQty = (productId: number, nextQty: number) => {
        nextQty = normalizeQuantity(nextQty, 0);
        setSelectedAccessories((current) => {
            const next = { ...current };

            if (nextQty <= 0) {
                delete next[productId];
                return next;
            }

            next[productId] = nextQty;
            return next;
        });
    };

    const handleAddToCart = () => {
        const item = addItem(cartItemInput);
        setPendingAddition({
            id: ++additionId.current,
            itemKey: item.itemKey,
            previousQuantity: items.find((existing) => existing.itemKey === item.itemKey)?.quantity ?? 0,
            requestedQuantity: quantity,
        });
    };

    return (
        <section id="door-configurator" className="py-5 bg-light border-top">
            <div className="container">
                <div className="bg-white p-3 p-lg-4 mb-5">
                    <div className="mb-4 pb-4 border-bottom text-center">
                        <p className="text-uppercase text-muted mb-2 small">{complectContent.eyebrow}</p>
                        <h2 className="fs-3 mb-2">{complectContent.title}</h2>
                        <p className="text-muted mb-0">{complectContent.description}</p>
                    </div>

                    {product.orderOptions.length > 0 ? (
                        <div className="row g-4 row-cols-1 row-cols-xl-2">
                            {product.orderOptions.map((group) => (
                                <div className="col" key={group.key}>
                                    <OptionGroupBlock
                                        group={group}
                                        value={selectedOptions[group.key] ?? group.defaultOptionId}
                                        onChange={(value) => changeOption(group.key, value)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-muted mb-0">Для этой двери дополнительные опции не настроены.</p>}
                </div>

                <div className="bg-white p-3 p-lg-4 mb-5">
                    <h2 className="fs-3 mb-4 text-center">Фурнитура</h2>
                    {activeGroup ? <>
                        <div className={styles.tabs} role="tablist" aria-label="Группы фурнитуры">
                            {accessoryGroups.map((group, index) => {
                                const selectedCount = group.items.filter((item) => (selectedAccessories[item.id] ?? 0) > 0).length;
                                return (
                                    <button
                                        key={group.key}
                                        type="button"
                                        id={`${tabsId}-tab-${group.key}`}
                                        role="tab"
                                        aria-selected={activeGroup.key === group.key}
                                        aria-controls={`${tabsId}-panel-${group.key}`}
                                        tabIndex={activeGroup.key === group.key ? 0 : -1}
                                        onClick={() => setActiveGroupKey(group.key)}
                                        onKeyDown={(event) => {
                                            let nextIndex: number;
                                            if (event.key === "ArrowRight") nextIndex = (index + 1) % accessoryGroups.length;
                                            else if (event.key === "ArrowLeft") nextIndex = (index - 1 + accessoryGroups.length) % accessoryGroups.length;
                                            else if (event.key === "Home") nextIndex = 0;
                                            else if (event.key === "End") nextIndex = accessoryGroups.length - 1;
                                            else return;
                                            event.preventDefault();
                                            const nextGroup = accessoryGroups[nextIndex];
                                            setActiveGroupKey(nextGroup.key);
                                            const tab = document.getElementById(`${tabsId}-tab-${nextGroup.key}`);
                                            tab?.focus({ preventScroll: true });
                                            tab?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
                                        }}
                                    >
                                        {group.title}
                                        {selectedCount > 0 ? <><span className={styles.selected} aria-hidden="true" /><span className="visually-hidden">Выбрано позиций: {selectedCount}</span></> : null}
                                    </button>
                                );
                            })}
                        </div>
                        <AccessoriesGroup
                            key={activeGroup.key}
                            panelId={`${tabsId}-panel-${activeGroup.key}`}
                            tabId={`${tabsId}-tab-${activeGroup.key}`}
                            title={activeGroup.title}
                            items={activeGroup.items}
                            selectedAccessories={selectedAccessories}
                            onQtyChange={changeAccessoryQty}
                        />
                        {accessoryGroups.filter((group) => group.key !== activeGroup.key).map((group) => (
                            <div key={group.key} id={`${tabsId}-panel-${group.key}`} role="tabpanel" aria-labelledby={`${tabsId}-tab-${group.key}`} hidden />
                        ))}
                    </> : <p className="text-muted mb-0">Для этой двери фурнитура не настроена.</p>}
                </div>

                <div className="bg-white p-4">
                    <div className="mb-3 pb-3 border-bottom text-center">
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
                            <div className={styles.actions} data-pdp-cart-actions>
                                <div className={`input-step border rounded-pill bg-white ${styles.quantity}`}>
                                    <button type="button" aria-label="Уменьшить количество комплектов" disabled={quantity <= 1} onClick={() => setQuantity((current) => normalizeQuantity(current - 1, 1))}>−</button>
                                    <input
                                        id="door-kit-quantity"
                                        type="number"
                                        min={1}
                                        max={99}
                                        step={1}
                                        inputMode="numeric"
                                        aria-label="Количество комплектов двери"
                                        value={quantity}
                                        onChange={(event) => {
                                            const nextQuantity = normalizeQuantity(Number(event.target.value), 1);
                                            setQuantity(nextQuantity);
                                        }}
                                    />
                                    <button type="button" aria-label="Увеличить количество комплектов" disabled={quantity >= 99} onClick={() => setQuantity((current) => normalizeQuantity(current + 1, 1))}>+</button>
                                </div>
                                <button type="button" className={`btn btn-info text-white rounded-pill px-5 ${styles.addButton}`} onClick={handleAddToCart} disabled={!isHydrated}>
                                    {isHydrated ? "Добавить в корзину" : "Загружаем корзину…"}
                                </button>
                            </div>

                            <p className="text-muted mb-0 small">В корзину попадёт дверь, выбранная комплектация и отмеченная фурнитура. Доставка и установка подтверждаются менеджером.</p>
                        </div>
                    </div>
                </div>

            </div>
            <DoorPdpCartFeedback feedback={cartFeedback} />
        </section>
    );
}
