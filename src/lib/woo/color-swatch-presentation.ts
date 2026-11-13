import type { DoorPdpColorSwatches } from "@src/lib/wp/attribute-term-swatches-types";

const collator = new Intl.Collator("ru", { numeric: true, sensitivity: "base" });

export function getDoorColorSwatch(swatches: DoorPdpColorSwatches, value: string) {
    return Object.prototype.hasOwnProperty.call(swatches, value) ? swatches[value] : null;
}

export function sortDoorColorValues(values: string[], swatches: DoorPdpColorSwatches): string[] {
    return [...values].sort((a, b) => {
        const first = getDoorColorSwatch(swatches, a);
        const second = getDoorColorSwatch(swatches, b);
        return (first?.order ?? 0) - (second?.order ?? 0)
            || collator.compare(first?.name ?? a, second?.name ?? b)
            || (first?.termId ?? Number.MAX_SAFE_INTEGER) - (second?.termId ?? Number.MAX_SAFE_INTEGER)
            || (a < b ? -1 : a > b ? 1 : 0);
    });
}

/** Retain the previous visual fallback only when no valid solid color metadata exists. */
export function getFallbackColorClass(value: string): string {
    const lower = value.toLowerCase();
    if (lower.includes("графит") || lower.includes("сер") || lower.includes("grey")) return "bg-secondary bg-opacity-50";
    if (lower.includes("бел") || lower.includes("white")) return "bg-white";
    if (lower.includes("чер") || lower.includes("black")) return "bg-dark";
    if (lower.includes("pink") || lower.includes("роз")) return "bg_color_pink";
    if (lower.includes("дерев") || lower.includes("дуб") || lower.includes("wood")) return "bg-warning bg-opacity-25";
    return "bg-light";
}
