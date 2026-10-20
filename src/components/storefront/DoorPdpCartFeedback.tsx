"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@src/lib/cart/CartProvider";
import styles from "./DoorPdpCartFeedback.module.scss";

export type CartAdditionFeedback = {
    id: number;
    addedQuantity: number;
    requestedQuantity: number;
};

export function DoorPdpCartFeedback({ feedback }: { feedback: CartAdditionFeedback | null }) {
    const { totals, isHydrated } = useCart();
    const [headerCartVisible, setHeaderCartVisible] = useState(true);
    const [headerBottom, setHeaderBottom] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [atTop, setAtTop] = useState(false);
    const dockRef = useRef<HTMLElement>(null);
    const returnFocusRef = useRef(false);
    const paused = hovered || focused;

    useEffect(() => {
        const headerCart = document.querySelector<HTMLElement>("[data-storefront-cart-link]");
        if (!headerCart) { setHeaderCartVisible(false); return; }
        const observer = new IntersectionObserver(([entry]) => {
            setHeaderCartVisible(entry.isIntersecting && entry.intersectionRatio >= 0.99);
            setHeaderBottom(headerCart.closest("nav")?.getBoundingClientRect().bottom ?? entry.boundingClientRect.bottom);
        }, { threshold: [0, 0.99, 1] });
        observer.observe(headerCart);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (feedback) setExpanded(true);
    }, [feedback]);

    useEffect(() => {
        if (!expanded || paused) return;
        const timeout = window.setTimeout(() => setExpanded(false), 8000);
        return () => window.clearTimeout(timeout);
    }, [expanded, feedback, paused]);

    useEffect(() => {
        if (expanded || !returnFocusRef.current) return;
        returnFocusRef.current = false;
        const target = headerCartVisible
            ? document.querySelector<HTMLElement>("[data-storefront-cart-link]")
            : dockRef.current?.querySelector("a");
        target?.focus({ preventScroll: true });
    }, [expanded, headerCartVisible]);

    useEffect(() => {
        const headerCart = document.querySelector<HTMLElement>("[data-storefront-cart-link]");
        if (!headerCart || !expanded || !headerCartVisible) return;
        headerCart.dataset.cartHighlight = "true";
        return () => { delete headerCart.dataset.cartHighlight; };
    }, [expanded, headerCartVisible, feedback]);

    // Keep the floating control clear of the kit quantity and Add to cart controls.
    useEffect(() => {
        const dock = dockRef.current;
        if (!dock) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const actions = document.querySelector<HTMLElement>("[data-pdp-cart-actions]");
            if (!actions) return;
            const controls = actions.getBoundingClientRect();
            const dockBounds = dock.getBoundingClientRect();
            const bottom = window.innerHeight - 12;
            const top = bottom - dockBounds.height;
            setAtTop(controls.bottom > top - 12 && controls.top < bottom + 12
                && controls.right > dockBounds.left - 12 && controls.left < dockBounds.right + 12);
        };
        const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
        const resizeObserver = new ResizeObserver(schedule);
        resizeObserver.observe(dock);
        const actions = document.querySelector<HTMLElement>("[data-pdp-cart-actions]");
        if (actions) resizeObserver.observe(actions);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        update();
        return () => {
            window.cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [expanded, headerCartVisible, isHydrated]);

    const showCompact = isHydrated && !headerCartVisible;
    const showNotice = expanded && feedback !== null;
    const message = feedback ? (
        feedback.addedQuantity === 0
            ? "Количество не увеличилось: достигнут лимит 99 комплектов этой комплектации."
            : `Добавлено комплектов: ${feedback.addedQuantity}.${feedback.addedQuantity < feedback.requestedQuantity ? " Достигнут лимит 99 комплектов этой комплектации." : ""}`
    ) : "";

    return (
        <aside
            ref={dockRef}
            className={`${styles.dock} ${atTop ? styles.atTop : ""}`}
            style={atTop && headerCartVisible ? { top: headerBottom + 12 } : undefined}
            aria-label="Корзина на странице товара"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        >
            <div role="status" aria-live="polite" aria-atomic="true" className={showNotice ? styles.notice : "visually-hidden"}>
                {showNotice ? <span key={feedback.id} className={styles.message}><span>{message}</span><span>Всего комплектов в корзине: {totals.itemsCount}.</span></span> : null}
            </div>
            {showNotice ? (
                <div className={styles.noticeActions}>
                    <Link href="/shopping-cart" className={styles.viewCart}>Посмотреть корзину</Link>
                    <button type="button" onClick={() => {
                        returnFocusRef.current = true;
                        setFocused(false);
                        setHovered(false);
                        setExpanded(false);
                    }} aria-label="Свернуть подтверждение">×</button>
                </div>
            ) : showCompact ? (
                <Link href="/shopping-cart" className={styles.compact} aria-label={`Корзина, комплектов: ${totals.itemsCount}`}>
                    <i className="iccl iccl-cart" aria-hidden="true" />
                    <span>Корзина</span><strong>{totals.itemsCount}</strong>
                </Link>
            ) : null}
        </aside>
    );
}
