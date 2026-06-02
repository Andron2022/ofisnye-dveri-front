"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import cart from "@assets/images/shopping-cart/shopping-cart-head.jpg";
import FooterPage from "@src/components/Footer";
import PopupPage from "@src/components/Popup";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import HeadTitle from "@src/commonsections/HeadTitle";
import { useCart } from "@src/lib/cart/CartProvider";
import type { CartAccessorySnapshot, CartItem, CartOptionSnapshot } from "@src/lib/cart/types";
import type {
    CheckoutCustomer,
    CheckoutOrderResponse,
    CheckoutOrderSuccessResponse,
} from "@src/lib/checkout/types";

function formatPrice(value: number | string | null): string {
    if (value === null || value === "") return "Цена по запросу";

    const numberValue = typeof value === "number"
        ? value
        : Number(value.replace(",", "."));

    if (!Number.isFinite(numberValue)) {
        return `${value} ₽`;
    }

    return `${new Intl.NumberFormat("ru-RU").format(numberValue)} ₽`;
}

function buildFullName(customer: CheckoutCustomer): string {
    return [customer.firstName, customer.lastName].map((part) => part.trim()).filter(Boolean).join(" ");
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

function CheckoutItemRow({ item }: { item: CartItem }) {
    return (
        <div className="border-bottom py-3">
            <div className="d-flex justify-content-between gap-3 align-items-start">
                <div>
                    <div className="fw-medium">{item.name} × {item.quantity}</div>
                    <div className="small text-muted mb-2">
                        SKU: {item.sku || "—"}
                        {item.publicArticleNo ? ` · Арт. UI ${item.publicArticleNo}` : ""}
                    </div>
                    <OptionSnapshotList options={item.selectedOptions} />
                    <AccessorySnapshotList accessories={item.selectedAccessories} />
                </div>
                <div className="fw-medium text-nowrap text-end">
                    {formatPrice(item.lineTotal)}
                </div>
            </div>
        </div>
    );
}

function SuccessState({ order }: { order: CheckoutOrderSuccessResponse }) {
    return (
        <div className="border rounded-3 p-4 p-lg-5 bg-light text-center">
            <p className="text-uppercase text-muted small mb-2">Заказ создан</p>
            <h1 className="fs-2 mb-3">Спасибо! Заказ №{order.orderNumber} принят</h1>
            <p className="text-muted mb-4">
                Мы получили заказ в WooCommerce. Менеджер свяжется с клиентом для подтверждения комплектации, доставки и оплаты.
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-pill px-4">
                    Вернуться в каталог
                </Link>
                <Link href="/" className="btn btn-outline-secondary rounded-pill px-4">
                    На главную
                </Link>
            </div>
        </div>
    );
}

const initialCustomer: CheckoutCustomer = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    apartment: "",
    deliveryComment: "",
    orderComment: "",
    termsAccepted: false,
};

