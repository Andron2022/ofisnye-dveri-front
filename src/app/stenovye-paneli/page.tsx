import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";

export const metadata: Metadata = {
    title: "Стеновые панели — индивидуальный расчёт",
    description: "Стеновые панели рассчитываются индивидуально по размерам стены, схеме разделки и условиям монтажа.",
};

const WallPanels = () => {
    return (
        <React.Fragment>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <section className="py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9 col-xl-8">
                                <div className="border rounded-3 p-4 p-lg-5 bg-light">
                                    <p className="text-uppercase text-muted small mb-2">Проектный расчёт</p>
                                    <h1 className="fs-2 mb-3">Стеновые панели рассчитываются индивидуально</h1>

                                    <p className="text-muted mb-4">
                                        Панели не продаются как обычный товар с фиксированной ценой. Итоговая стоимость зависит от размеров стены,
                                        схемы разделки панелей, алюминиевой системы крепления и условий монтажа.
                                    </p>

                                    <div className="alert alert-warning border mb-4">
                                        Стеновые панели рассчитываются как проектное решение. Для расчёта нужны параметры стены, раскладка, каркас и условия монтажа.
                                    </div>

                                    <div className="row g-3 mb-4">
                                        <div className="col-md-4">
                                            <div className="h-100 border rounded-3 p-3 bg-white">
                                                <div className="fw-medium mb-1">1. Выбор панели</div>
                                                <div className="small text-muted">Материал, цвет и декоративное решение подбираются под проект.</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="h-100 border rounded-3 p-3 bg-white">
                                                <div className="fw-medium mb-1">2. Размеры стены</div>
                                                <div className="small text-muted">Для расчёта нужны ширина, высота и особенности участка.</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="h-100 border rounded-3 p-3 bg-white">
                                                <div className="fw-medium mb-1">3. Расчёт менеджера</div>
                                                <div className="small text-muted">Стоимость м² с монтажом уточняется после проверки проекта.</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-pill px-4">
                                            Перейти в каталог дверей
                                        </Link>
                                        <Link href="/kontakty" className="btn btn-outline-secondary rounded-pill px-4">
                                            Связаться с менеджером
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
            <PopupPage />
        </React.Fragment>
    );
};

export default WallPanels;
