"use client";

import { useEffect, useState } from "react";
import type { WpContentImage } from "@src/lib/wp/content";

type ContentImageGalleryProps = {
    images: WpContentImage[];
    columns: "two" | "three";
    title?: string;
};

export function ContentImageGallery({ images, columns, title }: ContentImageGalleryProps) {
    const [activeImage, setActiveImage] = useState<WpContentImage | null>(null);
    const columnClassName = columns === "three" ? "col-sm-6 col-lg-4" : "col-md-6";

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

    if (images.length === 0) return null;

    return (
        <>
            <section className="py-4">
                <div className="container">
                    {title ? <h3 className="shop-title position-relative w-100 text-center mb-4"><span className="bg-white px-3">{title}</span></h3> : null}
                    <div className="row g-2 g-lg-4">
                        {images.map((image, index) => (
                            <div key={`${image.src}-${index}`} className={columnClassName}>
                                <button
                                    type="button"
                                    className="d-block w-100 border-0 bg-transparent p-0 overflow-hidden"
                                    onClick={() => setActiveImage(image)}
                                    aria-label="Открыть изображение"
                                >
                                    <div className="bg-light overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
                                        <img
                                            src={image.src}
                                            alt={image.alt || "Изображение материала"}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
