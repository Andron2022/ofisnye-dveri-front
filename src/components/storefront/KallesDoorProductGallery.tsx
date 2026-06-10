"use client";

import { useMemo, useState } from "react";
import type { WooProductImage } from "@src/lib/woo/types";

type KallesDoorProductGalleryImage = Pick<WooProductImage, "id" | "src" | "name" | "alt">;

type KallesDoorProductGalleryProps = {
    productName: string;
    fallbackImage: string | null;
    images: KallesDoorProductGalleryImage[];
};

function getImageLabel(image: KallesDoorProductGalleryImage, productName: string): string {
    return image.alt || image.name || productName;
}

export default function KallesDoorProductGallery({
                                                     productName,
                                                     fallbackImage,
                                                     images,
                                                 }: KallesDoorProductGalleryProps) {
    const galleryImages = useMemo<KallesDoorProductGalleryImage[]>(() => {
        if (images.length > 0) return images;
        if (!fallbackImage) return [];

        return [{
            id: 0,
            src: fallbackImage,
            name: productName,
            alt: productName,
        }];
    }, [fallbackImage, images, productName]);

    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = galleryImages[activeIndex] ?? null;

    return (
        <div className="mx-auto" style={{ maxWidth: 520 }}>
            <div
                className="productMain h-auto bg-light d-flex align-items-center justify-content-center overflow-hidden"
                style={{ aspectRatio: "1 / 1", height: "auto", maxHeight: 520 }}
            >
                {activeImage ? (
                    <img
                        src={activeImage.src}
                        alt={getImageLabel(activeImage, productName)}
                        className="w-100 h-100 object-fit-cover"
                    />
                ) : (
                    <div className="text-muted">Изображение скоро будет добавлено</div>
                )}
            </div>

            {galleryImages.length > 1 ? (
                <div className="d-flex flex-row gap-2 productSmall h-auto mt-3 overflow-auto pb-1">
                    {galleryImages.map((image, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={`${image.id}-${image.src}`}
                                type="button"
                                className={`border bg-light p-0 overflow-hidden flex-shrink-0 ${isActive ? "opacity-100" : "opacity-50"}`}
                                style={{ width: 78, height: 78 }}
                                aria-label={`Показать фото ${index + 1}`}
                                aria-pressed={isActive}
                                onClick={() => setActiveIndex(index)}
                            >
                                <img
                                    src={image.src}
                                    alt={getImageLabel(image, productName)}
                                    className="w-100 h-100 object-fit-cover"
                                />
                            </button>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
