"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@src/lib/cart/CartProvider";
import { siteNavigation } from "@src/lib/navigation/site-menu";
import type { SiteNavigationItem } from "@src/lib/navigation/site-menu";

type MobileHeaderProps = {
    headerShow: boolean;
    handleHeaderClose: () => void;
    loginShow?: boolean;
    handleLoginClose?: () => void;
    handleLoginShow?: () => void;
};

function isItemActive(item: SiteNavigationItem, pathname: string | null): boolean {
    if (!pathname) return false;

    if (item.href) {
        return pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
    }

    return item.children?.some((child) => isItemActive(child, pathname)) ?? false;
}

function MobileCartSummary({ onNavigate }: { onNavigate: () => void }) {
    const { totals, isHydrated } = useCart();
    const itemsCount = isHydrated ? totals.itemsCount : 0;

    return (
        <Link
            href="/shopping-cart"
            className="d-flex align-items-center justify-content-between border rounded-3 p-3 text-reset mb-3"
            onClick={onNavigate}
        >
            <span className="d-flex align-items-center gap-2">
                <i className="iccl iccl-cart" />
                Корзина
            </span>
            <span className="badge text-bg-dark rounded-pill">{itemsCount}</span>
        </Link>
    );
}

function MobileNavGroup({ item, onNavigate }: { item: SiteNavigationItem; onNavigate: () => void }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(() => isItemActive(item, pathname));
    const hasChildren = Boolean(item.children?.length);

    if (!hasChildren) {
        return (
            <li>
                <Link
                    href={item.href ?? "#"}
                    className={`d-block py-2 text-reset ${isItemActive(item, pathname) ? "fw-semibold" : ""}`}
                    onClick={onNavigate}
                >
                    {item.label}
                </Link>
            </li>
        );
    }

    return (
        <li className="border-bottom py-1">
            <button
                type="button"
                className="w-100 border-0 bg-transparent d-flex justify-content-between align-items-center py-2 px-0 text-start"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((current) => !current)}
            >
                <span className={isItemActive(item, pathname) ? "fw-semibold" : ""}>{item.label}</span>
                <i className={`facl ${isOpen ? "facl-angle-up" : "facl-angle-down"}`} />
            </button>

            {isOpen ? (
                <ul className="list-unstyled ps-3 pb-2 mb-0">
                    {item.children?.map((child) => (
                        <li key={child.id}>
                            <Link
                                href={child.href ?? "#"}
                                className="d-flex justify-content-between align-items-center gap-3 py-2 text-reset"
                                onClick={onNavigate}
                            >
                                <span>{child.label}</span>
                                {child.note ? <small className="text-muted text-nowrap">{child.note}</small> : null}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
        </li>
    );
}

const MobileHeader = ({ headerShow, handleHeaderClose }: MobileHeaderProps) => {
    return (
        <React.Fragment>
            {headerShow ? (
                <button
                    type="button"
                    className="offcanvas-backdrop fade show border-0"
                    aria-label="Закрыть меню"
                    onClick={handleHeaderClose}
                />
            ) : null}

            <aside
                className={`offcanvas offcanvas-start ${headerShow ? "show" : ""}`}
                style={{ visibility: headerShow ? "visible" : "hidden" }}
                aria-hidden={!headerShow}
            >
                <div className="offcanvas-header border-bottom">
                    <Link href="/" className="fw-semibold text-uppercase text-reset" onClick={handleHeaderClose}>
                        Офисные двери
                    </Link>

                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Закрыть"
                        onClick={handleHeaderClose}
                    />
                </div>

                <div className="offcanvas-body">
                    <MobileCartSummary onNavigate={handleHeaderClose} />

                    <nav aria-label="Мобильное меню">
                        <ul className="list-unstyled mb-4">
                            {siteNavigation.map((item) => (
                                <MobileNavGroup
                                    key={item.id}
                                    item={item}
                                    onNavigate={handleHeaderClose}
                                />
                            ))}
                        </ul>
                    </nav>

                    <div className="border-top pt-3 small text-muted">
                        <p className="mb-2">Москва и МО</p>
                        <p className="mb-2">Доставка, установка и нестандартные условия уточняются менеджером.</p>
                        <Link href="/kontakty" className="text-reset" onClick={handleHeaderClose}>
                            Перейти в контакты
                        </Link>
                    </div>
                </div>
            </aside>
        </React.Fragment>
    );
};

export default MobileHeader;
