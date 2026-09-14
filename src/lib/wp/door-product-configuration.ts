import { wpNamespaceGet } from "@src/lib/woo/client";

export type DoorConfigurationFallbackModes = {
    family: boolean;
    variantDimensions: boolean;
    orderOptions: boolean;
    accessories: boolean;
};

export type DoorConfigurationVariantDimension = {
    attributeId: number;
    taxonomy: string;
    filterKey: string;
    label: string;
    source: string;
};

export type DoorConfigurationFamily = {
    id: number;
    slug: string;
    name: string;
    source: string;
    siblingIds: number[];
};

export type DoorConfigurationCategory = {
    id: number;
    slug: string;
    name: string;
    source?: string;
};

export type DoorConfigurationOptionChoice = {
    id: string;
    label: string;
    priceDelta: number;
    isDefault: boolean;
};

export type DoorConfigurationOptionGroup = {
    key: string;
    title: string;
    defaultOptionId: string;
    choices: DoorConfigurationOptionChoice[];
    source: string;
};

export type DoorConfigurationAccessoryGroup = {
    key: string;
    title: string;
    categoryId: number;
    sourceMode: "category" | "explicit" | "legacy";
    productIds: number[];
    source: string;
};

export type DoorResolvedConfiguration = {
    schemaVersion: number;
    productId: number;
    valid: boolean;
    issues: string[];
    warnings: string[];
    fallbackModes: DoorConfigurationFallbackModes;
    family: DoorConfigurationFamily;
    canonicalCategory: DoorConfigurationCategory;
    categoryLineage: DoorConfigurationCategory[];
    variantDimensions: DoorConfigurationVariantDimension[];
    variantDimensionsSource: string;
    optionGroups: DoorConfigurationOptionGroup[];
    accessoryGroups: DoorConfigurationAccessoryGroup[];
};

type RawObject = Record<string, unknown>;

function object(value: unknown): RawObject | null {
    return value && typeof value === "object" && !Array.isArray(value) ? value as RawObject : null;
}

function str(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function integer(value: unknown): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : 0;
}

function bool(value: unknown): boolean {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    return ["1", "true", "yes", "on"].includes(String(value ?? "").trim().toLowerCase());
}

function stringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.map(str).filter(Boolean) : [];
}

function intArray(value: unknown): number[] {
    if (!Array.isArray(value)) return [];
    return Array.from(new Set(value.map(integer).filter((id) => id > 0)));
}

function normalizeFamily(value: unknown): DoorConfigurationFamily {
    const raw = object(value) ?? {};
    return {
        id: integer(raw.id),
        slug: str(raw.slug),
        name: str(raw.name),
        source: str(raw.source) || "missing",
        siblingIds: intArray(raw.sibling_ids),
    };
}

function normalizeCategory(value: unknown): DoorConfigurationCategory {
    const raw = object(value) ?? {};
    return {
        id: integer(raw.id),
        slug: str(raw.slug),
        name: str(raw.name),
        source: str(raw.source) || undefined,
    };
}

function normalizeVariantDimension(value: unknown): DoorConfigurationVariantDimension | null {
    const raw = object(value);
    if (!raw) return null;
    const taxonomy = str(raw.taxonomy);
    if (!taxonomy) return null;
    return {
        attributeId: integer(raw.attribute_id),
        taxonomy,
        filterKey: str(raw.filter_key) || taxonomy.replace(/^pa_/, ""),
        label: str(raw.label) || taxonomy,
        source: str(raw.source),
    };
}

function normalizeOptionGroup(value: unknown): DoorConfigurationOptionGroup | null {
    const raw = object(value);
    if (!raw) return null;
    const key = str(raw.key);
    if (!key) return null;
    const choices = Array.isArray(raw.choices)
        ? raw.choices.flatMap((value) => {
            const choice = object(value);
            if (!choice) return [];
            const id = str(choice.id);
            if (!id) return [];
            return [{
                id,
                label: str(choice.label) || id,
                priceDelta: Number(choice.price_delta) || 0,
                isDefault: bool(choice.is_default),
            }];
        })
        : [];
    const enabledChoices = choices;
    if (enabledChoices.length === 0) return null;
    const explicitDefault = str(raw.default_option_id);
    const defaultOptionId = enabledChoices.some((choice) => choice.id === explicitDefault)
        ? explicitDefault
        : enabledChoices.find((choice) => choice.isDefault)?.id ?? enabledChoices[0].id;
    return {
        key,
        title: str(raw.title) || str(raw.label) || key,
        defaultOptionId,
        choices: enabledChoices,
        source: str(raw.source),
    };
}

function normalizeAccessoryGroup(value: unknown): DoorConfigurationAccessoryGroup | null {
    const raw = object(value);
    if (!raw) return null;
    const key = str(raw.key);
    if (!key) return null;
    const sourceModeRaw = str(raw.source_mode);
    const sourceMode: DoorConfigurationAccessoryGroup["sourceMode"] = sourceModeRaw === "explicit"
        ? "explicit"
        : sourceModeRaw === "legacy"
            ? "legacy"
            : "category";
    return {
        key,
        title: str(raw.title) || key,
        categoryId: integer(raw.category_id),
        sourceMode,
        productIds: intArray(raw.product_ids),
        source: str(raw.source),
    };
}

export async function getDoorProductConfiguration(productId: number, revalidateSeconds = 0): Promise<DoorResolvedConfiguration> {
    const raw = await wpNamespaceGet<RawObject>(`od/v1/door-product-configuration/${productId}`, {}, revalidateSeconds);
    const fallback = object(raw.fallback_modes) ?? {};
    return {
        schemaVersion: integer(raw.schema_version),
        productId: integer(raw.product_id),
        valid: bool(raw.valid),
        issues: stringArray(raw.issues),
        warnings: stringArray(raw.warnings),
        fallbackModes: {
            family: bool(fallback.family),
            variantDimensions: bool(fallback.variant_dimensions),
            orderOptions: bool(fallback.order_options),
            accessories: bool(fallback.accessories),
        },
        family: normalizeFamily(raw.family),
        canonicalCategory: normalizeCategory(raw.canonical_category),
        categoryLineage: Array.isArray(raw.category_lineage)
            ? raw.category_lineage.map(normalizeCategory).filter((category) => category.id > 0)
            : [],
        variantDimensions: Array.isArray(raw.variant_dimensions)
            ? raw.variant_dimensions.map(normalizeVariantDimension).filter((item): item is DoorConfigurationVariantDimension => Boolean(item))
            : [],
        variantDimensionsSource: str(raw.variant_dimensions_source),
        optionGroups: Array.isArray(raw.option_groups)
            ? raw.option_groups.map(normalizeOptionGroup).filter((item): item is DoorConfigurationOptionGroup => Boolean(item))
            : [],
        accessoryGroups: Array.isArray(raw.accessory_groups)
            ? raw.accessory_groups.map(normalizeAccessoryGroup).filter((item): item is DoorConfigurationAccessoryGroup => Boolean(item))
            : [],
    };
}
