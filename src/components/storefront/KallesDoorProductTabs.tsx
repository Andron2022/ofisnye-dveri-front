"use client";

import { useState } from "react";
import type { DoorCatalogAttributes } from "@src/lib/woo/types";

type TabKey = "description" | "additional" | "care" | "warranty";

type KallesDoorProductTabsProps = {
    descriptionHtml: string | null;
    attributes: DoorCatalogAttributes;
};

function joinAttributeValues(values?: string[]): string {
    if (!values || values.length === 0) return "—";
    return values.join(", ");
}

function AttributeRow({ label, value }: { label: string; value?: string[] }) {
    if (!value || value.length === 0) return null;

    return (
        <tr>
            <th scope="row" className="fw-semibold" style={{ width: "30%" }}>{label}</th>
            <td>{joinAttributeValues(value)}</td>
        </tr>
    );
}

function DescriptionPane({ descriptionHtml }: { descriptionHtml: string | null }) {
    if (descriptionHtml) {
        return <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />;
    }

    return (
        <p className="mb-0">
            Описание товара скоро будет дополнено. Менеджер уточнит характеристики, комплектацию,
            условия доставки и установки перед подтверждением заказа.
        </p>
    );
}

function AdditionalPane({ attributes }: { attributes: DoorCatalogAttributes }) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
                <tbody>
                <AttributeRow label="Цвет" value={attributes.color} />
                <AttributeRow label="Размер" value={attributes.size} />
                <AttributeRow label="Количество полотен" value={attributes.leafCount} />
                <AttributeRow label="Материал" value={attributes.material} />
                <AttributeRow label="Остекление" value={attributes.glazing} />
                <AttributeRow label="Тип открывания" value={attributes.openingType} />
                <AttributeRow label="Назначение" value={attributes.purpose} />
                <AttributeRow label="Направление открывания" value={attributes.openingDirection} />
                <AttributeRow label="Огнестойкость" value={attributes.fireResistance} />
                <AttributeRow label="Тип остекления" value={attributes.glazingType} />
                </tbody>
            </table>
        </div>
    );
}

function CarePane() {
    return (
        <div>
            <p><strong>Уход и обслуживание</strong></p>
            <p>Очищайте поверхность мягкой сухой или слегка влажной тканью без абразивных средств.</p>
            <p>Не используйте агрессивные растворители, жёсткие губки и чистящие порошки.</p>
            <p>Фурнитуру рекомендуется периодически проверять и при необходимости регулировать.</p>
            <p className="mb-0"><em>Точные рекомендации по уходу зависят от покрытия и комплектации двери.</em></p>
        </div>
    );
}

function WarrantyPane() {
    return (
        <div>
            <p><strong>Гарантия</strong></p>
            <p>Гарантийные условия, сроки и комплектация подтверждаются менеджером после проверки заказа.</p>
            <p><strong>Доставка</strong></p>
            <p>Стоимость доставки рассчитывается отдельно с учётом адреса, объёма заказа, разгрузки и подъёма.</p>
            <p><strong>Установка</strong></p>
            <p className="mb-0">Монтаж и дополнительные работы согласуются после уточнения объекта или замера.</p>
        </div>
    );
}

export default function KallesDoorProductTabs({ descriptionHtml, attributes }: KallesDoorProductTabsProps) {
    const [activeTab, setActiveTab] = useState<TabKey>("description");

    const tabs: Array<{ key: TabKey; label: string }> = [
        { key: "description", label: "Описание" },
        { key: "additional", label: "Характеристики" },
        { key: "care", label: "Уход и обслуживание" },
        { key: "warranty", label: "Гарантия" },
    ];

    return (
        <section className="mt-4 mb-5 py-5 main-project-section">
            <div className="container">
                <div className="nav tab_header justify-content-center row mb-5">
                    <div className="col">
                        <div className="tab_header nav_tabs justify-content-center nav nav-pills" role="tablist">
                            {tabs.map((tab) => (
                                <div key={tab.key} className="nav-item">
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={activeTab === tab.key}
                                        className={`rounded-pill pill-border fw-medium custom-nav-link nav-link ${activeTab === tab.key ? "active" : ""}`}
                                        onClick={() => setActiveTab(tab.key)}
                                    >
                                        {tab.label}
                                    </button>
                                </div>
                            ))}
                            <div className="nav-item">
                                <span className="d-inline-block" title="В разработке">
                                    <button
                                        type="button"
                                        className="rounded-pill pill-border fw-medium custom-nav-link nav-link disabled"
                                        aria-disabled="true"
                                        tabIndex={-1}
                                        style={{ pointerEvents: "none" }}
                                    >
                                        Отзывы
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === "description" ? <DescriptionPane descriptionHtml={descriptionHtml} /> : null}
                    {activeTab === "additional" ? <AdditionalPane attributes={attributes} /> : null}
                    {activeTab === "care" ? <CarePane /> : null}
                    {activeTab === "warranty" ? <WarrantyPane /> : null}
                </div>
            </div>
        </section>
    );
}
