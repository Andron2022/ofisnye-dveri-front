import { wpNamespaceGet } from "@src/lib/woo/client";
import type { DoorCatalogAttributes } from "@src/lib/woo/types";
import type { AttributeTermSwatch, DoorPdpColorSwatches } from "./attribute-term-swatches-types";

type RawObject = Record<string, unknown>;
type SwatchProduct = { id: number; attributes: DoorCatalogAttributes };

function object(value: unknown): RawObject | null {
    return value && typeof value === "object" && !Array.isArray(value) ? value as RawObject : null;
}

function str(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function positiveId(value: unknown): number | null {
    return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : null;
}

function mediaUrl(value: unknown, wordPressUrl: string): string | null {
    try {
        const url = new URL(str(value));
        const origin = new URL(wordPressUrl);
        // Use the same WP media boundary as the storefront; no arbitrary or authenticated URLs.
        if (!["http:", "https:"].includes(url.protocol) || url.host !== origin.host
            || url.username || url.password || !url.pathname.startsWith("/wp-content/uploads/")) return null;
        return url.href;
    } catch {
        return null;
    }
}

export function normalizeAttributeTermSwatches(value: unknown, taxonomy: string, wordPressUrl: string): {
    byTermId: Map<number, AttributeTermSwatch>;
    productTerms: Map<number, number[]>;
    diagnostics: string[];
} {
    const raw = object(value);
    if (!raw || raw.schema_version !== 1 || raw.taxonomy !== taxonomy || !Array.isArray(raw.items) || !Array.isArray(raw.products)) {
        throw new Error("Invalid attribute term swatches contract");
    }
    const byTermId = new Map<number, AttributeTermSwatch>();
    const diagnostics: string[] = [];
    for (const item of raw.items) {
        const term = object(item);
        const id = positiveId(term?.term_id);
        if (!term || !id || term.taxonomy !== taxonomy || !str(term.name) || !str(term.slug)) {
            diagnostics.push("Invalid term descriptor");
            continue;
        }
        if (byTermId.has(id)) throw new Error(`Duplicate swatch term: ${taxonomy}:${id}`);
        const type = term.type === "image" ? "image" : "color";
        const color = type === "color" && /^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(str(term.color)) ? str(term.color) : null;
        const thumbnailUrl = type === "image" ? mediaUrl(term.thumbnail_url, wordPressUrl) : null;
        const previewUrl = type === "image" ? mediaUrl(term.preview_url, wordPressUrl) : null;
        const order = typeof term.order === "number" && Number.isSafeInteger(term.order) && term.order >= 0 ? term.order : 0;
        if ((type === "color" && !color) || (type === "image" && (!thumbnailUrl || !previewUrl))
            || !["color", "image"].includes(String(term.type)) || term.order !== order) {
            diagnostics.push(`${taxonomy}:${id}: incomplete visual metadata`);
        }
        if (Array.isArray(term.issues) && term.issues.length) diagnostics.push(`${taxonomy}:${id}: ${term.issues.map(str).filter(Boolean).join(", ")}`);
        byTermId.set(id, {
            termId: id, taxonomy, name: str(term.name), slug: str(term.slug), type, color, order,
            thumbnailUrl: thumbnailUrl && previewUrl ? thumbnailUrl : null,
            previewUrl: thumbnailUrl && previewUrl ? previewUrl : null,
        });
    }
    const productTerms = new Map<number, number[]>();
    for (const item of raw.products) {
        const product = object(item);
        const id = positiveId(product?.product_id);
        if (!product || !id || !Array.isArray(product.term_ids)
            || product.term_ids.some((termId) => !positiveId(termId) || !byTermId.has(termId))) {
            diagnostics.push("Invalid product term assignment");
            continue;
        }
        if (productTerms.has(id)) throw new Error(`Duplicate swatch product assignment: ${id}`);
        productTerms.set(id, [...new Set(product.term_ids as number[])]);
    }
    return { byTermId, productTerms, diagnostics };
}

export function mapDoorPdpColorSwatches(
    products: SwatchProduct[],
    normalized: ReturnType<typeof normalizeAttributeTermSwatches>,
    taxonomy: string,
): DoorPdpColorSwatches {
    const swatches: DoorPdpColorSwatches = Object.create(null);
    const ambiguous = new Set<string>();
    for (const product of products) {
        const ids = normalized.productTerms.get(product.id);
        const values = product.attributes[taxonomy];
        if (ids?.length !== 1 || values?.length !== 1) continue;
        const swatch = normalized.byTermId.get(ids[0]);
        const value = values[0];
        if (!swatch || ambiguous.has(value)) continue;
        // REST assigns the actual term ID. Labels only join to the unchanged PDP presentation.
        // A rename during the cache window degrades visually instead of associating the wrong term.
        if (swatch.name !== value || (swatches[value] && swatches[value].termId !== swatch.termId)) {
            delete swatches[value];
            ambiguous.add(value);
            normalized.diagnostics.push(`${taxonomy}: inconsistent Woo label for product ${product.id}`);
            continue;
        }
        swatches[value] = swatch;
    }
    // React Server Components require a plain object at the client boundary.
    return { ...swatches };
}

export async function getDoorPdpColorSwatches(products: SwatchProduct[]): Promise<DoorPdpColorSwatches> {
    const taxonomy = "pa_tsvet-dveri";
    const ids = [...new Set(products.map((product) => product.id))].sort((a, b) => a - b);
    if (!ids.length) return {};
    try {
        const raw = await wpNamespaceGet<unknown>("od/v1/attribute-term-swatches", {
            taxonomy, product_ids: ids.join(","),
        }, 60);
        const normalized = normalizeAttributeTermSwatches(raw, taxonomy, process.env.WORDPRESS_URL ?? "");
        const swatches = mapDoorPdpColorSwatches(products, normalized, taxonomy);
        if (normalized.diagnostics.length) console.warn("Attribute term swatches:", normalized.diagnostics);
        return swatches;
    } catch (error) {
        console.warn("Attribute term swatches unavailable; preserving PDP variant links:", error instanceof Error ? error.message : "Unknown error");
        return {};
    }
}
