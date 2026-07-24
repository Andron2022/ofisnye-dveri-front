"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileHeader from "@src/components/Headers/MobileHeader";
import { SiteLogo } from "@src/components/site-chrome/SiteLogo";
import { useCart } from "@src/lib/cart/CartProvider";
import type { SiteNavigationItem } from "@src/lib/navigation/site-menu";
import { useHeaderNavigation } from "@src/lib/navigation/NavigationProvider";
import { useSiteChromeSettings } from "@src/lib/site-chrome/SiteChromeProvider";

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
// Меню приходит из NavigationProvider: сначала WP Navigation Editor,
// затем fallback-конфиг siteNavigation, если WP недоступен или slug не задан.
// Текстовые элементы шапки и логотип приходят из SiteChromeProvider:
// WP-страница nastrojki-sajta → fallback-конфиг.
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
                <Link
                    href={item.href ?? "#"}
                    prefetch={false}
                    className={`nav-link ${isActive ? "active" : ""}`}
                >
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
                            prefetch={false}
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

function HeaderTopLink({
    href,
    iconClass,
    text,
}: {
    href?: string;
    iconClass: string;
    text: string;
}) {
    if (!text) return null;

    const content = (
        <>
            <i className={`${iconClass} fs-14 me-1 align-middle`} />
            {text}
        </>
    );

    if (!href) {
        return <span className="mb-0 text-muted">{content}</span>;
    }

    if (href.startsWith("/") || href.startsWith("#")) {
        return (
            <Link href={href} prefetch={false} className="mb-0 text-muted">
                {content}
            </Link>
        );
    }

    return (
        <a href={href} className="mb-0 text-muted">
            {content}
        </a>
    );
}

function HeaderEmailButton({
    email,
    label,
    iconClass,
}: {
    email: string;
    label: string;
    iconClass: string;
}) {
    const [isCopied, setIsCopied] = useState(false);

    if (!email && !label) return null;

    const handleCopy = async () => {
        if (!email) return;

        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            window.setTimeout(() => setIsCopied(false), 1600);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <button
            type="button"
            className="site-chrome-copy-button text-md-end text-center fs-12 text-muted"
            onClick={handleCopy}
            title={email ? "Скопировать email" : undefined}
        >
            <i className={`${iconClass} fs-14 me-1 align-middle`} />
            {isCopied ? "Email скопирован" : label || email}
        </button>
    );
}

const Header = () => {
    const navigationItems = useHeaderNavigation();
    const { header } = useSiteChromeSettings();
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
                                    <HeaderTopLink
                                        href={header.phoneHref}
                                        iconClass={header.phoneIconClass}
                                        text={header.phoneText}
                                    />
                                </div>
                            </div>

                            <div className="col-md-5 col-lg-4 col-sm-12">
                                <div className="header-text text-center fs-12 py-1 py-lg-0">
                                    {header.centerText}
                                </div>
                            </div>

                            <div className="col-md-2 col-lg-4 col-sm-12 d-none d-md-block">
                                <div className="text-md-end text-center">
                                    <HeaderEmailButton
                                        email={header.email}
                                        label={header.emailLabel}
                                        iconClass={header.emailIconClass}
                                    />
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

                        <SiteLogo className="navbar-brand fw-semibold text-uppercase" />

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-none d-lg-block mx-auto">
                                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                    {navigationItems.map((item) => (
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
