"use client";

import Link from "next/link";
import { useState } from "react";
import type { WallPanelProduct, WallPanelsPageContent } from "@src/lib/wall-panels/types";
import WallPanelRequestModal from "@src/components/wall-panels/WallPanelRequestModal";

type WallPanelsPageViewProps = {
    content: WallPanelsPageContent;
    products: WallPanelProduct[];
    loadError?: string | null;
};

function formatValues(values: string[]): string | null {
    return values.length > 0 ? values.join(", ") : null;
}

export default function WallPanelsPageView({ content, products, loadError }: WallPanelsPageViewProps) {
    const [selectedProduct, setSelectedProduct] = useState<WallPanelProduct | null>(null);
    const hasHeroImage = Boolean(content.heroImage?.src);
    const hasIntroBlock = Boolean(content.introTitle.trim());
    const hasCtaBlock = Boolean(content.ctaTitle.trim());

    return (
        <>
            <section className="position-relative overflow-hidden bg-white border-bottom">
                <div className="container">
                    <div className="position-relative overflow-hidden bg-light" style={{ aspectRatio: "2 / 1" }}>
                        {content.heroImage ? (
                            <img
                                src={content.heroImage.src}
                                alt={content.heroImage.alt || content.heroTitle}
                                className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                            />
                        ) : null}
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
                            <div className="p-4 p-lg-5" style={{ maxWidth: "640px", textShadow: hasHeroImage ? "0 2px 18px rgba(0,0,0,.45)" : undefined }}>
                                {content.heroEyebrow ? (
                                    <p className={`text-uppercase small fw-semibold mb-3 ${hasHeroImage ? "text-white" : "text-muted"}`}>
                                        {content.heroEyebrow}
                                    </p>
                                ) : null}
                                <h1 className={`display-5 fw-bold mb-3 ${hasHeroImage ? "text-white" : "text-body"}`}>{content.heroTitle}</h1>
                                <p className={`fs-5 mb-4 ${hasHeroImage ? "text-white" : "text-muted"}`}>{content.heroDescription}</p>
                                <a href="#wall-panel-products" className={`btn rounded-pill px-4 py-3 ${hasHeroImage ? "btn-light" : "btn-dark"}`}>
                                    Смотреть варианты панелей
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {hasIntroBlock ? (
                <section className="py-5 bg-white border-bottom">
                    <div className="container">
                        <div className="row g-4 align-items-start">
                            <div className="col-lg-5">
                                {content.introEyebrow ? (
                                    <p className="text-uppercase small text-muted mb-2">{content.introEyebrow}</p>
                                ) : null}
                                <h2 className="fs-3 mb-3">{content.introTitle}</h2>
                                <p className="text-muted fs-6 mb-0">{content.introText}</p>
                            </div>
                            <div className="col-lg-7">
                                <div className="row g-3">
                                    {content.processSteps.map((step, index) => (
                                        <div className="col-md-4" key={`${step.title}-${index}`}>
                                            <div className="h-100 border rounded-3 p-4 bg-light">
                                                <div className="fs-4 fw-bold mb-3">0{index + 1}</div>
                                                <h3 className="fs-6 mb-2">{step.title}</h3>
                                                <p className="small text-muted mb-0">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            <section id="wall-panel-products" className="py-5">
                <div className="container">
                    <div className="row justify-content-center mb-4">
                        <div className="col-lg-8 text-center">
                            {content.productsEyebrow ? (
                                <p className="text-uppercase text-muted small mb-2">{content.productsEyebrow}</p>
                            ) : null}
                            <h2 className="fs-3 mb-3">{content.productsTitle}</h2>
                            <p className="text-muted mb-0">{content.productsDescription}</p>
                        </div>
                    </div>

                    {loadError ? <div className="alert alert-warning">{loadError}</div> : null}

                    {products.length > 0 ? (
                        <div className="row g-4">
                            {products.map((product) => {
                                const material = formatValues(product.material);
                                const color = formatValues(product.color);

                                return (
                                    <div className="col-md-6 col-xl-4" key={product.id}>
                                        <article className="h-100 border rounded-3 overflow-hidden bg-white shadow-sm">
                                            <Link href={product.path} className="d-block bg-light overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.images[0]?.alt || product.name}
                                                        className="w-100 h-100 object-fit-cover"
                                                    />
                                                ) : (
                                                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                                                        Фото панели не добавлено
                                                    </div>
                                                )}
                                            </Link>
                                            <div className="p-4">
                                                <div className="d-flex gap-2 flex-wrap mb-3">
                                                    {material ? <span className="badge text-bg-light border">{material}</span> : null}
                                                    {color ? <span className="badge text-bg-light border">{color}</span> : null}
                                                    {product.images.length > 1 ? <span className="badge text-bg-light border">{product.images.length} фото</span> : null}
                                                </div>
                                                <h3 className="fs-5 mb-2">
                                                    <Link href={product.path} className="text-body text-decoration-none">
                                                        {product.name}
                                                    </Link>
                                                </h3>
                                                <p className="text-muted small mb-4">{product.shortDescriptionText || "Проектное решение для расчёта по размерам стены."}</p>
                                                <div className="d-flex flex-column flex-sm-row gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark rounded-pill px-3"
                                                        onClick={() => setSelectedProduct(product)}
                                                    >
                                                        {content.requestButtonLabel}
                                                    </button>
                                                    <Link href={product.path} className="btn btn-outline-secondary rounded-pill px-3">
                                                        Подробнее
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="border rounded-3 p-4 p-lg-5 bg-light text-center">
                            <h3 className="fs-5 mb-2">Карточки панелей пока не выбраны</h3>
                            <p className="text-muted mb-0">
                                Добавьте ID Woo-товаров панелей в ACF-поле <code>wall_panels_product_ids</code> на странице <code>/stenovye-paneli</code>.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {hasCtaBlock ? (
                <section className="py-5 bg-light border-top">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-9 text-center">
                                <h2 className="fs-3 mb-3">{content.ctaTitle}</h2>
                                <p className="text-muted mb-4">{content.ctaText}</p>
                                <a href="#wall-panel-products" className="btn btn-dark rounded-pill px-4 py-3">
                                    Выбрать панель для расчёта
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            <WallPanelRequestModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        </>
    );
}
