"use client";

import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCart } from "@src/lib/cart/CartProvider";
import type { CartAccessorySnapshot, CartItem, CartOptionSnapshot } from "@src/lib/cart/types";

function formatPrice(value: number | null): string {
    if (value === null) return "Цена по запросу";
    return `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;
}

function OptionSnapshotList({ options }: { options: CartOptionSnapshot[] }) {
    return (
        <ul className="list-unstyled small text-muted mb-2">
            {options.map((option) => (
                <li key={option.groupKey}>
                    <span>{option.groupTitle}: </span>
                    <span className="text-body">{option.choiceLabel}</span>
                    {option.priceDelta !== 0 ? (
                        <span> · {option.priceDelta > 0 ? "+" : "−"} {formatPrice(Math.abs(option.priceDelta))}</span>
                    ) : null}
                </li>
            ))}
        </ul>
    );
}

function AccessorySnapshotList({ accessories }: { accessories: CartAccessorySnapshot[] }) {
    if (accessories.length === 0) return null;

    return (
        <div className="small text-muted">
            <div className="fw-medium text-body mb-1">Фурнитура:</div>
            <ul className="mb-0 ps-3">
                {accessories.map((accessory) => (
                    <li key={accessory.productId}>
                        {accessory.name} × {accessory.qty}
                        {accessory.price !== null ? ` · ${formatPrice(accessory.price)}` : " · цена по запросу"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function QuantityControl({ item }: { item: CartItem }) {
    const { setItemQuantity, increaseItemQuantity, decreaseItemQuantity } = useCart();

    return (
        <div className="input-step border border-dark rounded-pill">
            <button
                type="button"
                className="minus material-shadow text-dark fw-bold"
                onClick={() => decreaseItemQuantity(item.itemKey)}
                aria-label="Уменьшить количество"
            >
                –
            </button>
            <input
                type="number"
                className="product-quantity fw-bold fs-6"
                value={item.quantity}
                min={1}
                max={99}
                onChange={(event) => setItemQuantity(item.itemKey, Number(event.target.value))}
            />
            <button
                type="button"
                className="plus material-shadow text-dark fw-bold"
                onClick={() => increaseItemQuantity(item.itemKey)}
                aria-label="Увеличить количество"
            >
                +
            </button>
        </div>
    );
}

function RemoveButton({ itemKey }: { itemKey: string }) {
    const { removeItem } = useCart();

    return (
        <button
            type="button"
            className="btn btn-link p-0 text-muted text-decoration-none"
            onClick={() => removeItem(itemKey)}
            aria-label="Удалить позицию из корзины"
        >
            <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        </button>
    );
}

function CartItemRow({ item }: { item: CartItem }) {
    return (
        <Row className="g-0 border-bottom align-items-start align-items-md-center py-3">
            <Col md={6}>
                <div className="d-flex gap-3 align-items-start">
                    <Link
                        href={item.path}
                        className="rounded-3 bg-light border overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{ width: 96, height: 96 }}
                    >
                        {item.image ? (
                            <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                        ) : (
                            <span className="small text-muted text-center px-2">Нет фото</span>
                        )}
                    </Link>

                    <div className="w-100">
                        <div className="d-flex justify-content-between gap-2">
                            <div>
                                <h6 className="fs-16 mb-1">
                                    <Link href={item.path} className="text-body text-decoration-none">
                                        {item.name}
                                    </Link>
                                </h6>
                                <div className="small text-muted mb-2">
                                    SKU: {item.sku || "—"}
                                    {item.publicArticleNo ? ` · Арт. UI ${item.publicArticleNo}` : ""}
                                </div>
                            </div>
                            <RemoveButton itemKey={item.itemKey} />
                        </div>

                        <OptionSnapshotList options={item.selectedOptions} />
                        <AccessorySnapshotList accessories={item.selectedAccessories} />

                        <div className="border-bottom border-top border-dotted py-2 d-md-none mt-3">
                            <div className="d-flex justify-content-between small mb-2">
                                <span className="text-muted">Цена комплектации</span>
                                <span>{formatPrice(item.unitPrice)}</span>
                            </div>
                            <QuantityControl item={item} />
                            <div className="d-flex justify-content-between fw-medium mt-2">
                                <span>Итого</span>
                                <span>{formatPrice(item.lineTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>

            <Col md={6} className="justify-content-between d-none d-md-flex align-items-center gap-3">
                <p className="text-muted mb-0">{formatPrice(item.unitPrice)}</p>
                <QuantityControl item={item} />
                <p className="text-black text-end mb-0 fw-medium">{formatPrice(item.lineTotal)}</p>
            </Col>
        </Row>
    );
}

function CartSummary() {
    const { totals, clearCart } = useCart();

    return (
        <div className="border rounded-3 p-4 bg-light mt-4 ms-lg-auto" style={{ maxWidth: 420 }}>
            <h2 className="fs-5 mb-3">Итого по корзине</h2>

            <div className="d-flex justify-content-between gap-3 mb-2">
                <span className="text-muted">Позиций</span>
                <span>{totals.itemsCount}</span>
            </div>
            <div className="d-flex justify-content-between gap-3 mb-3">
                <span className="text-muted">Сумма без доставки</span>
                <strong>{formatPrice(totals.subtotal)}</strong>
            </div>

            {totals.hasUnknownPrices ? (
                <div className="alert alert-warning small mb-3">
                    В корзине есть позиции с ценой по запросу. Итоговая сумма будет уточнена менеджером.
                </div>
            ) : null}

            <div className="d-grid gap-2">
                <Link href="/checkout" className="btn btn-dark rounded-pill">
                    Перейти к оформлению
                </Link>
                <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={clearCart}>
                    Очистить корзину
                </button>
            </div>
        </div>
    );
}

const CartDetail = () => {
    const { items, isHydrated } = useCart();

    if (!isHydrated) {
        return (
            <div className="alert alert-light border" role="status">
                Загружаем корзину…
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="border rounded-3 p-4 p-lg-5 text-center bg-light">
                <h1 className="fs-3 mb-3">Корзина пуста</h1>
                <p className="text-muted mb-4">Добавь дверь из карточки товара, и она появится здесь вместе с выбранной комплектацией.</p>
                <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-pill px-4">
                    Перейти в каталог дверей
                </Link>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Row className="d-none d-lg-flex border-bottom pb-2">
                <div className="col-6"><h6>ТОВАР</h6></div>
                <div className="col-2"><h6>ЦЕНА</h6></div>
                <div className="col-2"><h6 className="text-center">КОЛ-ВО</h6></div>
                <div className="col-2"><h6 className="text-end">ИТОГО</h6></div>
            </Row>

            {items.map((item) => (
                <CartItemRow key={item.itemKey} item={item} />
            ))}

            <CartSummary />
        </React.Fragment>
    );
};

export default CartDetail;
