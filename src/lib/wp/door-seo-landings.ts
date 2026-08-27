import { normalizeHeadlessSeo } from "@src/lib/seo/types";
import { wpNamespaceGet } from "@src/lib/woo/client";
import type {
    CatalogFilterTermDictionary,
    DoorCatalogFilterKey,
    DoorFilterState,
} from "@src/lib/woo/types";

export type DoorSeoLandingTerm = {
    id: number;
    name: string;
    slug: string;
};

export type DoorSeoLandingRule = {
    filterKey: DoorCatalogFilterKey;
    taxonomy: string;
    terms: DoorSeoLandingTerm[];
};

export type DoorSeoLandingFaqItem = {
    question: string;
    answer: string;
};

export type DoorSeoLanding = {
    id: number;
    title: string;
    slug: string;
    enabled: boolean;
    navigationPriority: number;
    showInPopularCollections: boolean;
    modified?: string;
    baseCategory: {
        id: number;
        name: string;
        slug: string;
    };
    rules: DoorSeoLandingRule[];
    h1?: string;
    intro?: string;
    contentHtml?: string;
    targetIntent?: string;
    selectionNotes?: string;
    faq: DoorSeoLandingFaqItem[];
    relatedIds: number[];
    seo: ReturnType<typeof normalizeHeadlessSeo>;
    valid: boolean;
    issues: string[];
};

type RawDoorSeoLanding = {
    id?: unknown;
    title?: unknown;
    slug?: unknown;
    enabled?: unknown;
    navigation_priority?: unknown;
    show_in_popular_collections?: unknown;
    modified?: unknown;
    base_category?: unknown;
    rules?: unknown;
    h1?: unknown;
    intro?: unknown;
    content_html?: unknown;
    target_intent?: unknown;
    selection_notes?: unknown;
    faq?: unknown;
    related_ids?: unknown;
    headless_seo?: unknown;
    valid?: unknown;
    issues?: unknown;
};

type RawLandingCollection = {
    items?: unknown;
};

type RawCatalogProducts = {
    base_category_id?: unknown;
    ids?: unknown;
    count?: unknown;
};

type RawFilterTermsResponse = {
    groups?: unknown;
};

function asObject(value: unknown): Record<string, unknown> | null {
    return value && typeof value === "object" && !Array.isArray(value)
        ? value as Record<string, unknown>
        : null;
}

