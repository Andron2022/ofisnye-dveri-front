"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
    CheckoutFieldError,
    CheckoutOrderResponse,
} from "@src/lib/checkout/types";
import { getCheckoutErrorMessage, validateCheckoutOrderRequest } from "@src/lib/checkout/validation";

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

function buildFieldErrorMap(errors: CheckoutFieldError[]): Partial<Record<CheckoutFieldError["field"], string>> {
    return errors.reduce<Partial<Record<CheckoutFieldError["field"], string>>>((result, error) => {
        if (!result[error.field]) {
            result[error.field] = error.message;
        }

        return result;
    }, {});
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
    return (
        <div className="mb-4">
            <div className="small text-muted text-uppercase fw-semibold mb-1">{eyebrow}</div>
            <h2 className="border-bottom pb-3 mb-0 fs-3">{title}</h2>
            <div className="filter-title mb-0 bg-teal" style={{ width: "134px" }}></div>
        </div>
    );
}

function OptionSnapshotList({ options }: { options: CartOptionSnapshot[] }) {
    if (options.length === 0) return null;

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
                <div className="d-flex gap-3 align-items-start">
                    <Link
                        href={item.path}
                        className="bg-light overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{ width: 72, height: 72 }}
                    >
                        {item.image ? (
                            <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                        ) : (
                            <span className="small text-muted text-center px-2">Нет фото</span>
                        )}
                    </Link>
                    <div>
                        <div className="fw-semibold">
                            <Link href={item.path} className="text-body text-decoration-none main_link_acid_green">
                                {item.name}
                            </Link>
                            <span className="text-muted"> × {item.quantity}</span>
                        </div>
                        <div className="small text-muted mb-2">
                            Артикул: {item.sku || "—"}
                            {item.publicArticleNo ? ` · ${item.publicArticleNo}` : ""}
                        </div>
                        <OptionSnapshotList options={item.selectedOptions} />
                        <AccessorySnapshotList accessories={item.selectedAccessories} />
                    </div>
                </div>
                <div className="fw-semibold text-nowrap text-end">
                    {formatPrice(item.lineTotal)}
                </div>
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
    contactMethod: "phone",
    customerType: "person",
    companyName: "",
    termsAccepted: false,
};

