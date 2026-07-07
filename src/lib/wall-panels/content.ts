// src/lib/wall-panels/content.ts

import type { Metadata } from "next";
import { homePageContent } from "@src/lib/home/homepage-content";
import type { HomeImage } from "@src/lib/home/homepage-content";
import { buildSeoMetadata } from "@src/lib/seo/site";
import { getWpPageBySlug } from "@src/lib/wp/content";
import { wpPublicGetList } from "@src/lib/wp/client";
import { getRenderedText, stripHtml, truncateText } from "@src/lib/wp/format";
import type { WpAcfImageObject, WpAcfImageValue, WpEmbeddedMedia, WpPageAcf } from "@src/lib/wp/types";
import type { WallPanelsPageContent, WallPanelsProcessStep } from "@src/lib/wall-panels/types";

const WALL_PANELS_WP_SLUG = "stenovye-paneli";
const WALL_PANELS_REVALIDATE_SECONDS = 300;

const fallbackWallPanelsContent: WallPanelsPageContent = {
    path: "/stenovye-paneli",
    metaTitle: "Стеновые панели — индивидуальный расчёт",
    metaDescription: "Стеновые панели рассчитываются индивидуально по размерам стены, схеме разделки, системе крепления и условиям монтажа.",
    heroTitle: "Стеновые панели под проект",
    heroDescription: "Проектные панели для интерьеров офисов, коммерческих помещений и общественных пространств. Стоимость рассчитывается после проверки размеров, раскладки и условий монтажа.",
    heroImage: homePageContent.oneCategory.image,
    introTitle: "Панели рассчитываются индивидуально",
    introText: "Стеновые панели не продаются как обычный товар с фиксированной ценой. Итоговая стоимость зависит от площади стены, схемы разделки панелей, алюминиевой системы крепления и условий монтажа.",
    processTitle: "Как проходит расчёт",
    processSteps: [
        {
            title: "Выбор панели",
            description: "Материал, цвет и декоративное решение подбираются под задачу проекта.",
        },
        {
            title: "Размеры стены",
            description: "Для расчёта нужны ширина, высота и особенности участка: углы, проёмы, примыкания.",
        },
        {
            title: "Расчёт менеджера",
            description: "Стоимость м² с монтажом уточняется после проверки проекта, каркаса и условий объекта.",
        },
    ],
    productIds: [],
    productsTitle: "Варианты стеновых панелей",
    productsDescription: "Посмотрите панели в интерьере, откройте карточку с фото и характеристиками, затем отправьте заявку на расчёт.",
    requestButtonLabel: "Рассчитать такой вариант",
    ctaTitle: "Не знаете точную площадь?",
    ctaText: "Укажите примерное количество квадратных метров — менеджер поможет уточнить размеры, раскладку и монтаж.",
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
        const normalized = value.trim().replace(",", ".");
        if (normalized && Number.isFinite(Number(normalized))) return Number(normalized);
    }

    return null;
}

function getAcfString(acf: WpPageAcf, key: string, fallback = ""): string {
    return asString(acf[key]) || fallback;
}

function parseIds(value: unknown): number[] {
    const rawValues = Array.isArray(value) ? value : [value];
    const ids = new Set<number>();

    for (const rawValue of rawValues) {
        if (typeof rawValue === "number" && Number.isInteger(rawValue) && rawValue > 0) {
            ids.add(rawValue);
            continue;
        }

        if (typeof rawValue !== "string") continue;

        rawValue
            .split(/[\s,;]+/)
            .map((part) => Number(part.trim()))
            .filter((id) => Number.isInteger(id) && id > 0)
            .forEach((id) => ids.add(id));
    }

    return Array.from(ids);
}

function getImageUrlFromObject(image: WpAcfImageObject): string | undefined {
    const preferredSizes = ["large", "medium_large", "full"];

    for (const size of preferredSizes) {
        const value = image.sizes?.[size];
        if (typeof value === "string" && value.trim()) return value.trim();
    }

    return image.url || image.source_url;
}

function getImageAltFromObject(image: WpAcfImageObject): string | undefined {
    const title = image.title;

    if (typeof image.alt === "string" && image.alt.trim()) return image.alt.trim();
    if (typeof image.alt_text === "string" && image.alt_text.trim()) return image.alt_text.trim();
    if (typeof title === "string" && title.trim()) return title.trim();

    return isPlainObject(title) ? getRenderedText(title as { rendered?: string }) : undefined;
}

function getImageAltFromMedia(media: WpEmbeddedMedia | null): string | undefined {
    return media?.alt_text || getRenderedText(media?.title);
}

