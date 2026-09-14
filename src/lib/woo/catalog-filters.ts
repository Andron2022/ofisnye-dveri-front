import type {
    CatalogActiveFilters,
    CatalogFilterGroup,
    CatalogFilterTermDictionary,
    DoorCatalogAttributes,
    DoorCatalogFilterDefinition,
    DoorCatalogFilterKey,
} from "@src/lib/woo/types";

type SearchParamsLike = Record<string, string | string[] | undefined>;

const ruToLat: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
    х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export function normalizeCatalogFilterValue(value: string): string {
    const transliterated = value.trim().toLowerCase().split("").map((letter) => ruToLat[letter] ?? letter).join("");
    return transliterated.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-");
}

function parseRawFilterValues(values: string[]): string[] {
    return Array.from(new Set(values.flatMap((value) => value.split(",")).map(normalizeCatalogFilterValue).filter(Boolean)));
}

function allowedSet(allowedKeys: Iterable<string>): Set<string> {
    return new Set(Array.from(allowedKeys).filter(Boolean));
}

export function parseDoorCatalogFiltersFromSearchParams(
    searchParams: SearchParamsLike,
    allowedKeys: Iterable<string>,
): CatalogActiveFilters {
    const result: CatalogActiveFilters = {};
    const allowed = allowedSet(allowedKeys);
    for (const [key, rawValue] of Object.entries(searchParams)) {
        if (!allowed.has(key) || rawValue === undefined) continue;
        const parsedValues = parseRawFilterValues(Array.isArray(rawValue) ? rawValue : [rawValue]);
        if (parsedValues.length > 0) result[key] = parsedValues;
    }
    return result;
}

export function parseDoorCatalogFiltersFromURLSearchParams(
    searchParams: URLSearchParams,
    allowedKeys: Iterable<string>,
): CatalogActiveFilters {
    const result: CatalogActiveFilters = {};
    for (const key of allowedSet(allowedKeys)) {
        const parsedValues = parseRawFilterValues(searchParams.getAll(key));
        if (parsedValues.length > 0) result[key] = parsedValues;
    }
    return result;
}

function normalizeTermName(value: string): string {
    return value.trim().toLocaleLowerCase("ru-RU").replace(/\s+/g, " ");
}

function resolveFilterValueFromLabel(key: DoorCatalogFilterKey, label: string, termDictionary: CatalogFilterTermDictionary): string {
    const normalizedName = normalizeTermName(label);
    const matchedTerm = termDictionary[key]?.find((term) => normalizeTermName(term.name) === normalizedName);
    return matchedTerm?.slug || normalizeCatalogFilterValue(label);
}

function getAttributeValues(attributes: DoorCatalogAttributes, definition: DoorCatalogFilterDefinition): string[] {
    return attributes[definition.taxonomy] ?? [];
}

export function catalogItemMatchesActiveFilters(
    attributes: DoorCatalogAttributes,
    activeFilters: CatalogActiveFilters,
    definitions: DoorCatalogFilterDefinition[],
    termDictionary: CatalogFilterTermDictionary = {},
): boolean {
    return definitions.every((definition) => {
        const selectedValues = activeFilters[definition.key];
        if (!selectedValues || selectedValues.length === 0) return true;
        const productValues = getAttributeValues(attributes, definition)
            .map((value) => resolveFilterValueFromLabel(definition.key, value, termDictionary));
        return selectedValues.some((selectedValue) => productValues.includes(selectedValue));
    });
}

export function hasActiveCatalogFilters(activeFilters: CatalogActiveFilters): boolean {
    return Object.values(activeFilters).some((values) => values && values.length > 0);
}

export function buildCatalogFilterGroups(
    items: Array<{ attributes: DoorCatalogAttributes }>,
    activeFilters: CatalogActiveFilters,
    definitions: DoorCatalogFilterDefinition[],
    termDictionary: CatalogFilterTermDictionary = {},
): CatalogFilterGroup[] {
    return definitions.map((definition) => {
        const optionMap = new Map<string, { label: string; count: number }>();
        for (const item of items) {
            const uniqueValues = new Map<string, string>();
            for (const label of getAttributeValues(item.attributes, definition)) {
                const value = resolveFilterValueFromLabel(definition.key, label, termDictionary);
                if (value) uniqueValues.set(value, label);
            }
            for (const [value, label] of uniqueValues) {
                const existing = optionMap.get(value);
                optionMap.set(value, { label: existing?.label ?? label, count: (existing?.count ?? 0) + 1 });
            }
        }

        const selectedValues = activeFilters[definition.key] ?? [];
        for (const selectedValue of selectedValues) {
            if (optionMap.has(selectedValue)) continue;
            const selectedTerm = termDictionary[definition.key]?.find((term) => term.slug === selectedValue);
            if (selectedTerm) optionMap.set(selectedValue, { label: selectedTerm.name, count: 0 });
        }

        const options = Array.from(optionMap.entries()).map(([value, option]) => {
            const term = termDictionary[definition.key]?.find((item) => item.slug === value) ?? null;
            return {
                value,
                label: option.label,
                count: option.count,
                selected: selectedValues.includes(value),
                termId: term?.id ?? null,
                taxonomy: term?.taxonomy ?? definition.taxonomy,
            };
        }).sort((a, b) => a.label.localeCompare(b.label, "ru", { numeric: true, sensitivity: "base" }));

        return { key: definition.key, label: definition.label, taxonomy: definition.taxonomy, options };
    }).filter((group) => group.options.length > 0);
}
