// src/lib/woo/catalog-filters.ts

import type {
    CatalogActiveFilters,
    CatalogFilterGroup,
    DoorCatalogAttributes,
    DoorCatalogFilterKey,
} from "@src/lib/woo/types";

type SearchParamsLike = Record<string, string | string[] | undefined>;
type DoorAttributeField = keyof DoorCatalogAttributes;

export type DoorCatalogFilterDefinition = {
    key: DoorCatalogFilterKey;
    label: string;
    attributeField: DoorAttributeField;
};

// -----------------------------------------------------
// Единый контракт фильтров каталога дверей.
// Ключи совпадают со slug глобальных Woo-атрибутов без префикса pa_.
// Это важно для будущих SEO-фильтров и для перехода на tax_query/WP endpoint.
// -----------------------------------------------------

export const DOOR_CATALOG_FILTER_DEFINITIONS: DoorCatalogFilterDefinition[] = [
    { key: "tsvet-dveri", label: "Цвет двери", attributeField: "color" },
    { key: "razmer-dveri", label: "Размер двери", attributeField: "size" },
    { key: "kolichestvo-poloten", label: "Количество полотен", attributeField: "leafCount" },
    { key: "material-dveri", label: "Материал двери", attributeField: "material" },
    { key: "osteklenie", label: "Остекление", attributeField: "glazing" },
    { key: "tip-otkryvaniya", label: "Тип открывания", attributeField: "openingType" },
    { key: "naznachenie", label: "Назначение", attributeField: "purpose" },
    { key: "napravlenie-otkryvaniya", label: "Направление открывания", attributeField: "openingDirection" },
    { key: "ognestoykost", label: "Огнестойкость", attributeField: "fireResistance" },
    { key: "tip-ostekleniya", label: "Тип остекления", attributeField: "glazingType" },
];

const FILTER_KEYS = new Set<DoorCatalogFilterKey>(
    DOOR_CATALOG_FILTER_DEFINITIONS.map((definition) => definition.key),
);

const ruToLat: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
};

function isDoorCatalogFilterKey(key: string): key is DoorCatalogFilterKey {
    return FILTER_KEYS.has(key as DoorCatalogFilterKey);
}

// -----------------------------------------------------
// Генерируем стабильный URL-value для значения атрибута.
// Woo product response отдаёт labels атрибутов, но не всегда term slug.
// Для MVP генерируем slug из label по правилам проекта.
// Позже этот helper можно заменить на реальные term slugs из WP REST.
// -----------------------------------------------------

export function normalizeCatalogFilterValue(value: string): string {
    const transliterated = value
        .trim()
        .toLowerCase()
        .split("")
        .map((letter) => ruToLat[letter] ?? letter)
        .join("");

    return transliterated
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-");
}

function parseRawFilterValues(values: string[]): string[] {
    const normalizedValues = values
        .flatMap((value) => value.split(","))
        .map((value) => normalizeCatalogFilterValue(value))
        .filter(Boolean);

    return Array.from(new Set(normalizedValues));
}

export function parseDoorCatalogFiltersFromSearchParams(searchParams: SearchParamsLike): CatalogActiveFilters {
    const result: CatalogActiveFilters = {};

    for (const [key, rawValue] of Object.entries(searchParams)) {
        if (!isDoorCatalogFilterKey(key)) continue;
        if (rawValue === undefined) continue;

        const values = Array.isArray(rawValue) ? rawValue : [rawValue];
        const parsedValues = parseRawFilterValues(values);

        if (parsedValues.length > 0) {
            result[key] = parsedValues;
        }
    }

    return result;
}

export function parseDoorCatalogFiltersFromURLSearchParams(searchParams: URLSearchParams): CatalogActiveFilters {
    const result: CatalogActiveFilters = {};

    for (const definition of DOOR_CATALOG_FILTER_DEFINITIONS) {
        const values = searchParams.getAll(definition.key);
        const parsedValues = parseRawFilterValues(values);

        if (parsedValues.length > 0) {
            result[definition.key] = parsedValues;
        }
    }

    return result;
}

function getAttributeValues(attributes: DoorCatalogAttributes, key: DoorCatalogFilterKey): string[] {
    const definition = DOOR_CATALOG_FILTER_DEFINITIONS.find((item) => item.key === key);
    if (!definition) return [];

    return attributes[definition.attributeField] ?? [];
}

export function catalogItemMatchesActiveFilters(
    attributes: DoorCatalogAttributes,
    activeFilters: CatalogActiveFilters,
): boolean {
    return DOOR_CATALOG_FILTER_DEFINITIONS.every((definition) => {
        const selectedValues = activeFilters[definition.key];
        if (!selectedValues || selectedValues.length === 0) return true;

        const productValues = getAttributeValues(attributes, definition.key)
            .map((value) => normalizeCatalogFilterValue(value));

        return selectedValues.some((selectedValue) => productValues.includes(selectedValue));
    });
}

export function hasActiveCatalogFilters(activeFilters: CatalogActiveFilters): boolean {
    return Object.values(activeFilters).some((values) => values && values.length > 0);
}

export function buildCatalogFilterGroups(
    items: Array<{ attributes: DoorCatalogAttributes }>,
    activeFilters: CatalogActiveFilters,
): CatalogFilterGroup[] {
    return DOOR_CATALOG_FILTER_DEFINITIONS.map((definition) => {
        const optionMap = new Map<string, { label: string; count: number }>();

        for (const item of items) {
            const uniqueValues = new Map<string, string>();

            for (const label of getAttributeValues(item.attributes, definition.key)) {
                const value = normalizeCatalogFilterValue(label);
                if (!value) continue;
                uniqueValues.set(value, label);
            }

            for (const [value, label] of uniqueValues) {
                const existing = optionMap.get(value);

                optionMap.set(value, {
                    label: existing?.label ?? label,
                    count: (existing?.count ?? 0) + 1,
                });
            }
        }

        const selectedValues = activeFilters[definition.key] ?? [];
        const options = Array.from(optionMap.entries())
            .map(([value, option]) => ({
                value,
                label: option.label,
                count: option.count,
                selected: selectedValues.includes(value),
            }))
            .sort((a, b) => a.label.localeCompare(b.label, "ru", {
                numeric: true,
                sensitivity: "base",
            }));

        return {
            key: definition.key,
            label: definition.label,
            options,
        };
    }).filter((group) => group.options.length > 0);
}
