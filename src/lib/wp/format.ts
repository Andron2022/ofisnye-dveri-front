// src/lib/wp/format.ts

const HTML_ENTITIES: Record<string, string> = {
    amp: "&",
    nbsp: " ",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    laquo: "«",
    raquo: "»",
    hellip: "…",
    ndash: "–",
    mdash: "—",
};

export function decodeHtmlEntities(value: string): string {
    return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
        const normalizedEntity = entity.toLowerCase();

        if (normalizedEntity.startsWith("#x")) {
            const codePoint = Number.parseInt(normalizedEntity.slice(2), 16);
            return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
        }

        if (normalizedEntity.startsWith("#")) {
            const codePoint = Number.parseInt(normalizedEntity.slice(1), 10);
            return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
        }

        return HTML_ENTITIES[normalizedEntity] ?? match;
    });
}

export function stripHtml(value: string | null | undefined): string {
    if (!value) return "";

    return decodeHtmlEntities(value)
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function truncateText(value: string, maxLength: number): string {
    if (value.length <= maxLength) return value;

    return `${value.slice(0, maxLength).trim().replace(/[.,;:!?\s]+$/g, "")}…`;
}

export function getRenderedValue(value: { rendered?: string } | null | undefined): string {
    return value?.rendered ?? "";
}

export function getRenderedText(value: { rendered?: string } | null | undefined): string {
    return stripHtml(getRenderedValue(value));
}
