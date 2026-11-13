"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { AttributeTermSwatch } from "@src/lib/wp/attribute-term-swatches-types";
import { getFallbackColorClass } from "@src/lib/woo/color-swatch-presentation";
import styles from "./DoorColorSwatches.module.scss";

export type DoorColorSwatchOption = {
    value: string;
    href: string | null;
    active: boolean;
    swatch: AttributeTermSwatch | null;
};

function ColorSwatch({ option }: { option: DoorColorSwatchOption }) {
    const { value, href, active, swatch } = option;
    const tooltipId = useId();
    const targetRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [requestedPreview, setRequestedPreview] = useState(false);
    const [thumbnailFailed, setThumbnailFailed] = useState(false);
    const [previewFailed, setPreviewFailed] = useState(false);
    const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
    const isImage = swatch?.type === "image";
    const hasImage = isImage && Boolean(swatch.thumbnailUrl && swatch.previewUrl) && !thumbnailFailed;
    const open = hasImage && !previewFailed && !dismissed && (hovered || focused);
    const label = `${value}${active ? ", выбран" : ""}${href ? "" : ", недоступно"}`;

    useEffect(() => {
        if (!open) return;
        setRequestedPreview(true);
    }, [open]);

    useEffect(() => {
        if (!open || !requestedPreview) return;
        const updatePosition = () => {
            const target = targetRef.current?.getBoundingClientRect();
            const tooltip = tooltipRef.current?.getBoundingClientRect();
            if (!target || !tooltip) return;
            const margin = 8;
            const width = document.documentElement.clientWidth;
            const height = window.innerHeight;
            const left = Math.max(margin, Math.min(target.left + target.width / 2 - tooltip.width / 2, width - tooltip.width - margin));
            const below = target.bottom + margin;
            const top = below + tooltip.height <= height - margin
                ? below
                : Math.max(margin, Math.min(target.top - tooltip.height - margin, height - tooltip.height - margin));
            setPosition({ left, top });
        };
        const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") setDismissed(true); };
        updatePosition();
        const observer = new ResizeObserver(updatePosition);
        if (tooltipRef.current) observer.observe(tooltipRef.current);
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        document.addEventListener("keydown", dismiss);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
            document.removeEventListener("keydown", dismiss);
            setPosition(null);
        };
    }, [open, requestedPreview]);

    const visual = <>
        <span
            className={`${styles.visual} ${isImage ? styles.texture : styles.color} ${!isImage && !swatch?.color ? getFallbackColorClass(value) : ""}`}
            style={!isImage && swatch?.color ? { backgroundColor: swatch.color } : undefined}
            aria-hidden="true"
        >
            {hasImage ? <img
                src={swatch!.thumbnailUrl!}
                alt=""
                width={56}
                height={32}
                loading="lazy"
                decoding="async"
                onError={() => {
                    setThumbnailFailed(true);
                    console.warn(`Swatch thumbnail unavailable: ${swatch!.taxonomy}:${swatch!.termId}`);
                }}
            /> : isImage ? <span className={styles.missing}>—</span> : null}
        </span>
        {active ? <span className={styles.selected} aria-hidden="true">✓</span> : null}
        {isImage && !hasImage ? <span className={styles.fallbackLabel}>{value}</span> : null}
    </>;

    const attributes = {
        className: styles.target,
        "aria-label": label,
        "aria-describedby": open ? tooltipId : undefined,
        "data-active": active || undefined,
        "data-disabled": !href || undefined,
        title: isImage && hasImage ? undefined : label,
        onFocus: (event: React.FocusEvent<HTMLElement>) => {
            // Touch/click focus must never consume the first tap or open a persistent tooltip.
            setFocused(event.currentTarget.matches(":focus-visible"));
            setDismissed(false);
        },
        onBlur: () => setFocused(false),
        onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
            if (event.pointerType === "touch") { setFocused(false); setHovered(false); }
        },
    };

    return <li className={styles.item}>
        <span
            ref={targetRef}
            className={styles.anchor}
            onPointerEnter={(event) => {
                if (event.pointerType === "mouse" && window.matchMedia("(hover: hover)").matches) {
                    setHovered(true);
                    setDismissed(false);
                }
            }}
            onPointerLeave={() => setHovered(false)}
        >
            {href ? <Link {...attributes} href={href} prefetch={false} aria-current={active ? "page" : undefined}>{visual}</Link>
                : <span {...attributes} role="link" aria-disabled="true" tabIndex={0}>{visual}</span>}
        </span>
        {requestedPreview && hasImage && !previewFailed ? createPortal(
            <div
                ref={tooltipRef}
                id={tooltipId}
                role="tooltip"
                className={styles.preview}
                hidden={!open}
                style={{ left: position?.left ?? 0, top: position?.top ?? 0, visibility: position ? "visible" : "hidden" }}
            >
                <img src={swatch!.previewUrl!} alt="" decoding="async" onError={() => {
                    setPreviewFailed(true);
                    console.warn(`Swatch preview unavailable: ${swatch!.taxonomy}:${swatch!.termId}`);
                }} />
                <span>{value}</span>
            </div>, document.body,
        ) : null}
    </li>;
}

export default function DoorColorSwatches({ options, label }: { options: DoorColorSwatchOption[]; label: string }) {
    return <ul className={styles.list} aria-label={label}>
        {options.map((option) => <ColorSwatch key={option.swatch ? `${option.swatch.taxonomy}:${option.swatch.termId}` : option.value} option={option} />)}
    </ul>;
}
