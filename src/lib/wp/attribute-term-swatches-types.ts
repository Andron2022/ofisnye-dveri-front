export type AttributeTermSwatch = {
    termId: number;
    taxonomy: string;
    name: string;
    slug: string;
    type: "color" | "image";
    color: string | null;
    thumbnailUrl: string | null;
    previewUrl: string | null;
    order: number;
};

/** A presentation lookup by the existing Woo option value; identity comes from REST term assignments. */
export type DoorPdpColorSwatches = Record<string, AttributeTermSwatch>;
