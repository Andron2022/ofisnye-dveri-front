"use client";

import { useState } from "react";
import type { DoorCatalogAttributes } from "@src/lib/woo/types";
import type { DoorPdpServiceTabsContent } from "@src/lib/wp/door-pdp-service-tabs";

type TabKey = "description" | "additional" | "care" | "warranty";

type KallesDoorProductTabsProps = {
    descriptionHtml: string | null;
    attributes: DoorCatalogAttributes;
    serviceTabs: DoorPdpServiceTabsContent;
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
        return <div className="wp-content lh-lg" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />;
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

function ServiceHtmlPane({ contentHtml }: { contentHtml: string }) {
    return (
        <>
            <div
                className="door-pdp-service-tab-content wp-content lh-lg"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            <style dangerouslySetInnerHTML={{ __html: `
                .door-pdp-service-tab-content p,
                .door-pdp-service-tab-content li,
                .door-pdp-service-tab-content blockquote {
                    white-space: pre-line;
                }

                .door-pdp-service-tab-content a {
                    color: #0d6efd;
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 0.18em;
                }

                .door-pdp-service-tab-content a:hover,
                .door-pdp-service-tab-content a:focus {
                    color: #0a58ca;
                    text-decoration-thickness: 2px;
                }

                .door-pdp-service-tab-content p:last-child,
                .door-pdp-service-tab-content ul:last-child,
                .door-pdp-service-tab-content ol:last-child {
                    margin-bottom: 0;
                }
            ` }} />
        </>
    );
}

export default function KallesDoorProductTabs({ descriptionHtml, attributes, serviceTabs }: KallesDoorProductTabsProps) {
    const [activeTab, setActiveTab] = useState<TabKey>("description");

    const tabs: Array<{ key: TabKey; label: string }> = [
        { key: "description", label: "Описание" },
        { key: "additional", label: "Характеристики" },
        { key: "care", label: serviceTabs.care.title },
        { key: "warranty", label: serviceTabs.warranty.title },
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
                        </div>
                    </div>
                </div>

                <div className="tab-content">
                    {activeTab === "description" ? <DescriptionPane descriptionHtml={descriptionHtml} /> : null}
                    {activeTab === "additional" ? <AdditionalPane attributes={attributes} /> : null}
                    {activeTab === "care" ? <ServiceHtmlPane contentHtml={serviceTabs.care.contentHtml} /> : null}
                    {activeTab === "warranty" ? <ServiceHtmlPane contentHtml={serviceTabs.warranty.contentHtml} /> : null}
                </div>
            </div>
        </section>
    );
}
