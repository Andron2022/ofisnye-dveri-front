"use client";

import Link from "next/link";
import { useState } from "react";
import type { CatalogProductCard } from "@src/lib/woo/types";

type GridColumns = 2 | 3 | 4;

type KallesCatalogGridProps = {
    items: CatalogProductCard[];
    total?: number;
    defaultColumns?: GridColumns;
};

function formatPrice(price: string | null): string {
    if (!price) return "Цена по запросу";

    const normalized = Number(price.replace(",", "."));
    if (Number.isNaN(normalized)) return `${price} ₽`;

    return `${new Intl.NumberFormat("ru-RU").format(normalized)} ₽`;
}

function getGridClassName(columns: GridColumns): string {
    if (columns === 2) return "row-cols-1 row-cols-sm-2";
    if (columns === 4) return "row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4";
    return "row-cols-1 row-cols-sm-2 row-cols-xl-3";
}

function GridIcon({ columns }: { columns: GridColumns }) {
    return (
        <div className="filter-option d-flex">
            {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className="grid1" />
            ))}
        </div>
    );
}

function GridButton({
                        columns,
                        active,
                        onClick,
                    }: {
    columns: GridColumns;
    active: boolean;
    onClick: (columns: GridColumns) => void;
}) {
    return (
        <li className="nav-item" role="presentation">
            <button
                className={`nav-link ${active ? "active" : ""}`}
                type="button"
                aria-label={`Показать ${columns} товара в строке`}
                aria-pressed={active}
                onClick={() => onClick(columns)}
            >
                <GridIcon columns={columns} />
            </button>
        </li>
    );
}

function getPublicArticleLabel(item: CatalogProductCard): string | null {
    if (item.publicArticleNo) return `Арт. ${item.publicArticleNo}`;
    if (item.sku) return `Арт. ${item.sku}`;
    return null;
}

function KallesProductCard({ item }: { item: CatalogProductCard }) {
    const articleLabel = getPublicArticleLabel(item);

    return (
        <article className="topbar-product-card pb-3 w-100 h-100 d-flex flex-column">
            <Link href={item.path} className="position-relative overflow-hidden d-block bg-light text-decoration-none text-reset">
                <div className="d-flex align-items-center justify-content-center bg-light" style={{ aspectRatio: "4 / 3" }}>
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="img-fluid w-100 h-100 object-fit-cover" />
                    ) : (
                        <span className="text-muted fs-14">Нет изображения</span>
                    )}
                </div>

                <div className="product-button d-none d-lg-flex flex-column gap-2 align-items-center" style={{ width: "100%" }}>
                    <span className="btn rounded-pill fs-14" style={{ width: "50%", minWidth: 150 }}>
                        <span>Просмотр</span>
                        <i className="iccl iccl-eye" />
                    </span>
                </div>

                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                    <span className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }}>
                        <i className="iccl iccl-eye fw-semibold" />
                    </span>
                </div>
            </Link>

            <div className="mt-3 d-flex flex-column flex-grow-1">
                {articleLabel ? (
                    <div className="d-flex justify-content-end mb-1">
                        <span className="fs-12 text-muted text-end">{articleLabel}</span>
                    </div>
                ) : null}

                <h2 className="mb-1 fw-medium fs-16 lh-base">
                    <Link href={item.path} className="main_link_acid_green text-decoration-none">
                        {item.name}
                    </Link>
                </h2>

                <div className="mt-auto d-flex justify-content-between align-items-center gap-3 pt-1">
                    <p className="mb-0 fs-15 text-muted">
                        <span>{formatPrice(item.price)}</span>
                    </p>
                    <Link href={item.path} className="text-decoration-none fs-14 main_link_acid_green text-nowrap">
                        Подробнее
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function KallesCatalogGrid({ items, total, defaultColumns = 3 }: KallesCatalogGridProps) {
    const [columns, setColumns] = useState<GridColumns>(defaultColumns);

    return (
        <>
            <div className="mt-1 mb-4 d-flex justify-content-between align-items-center gap-3">
                {/*
                <div className="text-muted fs-16 align-items-center d-none d-lg-flex">
                    <i className="iccl fwb iccl-filter fwb me-2 fw-medium" />
                    <p className="mb-0">Фильтры</p>
                </div>
                */}

                <div className="text-muted fs-14 d-none d-sm-block">
                    {typeof total === "number" ? `Товаров: ${total}` : "Каталог"}
                </div>

                <ul className="nav tab_header tab_filter gap-2 justify-content-start justify-content-sm-center mb-0" role="tablist">
                    <GridButton columns={2} active={columns === 2} onClick={setColumns} />
                    <GridButton columns={3} active={columns === 3} onClick={setColumns} />
                    <GridButton columns={4} active={columns === 4} onClick={setColumns} />
                </ul>

                {/*
                <div className="btn d-none d-md-flex align-items-center justify-content-between featurnBtn rounded-pill text-muted">
                    Поиск
                </div>
                */}
            </div>

            <div className="tab-content my-3 my-md-0">
                <div className="tab-pane fade active show" role="tabpanel" tabIndex={0}>
                    <div className={`row g-lg-4 g-3 ${getGridClassName(columns)}`}>
                        {items.map((item) => (
                            <div key={item.id} className="col">
                                <KallesProductCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
