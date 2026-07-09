"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { WallPanelProduct } from "@src/lib/wall-panels/types";
import WallPanelRequestModal from "@src/components/wall-panels/WallPanelRequestModal";

type WallPanelDetailViewProps = {
    product: WallPanelProduct;
};

function joinValues(values: string[]): string {
    return values.length > 0 ? values.join(", ") : "—";
}

export default function WallPanelDetailView({ product }: WallPanelDetailViewProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [modalProduct, setModalProduct] = useState<WallPanelProduct | null>(null);
    const activeImage = useMemo(() => product.images[activeImageIndex] ?? product.images[0] ?? null, [activeImageIndex, product.images]);

    return (
        <>
            <section className="py-5 bg-light border-bottom">
                <div className="container">
                    <div className="mb-4 small">
                        <Link href="/stenovye-paneli" className="text-muted text-decoration-none">Стеновые панели</Link>
                        <span className="text-muted mx-2">/</span>
                        <span>{product.name}</span>
                    </div>

                    <div className="row g-5 align-items-start">
                        <div className="col-lg-7">
                            {activeImage ? (
                                <div className="bg-white rounded-3 overflow-hidden shadow-sm mb-3" style={{ aspectRatio: "3 / 2" }}>
                                    <img
                                        src={activeImage.src}
                                        alt={activeImage.alt}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </div>
                            ) : (
                                <div className="bg-white rounded-3 d-flex align-items-center justify-content-center text-muted mb-3" style={{ aspectRatio: "3 / 2" }}>
                                    Фото панели не добавлено
                                </div>
                            )}

                            {product.images.length > 1 ? (
                                <div className="d-flex gap-2 flex-wrap">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={`${image.id || image.src}-${index}`}
                                            type="button"
                                            className={`border rounded-2 p-0 overflow-hidden bg-white ${index === activeImageIndex ? "border-dark" : "border-light"}`}
                                            style={{ width: "96px", aspectRatio: "3 / 2" }}
                                            onClick={() => setActiveImageIndex(index)}
                                        >
                                            <img
                                                src={image.thumbnail || image.src}
                                                alt={image.alt}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        <div className="col-lg-5">
                            <p className="text-uppercase small text-muted mb-2">Проектное решение</p>
                            <h1 className="fs-2 mb-3">{product.name}</h1>
                            {product.shortDescriptionHtml ? (
                                <div className="text-muted mb-4" dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }} />
                            ) : null}

                            <div className="border rounded-3 bg-white p-4 mb-4">
                                <div className="d-flex justify-content-between gap-3 border-bottom pb-2 mb-2">
                                    <span className="text-muted">SKU</span>
                                    <span className="fw-medium text-end">{product.sku || "—"}</span>
                                </div>
                                <div className="d-flex justify-content-between gap-3 border-bottom pb-2 mb-2">
                                    <span className="text-muted">Материал</span>
                                    <span className="fw-medium text-end">{joinValues(product.material)}</span>
                                </div>
                                <div className="d-flex justify-content-between gap-3">
                                    <span className="text-muted">Цвет</span>
                                    <span className="fw-medium text-end">{joinValues(product.color)}</span>
                                </div>
                            </div>

                            <div className="alert alert-warning">
                                Панель рассчитывается индивидуально. Цена зависит от площади стены, раскладки, алюминиевой системы крепления и монтажа.
                            </div>

                            <button
                                type="button"
                                className="btn btn-dark rounded-pill px-4 py-3 w-100"
                                onClick={() => setModalProduct(product)}
                            >
                                Отправить заявку на расчёт
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-8">
                            <h2 className="fs-4 mb-4">Описание</h2>
                            {product.descriptionHtml ? (
                                <div className="wp-content lh-lg" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                            ) : (
                                <p className="text-muted">Описание для этой панели пока не заполнено в Woo.</p>
                            )}
                        </div>
                        <div className="col-lg-4">
                            <h2 className="fs-4 mb-4">Характеристики</h2>
                            <div className="border rounded-3 overflow-hidden">
                                {product.attributes.length > 0 ? product.attributes.map((attribute) => (
                                    <div className="d-flex justify-content-between gap-3 p-3 border-bottom" key={attribute.slug}>
                                        <span className="text-muted">{attribute.name}</span>
                                        <span className="fw-medium text-end">{joinValues(attribute.options)}</span>
                                    </div>
                                )) : (
                                    <div className="p-3 text-muted">Характеристики пока не заполнены в Woo.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <WallPanelRequestModal product={modalProduct} onClose={() => setModalProduct(null)} />
        </>
    );
}