function getImageId(value: WpAcfImageValue): number | null {
    if (!value) return null;

    if (typeof value === "number") return Number.isInteger(value) && value > 0 ? value : null;

    if (typeof value === "string") {
        const trimmed = value.trim();
        if (/^https?:\/\//i.test(trimmed)) return null;

        const maybeId = asNumber(trimmed);
        return maybeId && Number.isInteger(maybeId) && maybeId > 0 ? maybeId : null;
    }

    if (isPlainObject(value)) {
        const imageObject = value as WpAcfImageObject;
        const objectUrl = getImageUrlFromObject(imageObject);
        if (objectUrl) return null;

        const id = asNumber(imageObject.id ?? imageObject.ID);
        return id && Number.isInteger(id) && id > 0 ? id : null;
    }

    return null;
}

function getPreferredMediaUrl(media: WpEmbeddedMedia | null): string | undefined {
    if (!media) return undefined;

    const preferredSizes = ["large", "medium_large", "full"];

    for (const size of preferredSizes) {
        const sourceUrl = media.media_details?.sizes?.[size]?.source_url;
        if (typeof sourceUrl === "string" && sourceUrl.trim()) return sourceUrl.trim();
    }

    return media.source_url;
}

async function getMediaMap(ids: number[]): Promise<Map<number, WpEmbeddedMedia>> {
    if (ids.length === 0) return new Map();

    try {
        const response = await wpPublicGetList<WpEmbeddedMedia>(
            "media",
            {
                include: ids.join(","),
                per_page: Math.min(ids.length, 100),
                _fields: "id,source_url,alt_text,title,media_details",
            },
            WALL_PANELS_REVALIDATE_SECONDS,
        );

        return new Map(
            response.items
                .filter((item) => typeof item.id === "number")
                .map((item) => [item.id as number, item]),
        );
    } catch (error) {
        console.warn("Failed to load wall panels media", error);
        return new Map();
    }
}

function resolveImage(
    value: WpAcfImageValue,
    mediaMap: Map<number, WpEmbeddedMedia>,
    altOverride?: string,
): HomeImage | undefined {
    if (!value) return undefined;

    if (typeof value === "string") {
        const trimmed = value.trim();

        if (/^https?:\/\//i.test(trimmed)) {
            return {
                src: trimmed,
                alt: altOverride || undefined,
            };
        }

        const maybeId = asNumber(trimmed);
        if (!maybeId) return undefined;

        const media = mediaMap.get(maybeId);
        const src = getPreferredMediaUrl(media ?? null);
        return src
            ? {
                src,
                alt: altOverride || getImageAltFromMedia(media ?? null),
            }
            : undefined;
    }

    if (typeof value === "number") {
        const media = mediaMap.get(value);
        const src = getPreferredMediaUrl(media ?? null);
        return src
            ? {
                src,
                alt: altOverride || getImageAltFromMedia(media ?? null),
            }
            : undefined;
    }

    if (isPlainObject(value)) {
        const imageObject = value as WpAcfImageObject;
        const objectUrl = getImageUrlFromObject(imageObject);

        if (objectUrl) {
            return {
                src: objectUrl,
                alt: altOverride || getImageAltFromObject(imageObject),
            };
        }

        const id = getImageId(imageObject);
        if (!id) return undefined;

        const media = mediaMap.get(id);
        const src = getPreferredMediaUrl(media ?? null);
        return src
            ? {
                src,
                alt: altOverride || getImageAltFromMedia(media ?? null),
            }
            : undefined;
    }

    return undefined;
}

function buildProcessStep(acf: WpPageAcf, index: number, fallback: WallPanelsProcessStep): WallPanelsProcessStep {
    return {
        title: getAcfString(acf, `wall_panels_step_${index}_title`, fallback.title),
        description: getAcfString(acf, `wall_panels_step_${index}_description`, fallback.description),
    };
}

export async function getWallPanelsPageContent(): Promise<WallPanelsPageContent> {
    try {
        const page = await getWpPageBySlug(WALL_PANELS_WP_SLUG);
        if (!page) return fallbackWallPanelsContent;

        const acf = isPlainObject(page.acf) ? page.acf as WpPageAcf : {};
        const heroImageValue = (acf.wall_panels_hero_image || acf.hero_background_image) as WpAcfImageValue;
        const mediaMap = await getMediaMap([getImageId(heroImageValue)].filter((id): id is number => Boolean(id)));
        const pageTitle = getRenderedText(page.title);
        const pageText = stripHtml(getRenderedText(page.content));

        return {
            path: fallbackWallPanelsContent.path,
            metaTitle: getAcfString(acf, "wall_panels_meta_title", pageTitle || fallbackWallPanelsContent.metaTitle),
            metaDescription: truncateText(
                getAcfString(acf, "wall_panels_meta_description", pageText || fallbackWallPanelsContent.metaDescription),
                220,
            ),
            heroTitle: getAcfString(acf, "wall_panels_hero_title", pageTitle || fallbackWallPanelsContent.heroTitle),
            heroDescription: getAcfString(acf, "wall_panels_hero_description", fallbackWallPanelsContent.heroDescription),
            heroImage: resolveImage(
                heroImageValue,
                mediaMap,
                getAcfString(acf, "wall_panels_hero_image_alt"),
            ) || fallbackWallPanelsContent.heroImage,
            introTitle: getAcfString(acf, "wall_panels_intro_title", fallbackWallPanelsContent.introTitle),
            introText: getAcfString(acf, "wall_panels_intro_text", fallbackWallPanelsContent.introText),
            processTitle: getAcfString(acf, "wall_panels_process_title", fallbackWallPanelsContent.processTitle),
            processSteps: fallbackWallPanelsContent.processSteps.map((step, index) => buildProcessStep(acf, index + 1, step)),
            productIds: parseIds(acf.wall_panels_product_ids),
            productsTitle: getAcfString(acf, "wall_panels_products_title", fallbackWallPanelsContent.productsTitle),
            productsDescription: getAcfString(acf, "wall_panels_products_description", fallbackWallPanelsContent.productsDescription),
            requestButtonLabel: getAcfString(acf, "wall_panels_request_button_label", fallbackWallPanelsContent.requestButtonLabel),
            ctaTitle: getAcfString(acf, "wall_panels_cta_title", fallbackWallPanelsContent.ctaTitle),
            ctaText: getAcfString(acf, "wall_panels_cta_text", fallbackWallPanelsContent.ctaText),
        };
    } catch (error) {
        console.error("Failed to load wall panels page content", error);
        return fallbackWallPanelsContent;
    }
}

export async function buildWallPanelsMetadata(): Promise<Metadata> {
    const page = await getWallPanelsPageContent();

    return buildSeoMetadata({
        title: page.metaTitle,
        description: page.metaDescription,
        path: page.path,
    });
}
