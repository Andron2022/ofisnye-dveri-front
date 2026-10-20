"use client";

import { useEffect, useRef } from "react";
import styles from "./AccessoryImageLightbox.module.scss";

export function AccessoryImageLightbox({ src, name, onClose }: {
    src: string;
    name: string;
    onClose: () => void;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const opener = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        const previousPadding = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const bodyPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;

        dialog.showModal();
        document.body.style.overflow = "hidden";
        if (scrollbarWidth > 0) document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;

        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPadding;
            if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
        };
    }, []);

    return (
        <dialog
            ref={dialogRef}
            className={styles.lightbox}
            aria-modal="true"
            aria-label={`Фотография: ${name}`}
            onCancel={(event) => { event.preventDefault(); onClose(); }}
            onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
            onKeyDown={(event) => {
                if (event.key !== "Tab") return;
                event.preventDefault();
                event.currentTarget.querySelector("button")?.focus();
            }}
        >
            <button type="button" className={styles.close} aria-label="Закрыть фотографию" onClick={onClose} autoFocus>×</button>
            <img src={src} alt={name} className={styles.image} />
        </dialog>
    );
}