const Checkout = () => {
    const router = useRouter();
    const { items, totals, isHydrated, clearCart } = useCart();
    const [customer, setCustomer] = useState<CheckoutCustomer>(initialCustomer);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<CheckoutFieldError["field"], string>>>({});

    const fullName = useMemo(() => buildFullName(customer), [customer]);
    const canSubmit = isHydrated && items.length > 0 && !totals.hasUnknownPrices && !isSubmitting;

    const getFieldError = (field: CheckoutFieldError["field"]): string | null => fieldErrors[field] ?? null;

    const getInputClassName = (field: CheckoutFieldError["field"], rounded = true): string => {
        const baseClass = rounded ? "form-control rounded-pill" : "form-control";
        return getFieldError(field) ? `${baseClass} is-invalid` : baseClass;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = event.target;
        const checked = event.target instanceof HTMLInputElement ? event.target.checked : false;

        setCustomer((current) => ({
            ...current,
            [id]: type === "checkbox" ? checked : value,
        }));

        setFieldErrors((current) => {
            if (!(id in current)) return current;

            const nextErrors = { ...current };
            delete nextErrors[id as CheckoutFieldError["field"]];
            return nextErrors;
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setFieldErrors({});

        if (!canSubmit) {
            return;
        }

        const validation = validateCheckoutOrderRequest({
            customer,
            items,
        });

        if (!validation.ok) {
            setCustomer(validation.value.customer);
            setFieldErrors(buildFieldErrorMap(validation.errors));
            setErrorMessage(getCheckoutErrorMessage(validation.errors));
            return;
        }

        setCustomer(validation.value.customer);
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/checkout/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validation.value),
            });

            const result = (await response.json()) as CheckoutOrderResponse;

            if (!response.ok || !result.success) {
                if (!result.success && result.errors) {
                    setFieldErrors(buildFieldErrorMap(result.errors));
                }

                throw new Error(result.success ? "Не удалось создать заказ" : result.message);
            }

            clearCart();
            router.push(result.successPath);
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

            <div
                style={{ backgroundImage: `url(${cart.src})`, backgroundPosition: "center", backgroundSize: "cover" }}
                className="position-relative"
            >
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className="container">
                    <div className="text-white text-center py-5 position-relative">
                        <h1 className="fs-3 fw-medium mb-2">Оформление заказа</h1>
                        <p className="mb-0 small text-white-50">Контакты, доставка и подтверждение состава заказа</p>
                    </div>
                </div>
            </div>

            <main id="nt_content">
                <section className="py-5">
                    <div className="container">
                        {!isHydrated ? (
                            <div className="alert alert-light border" role="status">
                                Загружаем корзину…
                            </div>
                        ) : null}

                        {isHydrated && items.length === 0 ? (
                            <div className="border p-4 p-lg-5 text-center bg-light">
                                <h1 className="fs-3 mb-3">Корзина пуста</h1>
                                <p className="text-muted mb-4">Добавь товар в корзину перед оформлением заказа.</p>
                                <Link href="/mezhkomnatnye-dveri" className="btn btn-teal rounded-pill px-5 py-3 fw-semibold">
                                    Перейти в каталог дверей
                                </Link>
                            </div>
                        ) : null}

                        {isHydrated && items.length > 0 ? (
                            <form onSubmit={handleSubmit} className="row g-5 align-items-start" noValidate>
                                <div className="col-lg-7">
                                    <div className="border p-4 p-lg-5 bg-white">
                                        <SectionTitle eyebrow="Шаг 1" title="Контактные данные" />

                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="firstName">Имя *</label>
                                                <input
                                                    className={getInputClassName("firstName")}
                                                    id="firstName"
                                                    type="text"
                                                    value={customer.firstName}
                                                    onChange={handleChange}
                                                    aria-invalid={Boolean(getFieldError("firstName"))}
                                                    autoComplete="given-name"
                                                    required
                                                />
                                                {getFieldError("firstName") ? <div className="invalid-feedback">{getFieldError("firstName")}</div> : null}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="lastName">Фамилия</label>
                                                <input
                                                    className="form-control rounded-pill"
                                                    id="lastName"
                                                    type="text"
                                                    value={customer.lastName}
                                                    onChange={handleChange}
                                                    autoComplete="family-name"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="phone">Телефон *</label>
                                                <input
                                                    className={getInputClassName("phone")}
                                                    id="phone"
                                                    type="tel"
                                                    value={customer.phone}
                                                    onChange={handleChange}
                                                    aria-invalid={Boolean(getFieldError("phone"))}
                                                    autoComplete="tel"
                                                    placeholder="+7 999 000-00-00"
                                                    required
                                                />
                                                {getFieldError("phone") ? <div className="invalid-feedback">{getFieldError("phone")}</div> : null}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="email">Email *</label>
                                                <input
                                                    className={getInputClassName("email")}
                                                    id="email"
                                                    type="email"
                                                    value={customer.email}
                                                    onChange={handleChange}
                                                    aria-invalid={Boolean(getFieldError("email"))}
                                                    autoComplete="email"
                                                    required
                                                />
                                                {getFieldError("email") ? <div className="invalid-feedback">{getFieldError("email")}</div> : null}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="contactMethod">Как удобнее связаться</label>
                                                <select
                                                    className="form-select rounded-pill"
                                                    id="contactMethod"
                                                    value={customer.contactMethod}
                                                    onChange={handleChange}
                                                >
                                                    <option value="phone">Позвонить</option>
                                                    <option value="whatsapp">WhatsApp</option>
                                                    <option value="telegram">Telegram</option>
                                                    <option value="email">Email</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="fw-medium mb-2" htmlFor="customerType">Тип клиента</label>
                                                <select
                                                    className="form-select rounded-pill"
                                                    id="customerType"
                                                    value={customer.customerType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="person">Частное лицо</option>
                                                    <option value="company">Компания</option>
                                                </select>
                                            </div>
                                            {customer.customerType === "company" ? (
                                                <div className="col-12">
                                                    <label className="fw-medium mb-2" htmlFor="companyName">Название компании *</label>
                                                    <input
                                                        className={getInputClassName("companyName")}
                                                        id="companyName"
                                                        type="text"
                                                        value={customer.companyName}
                                                        onChange={handleChange}
                                                        aria-invalid={Boolean(getFieldError("companyName"))}
                                                        autoComplete="organization"
                                                        required
                                                    />
                                                    {getFieldError("companyName") ? <div className="invalid-feedback">{getFieldError("companyName")}</div> : null}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="mt-5 pt-md-3">
                                            <SectionTitle eyebrow="Шаг 2" title="Доставка" />

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="fw-medium mb-2" htmlFor="city">Город *</label>
                                                    <input
                                                        className={getInputClassName("city")}
                                                        id="city"
                                                        type="text"
                                                        value={customer.city}
                                                        onChange={handleChange}
                                                        aria-invalid={Boolean(getFieldError("city"))}
                                                        autoComplete="address-level2"
                                                        required
                                                    />
                                                    {getFieldError("city") ? <div className="invalid-feedback">{getFieldError("city")}</div> : null}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="fw-medium mb-2" htmlFor="apartment">Квартира / офис</label>
                                                    <input
                                                        className="form-control rounded-pill"
                                                        id="apartment"
                                                        type="text"
                                                        value={customer.apartment}
                                                        onChange={handleChange}
                                                        autoComplete="address-line2"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="fw-medium mb-2" htmlFor="address">Адрес доставки *</label>
                                                    <input
                                                        className={getInputClassName("address")}
                                                        id="address"
                                                        type="text"
                                                        value={customer.address}
                                                        onChange={handleChange}
                                                        aria-invalid={Boolean(getFieldError("address"))}
                                                        autoComplete="address-line1"
                                                        required
                                                    />
                                                    {getFieldError("address") ? <div className="invalid-feedback">{getFieldError("address")}</div> : null}
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
                                            <SectionTitle eyebrow="Шаг 3" title="Комментарий к заказу" />
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
                                                Установка рассчитывается отдельно: менеджер уточнит условия объекта после оформления заказа.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-5">
                                    <div className="checkout-order border p-4 p-lg-5 bg-white position-sticky" style={{ top: 24 }}>
                                        <SectionTitle eyebrow="Ваш заказ" title="Состав заказа" />

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
                                                В корзине есть позиции с ценой по запросу. Оформление такого заказа требует предварительного уточнения с менеджером.
                                            </div>
                                        ) : null}

                                        {getFieldError("items") ? (
                                            <div className="alert alert-warning small mb-3">
                                                {getFieldError("items")}
                                            </div>
                                        ) : null}

                                        <div className="alert alert-light border small mb-3">
                                            Онлайн-оплаты сейчас нет. После отправки заказа менеджер проверит состав, подтвердит доставку и согласует способ оплаты.
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                className={getFieldError("termsAccepted") ? "form-check-input is-invalid" : "form-check-input"}
                                                type="checkbox"
                                                id="termsAccepted"
                                                checked={customer.termsAccepted}
                                                onChange={handleChange}
                                                aria-invalid={Boolean(getFieldError("termsAccepted"))}
                                                required
                                            />
                                            <label className="form-check-label small" htmlFor="termsAccepted">
                                                Я согласен на обработку данных для оформления заказа *
                                            </label>
                                            {getFieldError("termsAccepted") ? <div className="invalid-feedback">{getFieldError("termsAccepted")}</div> : null}
                                        </div>

                                        {errorMessage ? (
                                            <div className="alert alert-danger small mb-3" role="alert">
                                                {errorMessage}
                                            </div>
                                        ) : null}

                                        <button
                                            type="submit"
                                            className="btn btn-teal my-2 px-5 py-3 fw-bold w-100 rounded-pill text-uppercase"
                                            disabled={!canSubmit}
                                        >
                                            {isSubmitting ? "Отправляем заказ…" : "Отправить заказ"}
                                        </button>

                                        <Link href="/shopping-cart" className="btn btn-outline-secondary rounded-pill w-100 mt-2">
                                            Вернуться в корзину
                                        </Link>

                                        <div className="d-flex flex-wrap gap-2 mt-4 small text-muted">
                                            <span className="border rounded-pill px-3 py-1">Без онлайн-оплаты</span>
                                            <span className="border rounded-pill px-3 py-1">Проверка менеджером</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        ) : null}
                    </div>
                </section>
            </main>

            <FooterPage />
            <PopupPage />
        </React.Fragment>
    );
};

export default Checkout;