const Checkout = () => {
    const { items, totals, isHydrated, clearCart } = useCart();
    const [customer, setCustomer] = useState<CheckoutCustomer>(initialCustomer);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [createdOrder, setCreatedOrder] = useState<CheckoutOrderSuccessResponse | null>(null);

    const fullName = useMemo(() => buildFullName(customer), [customer]);
    const canSubmit = isHydrated && items.length > 0 && !totals.hasUnknownPrices && !isSubmitting;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = event.target;
        const checked = event.target instanceof HTMLInputElement ? event.target.checked : false;

        setCustomer((current) => ({
            ...current,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);

        if (!canSubmit) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/checkout/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer,
                    items,
                }),
            });

            const result = (await response.json()) as CheckoutOrderResponse;

            if (!response.ok || !result.success) {
                throw new Error(result.success ? "Не удалось создать заказ" : result.message);
            }

            setCreatedOrder(result);
            clearCart();
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Не удалось оформить заказ");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <HeadTitle title="Оформление заказа" />
            <TopBanner />
            <Header />

            <div>
                <div
                    style={{ backgroundImage: `url(${cart.src})`, backgroundPosition: "center", backgroundSize: "cover" }}
                    className="position-relative"
                >
                    <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                    <div className="container">
                        <div className="text-white text-center py-5 position-relative">
                            <h1 className="fs-3 fw-medium mb-0">Оформление заказа</h1>
                        </div>
                    </div>
                </div>
            </div>

            <main id="nt_content">
                <section>
                    <div className="container">
                        <div className="my-5">
                            {createdOrder ? (
                                <SuccessState order={createdOrder} />
                            ) : null}

                            {!createdOrder && !isHydrated ? (
                                <div className="alert alert-light border" role="status">
                                    Загружаем корзину…
                                </div>
                            ) : null}

                            {!createdOrder && isHydrated && items.length === 0 ? (
                                <div className="border rounded-3 p-4 p-lg-5 text-center bg-light">
                                    <h1 className="fs-3 mb-3">Корзина пуста</h1>
                                    <p className="text-muted mb-4">Добавь товар в корзину перед оформлением заказа.</p>
                                    <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-pill px-4">
                                        Перейти в каталог дверей
                                    </Link>
                                </div>
                            ) : null}

                            {!createdOrder && isHydrated && items.length > 0 ? (
                                <form onSubmit={handleSubmit} className="row g-5">
                                    <div className="col-lg-7">
                                        <h2 className="border-bottom pb-3 mb-0 fs-3">Контактные данные</h2>
                                        <div className="filter-title mb-4 bg-teal" style={{ width: "134px" }}></div>

                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="firstName">Имя *</label>
                                                <input
                                                    className="form-control rounded-pill"
                                                    id="firstName"
                                                    type="text"
                                                    value={customer.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="lastName">Фамилия</label>
                                                <input
                                                    className="form-control rounded-pill"
                                                    id="lastName"
                                                    type="text"
                                                    value={customer.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="phone">Телефон *</label>
                                                <input
                                                    className="form-control rounded-pill"
                                                    id="phone"
                                                    type="tel"
                                                    value={customer.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="email">Email *</label>
                                                <input
                                                    className="form-control rounded-pill"
                                                    id="email"
                                                    type="email"
                                                    value={customer.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-md-3">
                                            <h2 className="border-bottom pb-3 mb-0 fs-3">Доставка</h2>
                                            <div className="filter-title mb-4 bg-teal" style={{ width: "134px" }}></div>

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="fw-medium mb-2" htmlFor="city">Город *</label>
                                                    <input
                                                        className="form-control rounded-pill"
                                                        id="city"
                                                        type="text"
                                                        value={customer.city}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="fw-medium mb-2" htmlFor="apartment">Квартира / офис</label>
                                                    <input
                                                        className="form-control rounded-pill"
                                                        id="apartment"
                                                        type="text"
                                                        value={customer.apartment}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="fw-medium mb-2" htmlFor="address">Адрес доставки *</label>
                                                    <input
                                                        className="form-control rounded-pill"
                                                        id="address"
                                                        type="text"
                                                        value={customer.address}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="fw-medium mb-2" htmlFor="deliveryComment">Комментарий по доставке</label>
                                                    <textarea
                                                        className="form-control"
                                                        style={{ borderRadius: "20px" }}
                                                        id="deliveryComment"
                                                        rows={4}
                                                        value={customer.deliveryComment}
                                                        onChange={handleChange}
                                                        placeholder="Например: подъезд, этаж, лифт, удобное время звонка"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-md-3">
                                            <h2 className="border-bottom pb-3 mb-0 fs-3">Комментарий к заказу</h2>
                                            <div className="filter-title mb-4 bg-teal" style={{ width: "134px" }}></div>
                                            <textarea
                                                className="form-control"
                                                style={{ borderRadius: "20px" }}
                                                id="orderComment"
                                                rows={5}
                                                value={customer.orderComment}
                                                onChange={handleChange}
                                                placeholder="Дополнительные пожелания по заказу"
                                            />

                                            <div className="alert alert-light border mt-3 small mb-0">
                                                Установка пока не включена в форму. Позже добавим её как отдельную услугу уровня заказа.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-5">
                                        <div className="checkout-order border rounded-3 p-4 bg-white">
                                            <h2 className="border-bottom pb-3 mb-0 fs-3">Ваш заказ</h2>
                                            <div className="filter-title mb-4 bg-teal" style={{ width: "134px" }}></div>

                                            <div className="small text-muted mb-3">
                                                {fullName ? `Покупатель: ${fullName}` : "Заполните контактные данные"}
                                            </div>

                                            {items.map((item) => (
                                                <CheckoutItemRow key={item.itemKey} item={item} />
                                            ))}

                                            <div className="d-flex justify-content-between fw-medium border-bottom mb-0 py-3">
                                                <span>Сумма без доставки</span>
                                                <strong>{formatPrice(totals.subtotal)}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between fw-medium border-bottom mb-0 py-3">
                                                <span>Доставка</span>
                                                <span className="text-muted">Уточнит менеджер</span>
                                            </div>
                                            <div className="d-flex justify-content-between fw-bold mb-0 py-3 fs-5">
                                                <span>Итого к подтверждению</span>
                                                <span>{formatPrice(totals.subtotal)}</span>
                                            </div>

                                            {totals.hasUnknownPrices ? (
                                                <div className="alert alert-warning small mb-3">
                                                    В корзине есть позиции с ценой по запросу. Такой заказ пока нельзя автоматически создать в Woo.
                                                </div>
                                            ) : null}

                                            <div className="alert alert-light border small mb-3">
                                                Онлайн-оплаты сейчас нет. Заказ будет создан в WooCommerce со статусом “На удержании”, после чего менеджер подтвердит цену, доставку и способ оплаты.
                                            </div>

                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="termsAccepted"
                                                    checked={customer.termsAccepted}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-check-label small" htmlFor="termsAccepted">
                                                    Я согласен на обработку данных для оформления заказа *
                                                </label>
                                            </div>

                                            {errorMessage ? (
                                                <div className="alert alert-danger small mb-3" role="alert">
                                                    {errorMessage}
                                                </div>
                                            ) : null}

                                            <button
                                                type="submit"
                                                className="btn btn-teal my-2 px-5 py-3 fw-bold w-100 rounded-pill"
                                                disabled={!canSubmit}
                                            >
                                                {isSubmitting ? "Создаём заказ…" : "Создать заказ"}
                                            </button>

                                            <Link href="/shopping-cart" className="btn btn-outline-secondary rounded-pill w-100 mt-2">
                                                Вернуться в корзину
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            ) : null}
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
            <PopupPage />
        </React.Fragment>
    );
};

export default Checkout;
