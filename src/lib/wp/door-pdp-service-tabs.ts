// src/lib/wp/door-pdp-service-tabs.ts

import { wpPublicGetList } from "@src/lib/wp/client";
import type { WpPageAcf, WpPageRestItem } from "@src/lib/wp/types";

const CONTENT_REVALIDATE_SECONDS = 300;
const DOOR_PDP_SETTINGS_PAGE_SLUG = "nastrojki-kartochki-dveri";

export type DoorPdpServiceTabContent = {
    title: string;
    contentHtml: string;
};

export type DoorPdpServiceTabsContent = {
    care: DoorPdpServiceTabContent;
    warranty: DoorPdpServiceTabContent;
};

const FALLBACK_DOOR_PDP_SERVICE_TABS: DoorPdpServiceTabsContent = {
    care: {
        title: "Уход и обслуживание",
        contentHtml: [
            "<p>Очищайте поверхность двери мягкой сухой или слегка влажной тканью без абразивных средств.</p>",
            "<p>Не используйте агрессивные растворители, жёсткие губки и чистящие порошки.</p>",
            "<p>Фурнитуру рекомендуется периодически проверять и при необходимости регулировать.</p>",
            "<p><em>Рекомендации являются общими. Для отдельных покрытий, конструкций и условий эксплуатации могут действовать дополнительные требования.</em></p>",
            "<p><a href=\"/uhod-i-obsluzhivanie\">Подробнее об уходе</a></p>",
        ].join(""),
    },
    warranty: {
        title: "Гарантия",
        contentHtml: [
            "<p>Гарантийные условия, сроки и комплектация подтверждаются менеджером после проверки заказа.</p>",
            "<p>Точные условия зависят от типа изделия, комплектации, соблюдения правил эксплуатации и условий монтажа.</p>",
            "<p><a href=\"/garantiya\">Подробнее о гарантии</a></p>",
        ].join(""),
    },
};

const BLOCK_HTML_TAG_RE = /<(address|article|aside|blockquote|div|dl|dt|dd|figure|figcaption|footer|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|table|tbody|td|tfoot|th|thead|tr|ul)\b/i;

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getPageAcf(wpPage: WpPageRestItem): WpPageAcf {
    return isPlainObject(wpPage.acf) ? wpPage.acf as WpPageAcf : {};
}

function asString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function hasHtmlContent(value: string): boolean {
    return value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/gi, " ")
        .trim()
        .length > 0;
}

function normalizeWpRichTextHtml(value: string): string {
    const normalizedValue = value
        .replace(/\r\n?/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    if (!normalizedValue) return "";

    if (BLOCK_HTML_TAG_RE.test(normalizedValue)) {
        return normalizedValue;
    }

    return normalizedValue
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
        .join("");
}

function normalizeTabContent({
    title,
    contentHtml,
    fallback,
}: {
    title: unknown;
    contentHtml: unknown;
    fallback: DoorPdpServiceTabContent;
}): DoorPdpServiceTabContent {
    const normalizedTitle = asString(title) || fallback.title;
    const normalizedHtml = normalizeWpRichTextHtml(asString(contentHtml));

    return {
        title: normalizedTitle,
        contentHtml: hasHtmlContent(normalizedHtml) ? normalizedHtml : fallback.contentHtml,
    };
}

export function getFallbackDoorPdpServiceTabsContent(): DoorPdpServiceTabsContent {
    return FALLBACK_DOOR_PDP_SERVICE_TABS;
}

export async function getDoorPdpServiceTabsContent(): Promise<DoorPdpServiceTabsContent> {
    try {
        const { items } = await wpPublicGetList<WpPageRestItem>(
            "pages",
            {
                slug: DOOR_PDP_SETTINGS_PAGE_SLUG,
                status: "publish",
                _fields: "id,slug,status,type,title,acf",
            },
            CONTENT_REVALIDATE_SECONDS,
        );

        const settingsPage = items[0];
        if (!settingsPage) return FALLBACK_DOOR_PDP_SERVICE_TABS;

        const acf = getPageAcf(settingsPage);

        return {
            care: normalizeTabContent({
                title: acf.door_pdp_care_title,
                contentHtml: acf.door_pdp_care_content,
                fallback: FALLBACK_DOOR_PDP_SERVICE_TABS.care,
            }),
            warranty: normalizeTabContent({
                title: acf.door_pdp_warranty_title,
                contentHtml: acf.door_pdp_warranty_content,
                fallback: FALLBACK_DOOR_PDP_SERVICE_TABS.warranty,
            }),
        };
    } catch (error) {
        console.error("Failed to load door PDP service tabs content", error);
        return FALLBACK_DOOR_PDP_SERVICE_TABS;
    }
}
