import type { Metadata } from "next";
import Link from "next/link";
import FooterPage from "@src/components/Footer";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";

export const metadata: Metadata = {
    title: "Заказ принят",
    description: "Заказ принят. Менеджер свяжется для подтверждения комплектации, доставки и оплаты.",
    robots: {
        index: false,
        follow: false,
    },
};

type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSearchParamValue(searchParams: Record<string, string | string[] | undefined>, key: string): string | null {
    const value = searchParams[key];

    if (Array.isArray(value)) {
        return value[0] ?? null;
    }

    return value ?? null;
}

function formatPrice(value: string | null): string | null {
    if (!value) return null;

    const numberValue = Number(value.replace(",", "."));
    if (!Number.isFinite(numberValue)) return `${value} ₽`;

    return `${new Intl.NumberFormat("ru-RU").format(numberValue)} ₽`;
}

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: PageSearchParams }) {
    const resolvedSearchParams = await searchParams;
    const orderNumber = getSearchParamValue(resolvedSearchParams, "orderNumber");
    const orderId = getSearchParamValue(resolvedSearchParams, "orderId");
    const status = getSearchParamValue(resolvedSearchParams, "status");
    const total = formatPrice(getSearchParamValue(resolvedSearchParams, "total"));

    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <section className="py-5">
                    <div className="container">
                        <div className="border rounded-3 p-4 p-lg-5 bg-light text-center" data-checkout-success="true">
                            <p className="text-uppercase text-muted small mb-2">Заказ создан</p>
                            <h1 className="fs-2 mb-3">
                                {orderNumber ? `Спасибо! Заказ №${orderNumber} принят` : "Спасибо! Заказ принят"}
                            </h1>
                            <p className="text-muted mb-4">
                                Менеджер проверит комплектацию, наличие фурнитуры, доставку и способ оплаты, после чего свяжется с клиентом.
                            </p>

                            <div className="row justify-content-center mb-4">
                                <div className="col-lg-7">
                                    <div className="bg-white border rounded-3 p-3 text-start small">
                                        {orderId ? (
                                            <div className="d-flex justify-content-between gap-3 py-2 border-bottom">
                                                <span className="text-muted">ID заказа в Woo</span>
                                                <strong>{orderId}</strong>
                                            </div>
                                        ) : null}
                                        {status ? (
                                            <div className="d-flex justify-content-between gap-3 py-2 border-bottom">
                                                <span className="text-muted">Статус</span>
                                                <strong>{status}</strong>
                                            </div>
                                        ) : null}
                                        {total ? (
                                            <div className="d-flex justify-content-between gap-3 py-2 border-bottom">
                                                <span className="text-muted">Сумма без доставки</span>
                                                <strong>{total}</strong>
                                            </div>
                                        ) : null}
                                        <div className="py-2">
                                            <span className="text-muted">Доставка и оплата подтверждаются менеджером.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                                <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-pill px-4">
                                    Вернуться в каталог
                                </Link>
                                <Link href="/" className="btn btn-outline-secondary rounded-pill px-4">
                                    На главную
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
        </>
    );
}
