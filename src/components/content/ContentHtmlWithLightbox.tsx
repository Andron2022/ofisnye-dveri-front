"use client";

import { useEffect, useState } from "react";

type ActiveImage = {
    src: string;
    alt?: string;
};

type ContentHtmlWithLightboxProps = {
    html: string;
    className?: string;
};

export function ContentHtmlWithLightbox({ html, className = "" }: ContentHtmlWithLightboxProps) {
    const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

    useEffect(() => {
        if (!activeImage) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActiveImage(null);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeImage]);

    if (!html.trim()) return null;

    return (
        <>
            <div
                className={`wp-content wp-content-with-gallery fs-6 lh-lg ${className}`.trim()}
                onClick={(event) => {
                    const target = event.target;
                    if (!(target instanceof Element)) return;

                    const image = target.closest("img");
                    if (!(image instanceof HTMLImageElement)) return;

                    const src = image.currentSrc || image.src;
                    if (!src) return;

                    event.preventDefault();
                    setActiveImage({
                        src,
                        alt: image.alt || undefined,
                    });
                }}
                dangerouslySetInnerHTML={{ __html: html }}
            />

            <style dangerouslySetInnerHTML={{ __html: `
                .wp-content-with-gallery img {
                    max-width: 100%;
                    height: auto;
                    cursor: zoom-in;
                }

                .wp-content-with-gallery figure {
                    margin-bottom: 1.5rem;
                }

                .wp-content-with-gallery .wp-block-gallery,
                .wp-content-with-gallery .blocks-gallery-grid {
                    display: grid;
                    gap: .5rem;
                    padding-left: 0;
                    list-style: none;
                }

                .wp-content-with-gallery .wp-block-gallery,
                .wp-content-with-gallery .blocks-gallery-grid,
                .wp-content-with-gallery .wp-block-gallery.has-nested-images {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }

                .wp-content-with-gallery .wp-block-gallery.columns-1,
                .wp-content-with-gallery .blocks-gallery-grid.columns-1,
                .wp-content-with-gallery .wp-block-gallery.has-nested-images.columns-1 {
                    grid-template-columns: repeat(1, minmax(0, 1fr));
                }

                .wp-content-with-gallery .wp-block-gallery.columns-2,
                .wp-content-with-gallery .blocks-gallery-grid.columns-2,
                .wp-content-with-gallery .wp-block-gallery.has-nested-images.columns-2 {
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                }

                .wp-content-with-gallery .wp-block-gallery.columns-3,
                .wp-content-with-gallery .blocks-gallery-grid.columns-3,
                .wp-content-with-gallery .wp-block-gallery.has-nested-images.columns-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                }

                .wp-content-with-gallery .wp-block-gallery.columns-4,
                .wp-content-with-gallery .blocks-gallery-grid.columns-4,
                .wp-content-with-gallery .wp-block-gallery.has-nested-images.columns-4 {
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                }

                .wp-content-with-gallery .wp-block-gallery > figure,
                .wp-content-with-gallery .wp-block-gallery > .wp-block-image,
                .wp-content-with-gallery .blocks-gallery-grid > li,
                .wp-content-with-gallery .blocks-gallery-item,
                .wp-content-with-gallery .wp-block-gallery.has-nested-images figure.wp-block-image {
                    width: 100% !important;
                    margin: 0 !important;
                }

                .wp-content-with-gallery .wp-block-gallery img,
                .wp-content-with-gallery .blocks-gallery-grid img,
                .wp-content-with-gallery .blocks-gallery-item img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    aspect-ratio: 4 / 3;
                    object-fit: cover;
                }

                .wp-content-with-gallery figcaption {
                    margin-top: .5rem;
                    font-size: .875rem;
                    color: #777;
                    text-align: center;
                }

                @media (max-width: 767.98px) {
                    .wp-content-with-gallery .wp-block-gallery,
                    .wp-content-with-gallery .blocks-gallery-grid,
                    .wp-content-with-gallery .wp-block-gallery.has-nested-images,
                    .wp-content-with-gallery .wp-block-gallery.columns-3,
                    .wp-content-with-gallery .blocks-gallery-grid.columns-3,
                    .wp-content-with-gallery .wp-block-gallery.has-nested-images.columns-3,
                    .wp-content-with-gallery .wp-block-gallery.columns-4,
                    .wp-content-with-gallery .blocks-gallery-grid.columns-4,
                    .wp-content-with-gallery .wp-block-gallery.has-nested-images.columns-4 {
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }
                }
            ` }} />

            {activeImage ? (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
                    style={{ zIndex: 1060, background: "rgba(0, 0, 0, 0.82)" }}
                    onClick={() => setActiveImage(null)}
                    role="presentation"
                >
                    <button
                        type="button"
                        className="btn-close btn-close-white position-absolute top-0 end-0 m-4"
                        onClick={() => setActiveImage(null)}
                        aria-label="Закрыть"
                    />
                    <img
                        src={activeImage.src}
                        alt={activeImage.alt || "Изображение материала"}
                        className="img-fluid"
                        style={{ maxHeight: "92vh", maxWidth: "92vw", objectFit: "contain" }}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            ) : null}
        </>
    );
}
