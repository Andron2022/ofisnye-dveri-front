"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileHeader from "@src/components/Headers/MobileHeader";
import { useCart } from "@src/lib/cart/CartProvider";
import { siteNavigation } from "@src/lib/navigation/site-menu";
import type { SiteNavigationItem } from "@src/lib/navigation/site-menu";

// -----------------------------------------------------
// MVP Header.
//
// Задача этого файла — убрать demo Kalles shell из реального пути пользователя:
// - нет Demo / Shop / Product / Sale / Lookbook;
// - меню соответствует текущему проекту;
// - корзина ведёт в реальную /shopping-cart;
// - счётчик корзины берётся из CartProvider;
// - wishlist/account/search скрыты до реализации реальных сценариев.
//
// Меню читается из общего fallback-конфига siteNavigation.
// Позже этот источник можно заменить на BFF/WP menu без переписывания Header UI.
// -----------------------------------------------------

function isItemActive(item: SiteNavigationItem, pathname: string | null): boolean {
    if (!pathname) return false;

    if (item.href) {
        return pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
    }

    return item.children?.some((child) => isItemActive(child, pathname)) ?? false;
}

function CartLink() {
    const { totals, isHydrated } = useCart();
    const itemsCount = isHydrated ? totals.itemsCount : 0;

    return (
        <Link
            href="/shopping-cart"
            className="position-relative d-inline-flex align-items-center justify-content-center"
            aria-label={`Корзина${itemsCount > 0 ? `, товаров: ${itemsCount}` : ""}`}
        >
            <i className="iccl iccl-cart" />
            {itemsCount > 0 ? (
                <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                    {itemsCount}
                </span>
            ) : null}
        </Link>
    );
}

function DesktopNavItem({ item }: { item: SiteNavigationItem }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const isActive = isItemActive(item, pathname);
    const hasChildren = Boolean(item.children?.length);

    if (!hasChildren) {
        return (
            <li className="nav-item">
                <Link className={`nav-link ${isActive ? "active" : ""}`} href={item.href ?? "#"}>
                    {item.label}
                </Link>
            </li>
        );
    }

    return (
        <li
            className="nav-item dropdown dropdown-mega-lg"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                type="button"
                className={`nav-link border-0 bg-transparent ${isOpen || isActive ? "show active" : ""}`}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((current) => !current)}
            >
                {item.label}
            </button>

            <ul className={`dropdown-menu dropdown-sub-column ${isOpen ? "show" : ""}`}>
                {item.children?.map((child) => (
                    <li key={child.id}>
                        <Link
                            href={child.href ?? "#"}
                            className="text-muted d-flex justify-content-between align-items-center gap-3"
                            onClick={() => setIsOpen(false)}
                        >
                            <span>{child.label}</span>
                            {child.note ? <small className="text-nowrap text-muted">{child.note}</small> : null}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}

const Header = () => {
    const [headerShow, setHeaderShow] = useState(false);
    const [isStickyActive, setIsStickyActive] = useState(false);
    const lastScrollTopRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const isScrollingUp = scrollTop < lastScrollTopRef.current;

            setIsStickyActive(isScrollingUp && scrollTop > 400);
            lastScrollTopRef.current = Math.max(scrollTop, 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleHeaderOpen = () => setHeaderShow(true);
    const handleHeaderClose = () => setHeaderShow(false);

    return (
        <React.Fragment>
            <div id="kalles-section-header_top">
                <div className="h__top d-flex align-items-center">
                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-center py-3 py-xl-0">
                            <div className="col-md-5 col-lg-4 col-12 d-none d-md-block">
                                <div className="d-flex align-items-xl-center justify-content-center justify-content-md-start gap-3">
                                    <span className="mb-0 text-muted">
                                        <i className="pegk pe-7s-call fs-14 me-1 align-middle" /> Москва и МО
                                    </span>
                                    <Link href="/kontakty" className="mb-0 text-muted">
                                        Контакты и шоурум
                                    </Link>
                                </div>
                            </div>

                            <div className="col-md-5 col-lg-4 col-sm-12">
                                <div className="header-text text-center fs-12 py-1 py-lg-0">
                                    Двери с комплектацией и фурнитурой. Заказ без онлайн-оплаты.
                                </div>
                            </div>

                            <div className="col-md-2 col-lg-4 col-sm-12 d-none d-md-block">
                                <div className="text-md-end text-center fs-12 text-muted">
                                    Доставка и установка рассчитываются менеджером
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${isStickyActive ? "headerFixed" : ""}`}>
                    <div className="container-fluid">
                        <button
                            type="button"
                            className="d-lg-none border-0 bg-transparent p-0"
                            aria-label="Открыть меню"
                            onClick={handleHeaderOpen}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                <rect width="30" height="1.5" />
                                <rect y="7" width="20" height="1.5" />
                                <rect y="14" width="30" height="1.5" />
                            </svg>
                        </button>

                        <Link className="navbar-brand fw-semibold text-uppercase" href="/">
                            Офисные двери
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-none d-lg-block mx-auto">
                                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                    {siteNavigation.map((item) => (
                                        <DesktopNavItem key={item.id} item={item} />
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="topbar-toolbar d-flex align-items-center gap-3">
                            <CartLink />
                        </div>
                    </div>
                </nav>
            </div>

            <MobileHeader headerShow={headerShow} handleHeaderClose={handleHeaderClose} />
        </React.Fragment>
    );
};

export default Header;
