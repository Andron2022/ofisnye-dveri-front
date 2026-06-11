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
    if (options.length === 0) return null;

    return (
        <ul className="list-unstyled small text-muted mb-2">
            {options.map((option) => (
                <li key={option.groupKey} className="mb-1">
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
        <div className="input-step border border-dark rounded-pill mx-auto">
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
                aria-label="Количество"
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
            <svg width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
        <Row className="g-0 border-bottom align-items-start align-items-lg-center py-4">
            <Col lg={6}>
                <div className="d-flex gap-3 gap-md-4 align-items-start">
                    <Link
                        href={item.path}
                        className="bg-light overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{ width: 126, height: 126 }}
                    >
                        {item.image ? (
                            <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                        ) : (
                            <span className="small text-muted text-center px-2">Нет фото</span>
                        )}
                    </Link>

                    <div className="w-100 pt-md-2">
                        <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                                <h2 className="fs-18 fw-semibold mb-2">
                                    <Link href={item.path} className="text-body text-decoration-none main_link_acid_green">
                                        {item.name}
                                    </Link>
                                </h2>
                                <div className="small text-muted mb-2">
                                    Артикул: {item.sku || "—"}
                                    {item.publicArticleNo ? ` · ${item.publicArticleNo}` : ""}
                                </div>
                            </div>
                            <RemoveButton itemKey={item.itemKey} />
                        </div>

                        <OptionSnapshotList options={item.selectedOptions} />
                        <AccessorySnapshotList accessories={item.selectedAccessories} />

                        <div className="border-top border-bottom border-dotted py-3 d-lg-none mt-3">
                            <div className="d-flex justify-content-between small mb-3">
                                <span className="text-muted">Цена комплектации</span>
                                <span>{formatPrice(item.unitPrice)}</span>
                            </div>
                            <QuantityControl item={item} />
                            <div className="d-flex justify-content-between fw-semibold mt-3">
                                <span>Итого</span>
                                <span>{formatPrice(item.lineTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>

            <Col lg={6} className="d-none d-lg-grid align-items-center" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                <p className="text-muted mb-0">{formatPrice(item.unitPrice)}</p>
                <QuantityControl item={item} />
                <p className="text-black text-end mb-0 fw-semibold">{formatPrice(item.lineTotal)}</p>
            </Col>
        </Row>
    );
}

function CartCheckoutSummary() {
    const { totals, clearCart } = useCart();

    return (
        <div className="text-lg-end">
            <div className="mb-4">
                <div className="d-flex justify-content-lg-end justify-content-between align-items-center gap-4 mb-3">
                    <h2 className="fs-5 fw-bold text-uppercase mb-0">Итого:</h2>
                    <strong className="fs-5">{formatPrice(totals.subtotal)}</strong>
                </div>
                <p className="text-muted small mb-0">
                    Доставка, установка и возможные дополнительные работы рассчитываются после проверки заказа менеджером.
                </p>
            </div>

            {totals.hasUnknownPrices ? (
                <div className="alert alert-warning small text-start mb-3">
                    В корзине есть позиции с ценой по запросу. Итоговая сумма будет уточнена менеджером.
                </div>
            ) : null}

            <div className="d-grid gap-2 ms-lg-auto" style={{ maxWidth: 320 }}>
                <Link href="/checkout" className="btn btn-teal rounded-pill py-3 fw-semibold text-uppercase">
                    Оформить заказ
                </Link>
                <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={clearCart}>
                    Очистить корзину
                </button>
            </div>

            <div className="d-flex flex-wrap justify-content-lg-end gap-2 mt-3 small text-muted">
                <span className="border rounded-pill px-3 py-1">Заказ без онлайн-оплаты</span>
                <span className="border rounded-pill px-3 py-1">Подтверждение менеджером</span>
            </div>
        </div>
    );
}

function CartServiceBlock() {
    return (
        <div className="border p-4 p-lg-5 mt-5">
            <div className="row g-4 align-items-center">
                <div className="col-lg-4">
                    <h2 className="fs-3 fw-semibold mb-2">Доставка и установка</h2>
                    <p className="text-muted mb-0">
                        После оформления заказа менеджер уточнит адрес, подъём, монтаж и согласует итоговую стоимость услуг.
                    </p>
                </div>
                <div className="col-lg-8">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <div className="border rounded-3 p-3 h-100">
                                <div className="fw-semibold mb-1">1. Проверка заказа</div>
                                <p className="small text-muted mb-0">Сверим дверь, комплектацию и фурнитуру.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="border rounded-3 p-3 h-100">
                                <div className="fw-semibold mb-1">2. Расчёт доставки</div>
                                <p className="small text-muted mb-0">Учтём адрес, объём и условия подъёма.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="border rounded-3 p-3 h-100">
                                <div className="fw-semibold mb-1">3. Согласование</div>
                                <p className="small text-muted mb-0">Подтвердим сроки, оплату и дальнейшие действия.</p>
                            </div>
                        </div>
                    </div>
                </div>
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
            <div className="border p-4 p-lg-5 text-center bg-light">
                <h1 className="fs-3 mb-3">Корзина пуста</h1>
                <p className="text-muted mb-4">Добавь дверь из карточки товара, и она появится здесь вместе с выбранной комплектацией.</p>
                <Link href="/mezhkomnatnye-dveri" className="btn btn-teal rounded-pill px-5 py-3 fw-semibold">
                    Перейти в каталог дверей
                </Link>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Row className="d-none d-lg-flex border-bottom pb-3 text-uppercase small fw-bold">
                <div className="col-6">Товар</div>
                <div className="col-2">Цена</div>
                <div className="col-2 text-center">Количество</div>
                <div className="col-2 text-end">Итого</div>
            </Row>

            {items.map((item) => (
                <CartItemRow key={item.itemKey} item={item} />
            ))}

            <div className="row g-5 mt-4 align-items-start">
                <div className="col-lg-6">
                    <div className="mb-4">
                        <h2 className="fs-6 fw-semibold mb-3">Комментарий к заказу</h2>
                        <div className="border p-4 text-muted small">
                            Комментарий, пожелания по доставке и данные объекта можно добавить на следующем шаге оформления.
                        </div>
                    </div>
                    <Link href="/mezhkomnatnye-dveri" className="main_link_acid_green fw-semibold text-decoration-none">
                        ← Продолжить выбор дверей
                    </Link>
                </div>
                <div className="col-lg-5 ms-lg-auto">
                    <CartCheckoutSummary />
                </div>
            </div>

            <CartServiceBlock />
        </React.Fragment>
    );
};

export default CartDetail;