function asString(value: unknown): string | undefined {
    return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asPositiveInt(value: unknown): number | undefined {
    const number = typeof value === "number" ? value : Number(value);
    return Number.isInteger(number) && number > 0 ? number : undefined;
}

function asInt(value: unknown): number {
    const number = typeof value === "number" ? value : Number(value);
    return Number.isInteger(number) ? number : 0;
}

function asBoolean(value: unknown): boolean {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    return ["1", "true", "yes", "on"].includes(String(value ?? "").trim().toLowerCase());
}

const FILTER_KEYS = new Set<DoorCatalogFilterKey>([
    "tsvet-dveri",
    "razmer-dveri",
    "kolichestvo-poloten",
    "material-dveri",
    "osteklenie",
    "tip-otkryvaniya",
    "naznachenie",
    "napravlenie-otkryvaniya",
    "ognestoykost",
    "tip-ostekleniya",
]);

function isDoorFilterKey(value: string): value is DoorCatalogFilterKey {
    return FILTER_KEYS.has(value as DoorCatalogFilterKey);
}

function normalizeTerm(value: unknown): DoorSeoLandingTerm | null {
    const object = asObject(value);
    if (!object) return null;

    const id = asPositiveInt(object.id);
    const name = asString(object.name);
    const slug = asString(object.slug);

    return id && name && slug ? { id, name, slug } : null;
}

function normalizeRules(value: unknown): DoorSeoLandingRule[] {
    if (!Array.isArray(value)) return [];

    return value.flatMap((entry) => {
        const object = asObject(entry);
        if (!object) return [];

        const filterKey = asString(object.filter_key);
        const taxonomy = asString(object.taxonomy);
        if (!filterKey || !isDoorFilterKey(filterKey) || !taxonomy) return [];

        const terms = Array.isArray(object.terms)
            ? object.terms.map(normalizeTerm).filter((term): term is DoorSeoLandingTerm => Boolean(term))
            : [];

        return terms.length > 0 ? [{ filterKey, taxonomy, terms }] : [];
    });
}

function normalizeFaq(value: unknown): DoorSeoLandingFaqItem[] {
    if (!Array.isArray(value)) return [];

    return value.flatMap((entry) => {
        const object = asObject(entry);
        const question = object ? asString(object.question) : undefined;
        const answer = object ? asString(object.answer) : undefined;
        return question && answer ? [{ question, answer }] : [];
    });
}

function normalizeIds(value: unknown): number[] {
    if (!Array.isArray(value)) return [];
    return Array.from(new Set(value.map(asPositiveInt).filter((id): id is number => Boolean(id))));
}

function normalizeLanding(value: unknown): DoorSeoLanding | null {
    const raw = asObject(value) as RawDoorSeoLanding | null;
    if (!raw) return null;

    const id = asPositiveInt(raw.id);
    const title = asString(raw.title);
    const slug = asString(raw.slug);
    const baseCategoryObject = asObject(raw.base_category);
    const baseCategoryId = baseCategoryObject ? asPositiveInt(baseCategoryObject.id) : undefined;
    const baseCategoryName = baseCategoryObject ? asString(baseCategoryObject.name) : undefined;
    const baseCategorySlug = baseCategoryObject ? asString(baseCategoryObject.slug) : undefined;

    if (!id || !title || !slug || !baseCategoryId || !baseCategoryName || !baseCategorySlug) {
        return null;
    }

    return {
        id,
        title,
        slug,
        enabled: asBoolean(raw.enabled),
        navigationPriority: asInt(raw.navigation_priority),
        showInPopularCollections: raw.show_in_popular_collections === undefined
            ? true
            : asBoolean(raw.show_in_popular_collections),
        modified: asString(raw.modified),
        baseCategory: {
            id: baseCategoryId,
            name: baseCategoryName,
            slug: baseCategorySlug,
        },
        rules: normalizeRules(raw.rules),
        h1: asString(raw.h1),
        intro: asString(raw.intro),
        contentHtml: asString(raw.content_html),
        targetIntent: asString(raw.target_intent),
        selectionNotes: asString(raw.selection_notes),
        faq: normalizeFaq(raw.faq),
        relatedIds: normalizeIds(raw.related_ids),
        seo: normalizeHeadlessSeo(raw.headless_seo),
        valid: asBoolean(raw.valid),
        issues: Array.isArray(raw.issues)
            ? raw.issues.map(asString).filter((item): item is string => Boolean(item))
            : [],
    };
}

export async function getDoorSeoLandings(args: {
    baseCategoryId?: number;
    slug?: string;
} = {}): Promise<DoorSeoLanding[]> {
    const response = await wpNamespaceGet<RawLandingCollection>(
        "od/v1/door-seo-landings",
        {
            base_category_id: args.baseCategoryId,
            slug: args.slug,
        },
        60,
    );

    const items = Array.isArray(response.items) ? response.items : [];
    return items.map(normalizeLanding).filter((item): item is DoorSeoLanding => Boolean(item));
}

export async function getDoorSeoLanding(
    baseCategoryId: number,
    slug: string,
): Promise<DoorSeoLanding | null> {
    const items = await getDoorSeoLandings({ baseCategoryId, slug });
    return items.find((item) => item.enabled && item.valid) ?? null;
}

export async function getDoorSeoLandingProductIds(landingId: number): Promise<number[]> {
    const response = await wpNamespaceGet<RawCatalogProducts>(
        `od/v1/door-seo-landings/${landingId}/products`,
        {},
        60,
    );

    return normalizeIds(response.ids);
}

export async function getDoorCatalogProductIds(filterState: DoorFilterState): Promise<number[]> {
    const query: Record<string, string | number | undefined> = {
        base_category_id: filterState.categoryId,
    };

    for (const [filterKey, rawTermIds] of Object.entries(filterState.selectedTermsByFilter)) {
        if (!isDoorFilterKey(filterKey) || !rawTermIds || rawTermIds.length === 0) continue;
        query[filterKey] = Array.from(new Set(rawTermIds)).sort((a, b) => a - b).join(",");
    }

    const response = await wpNamespaceGet<RawCatalogProducts>(
        "od/v1/door-catalog-products",
        query,
        60,
    );

    return normalizeIds(response.ids);
}

export async function getDoorCatalogFilterTermDictionary(): Promise<CatalogFilterTermDictionary> {
    const response = await wpNamespaceGet<RawFilterTermsResponse>("od/v1/door-filter-terms", {}, 300);
    const groups = Array.isArray(response.groups) ? response.groups : [];
    const dictionary: CatalogFilterTermDictionary = {};

    for (const groupValue of groups) {
        const group = asObject(groupValue);
        const filterKey = group ? asString(group.filter_key) : undefined;
        const taxonomy = group ? asString(group.taxonomy) : undefined;
        const terms = group && Array.isArray(group.terms) ? group.terms : [];

        if (!filterKey || !isDoorFilterKey(filterKey) || !taxonomy) continue;

        dictionary[filterKey] = terms.flatMap((termValue) => {
            const term = normalizeTerm(termValue);
            return term ? [{ ...term, taxonomy }] : [];
        });
    }

    return dictionary;
}
