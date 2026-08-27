import type {
    CatalogActiveFilters,
    CatalogFilterTermDictionary,
    DoorCatalogFilterKey,
    DoorFilterState,
    DoorSeoRoutingDescriptor,
    PreferredDoorFilterRoute,
} from "@src/lib/woo/types";
import { DOOR_CATALOG_FILTER_DEFINITIONS } from "@src/lib/woo/catalog-filters";

function sortedUniqueNumbers(values: number[]): number[] {
    return Array.from(new Set(values.filter((value) => Number.isInteger(value) && value > 0)))
        .sort((a, b) => a - b);
}

function sortedUniqueStrings(values: string[]): string[] {
    return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort();
}

function arraysEqual<T>(left: T[], right: T[]): boolean {
    return left.length === right.length && left.every((value, index) => value === right[index]);
}

function getTermIdBySlug(
    dictionary: CatalogFilterTermDictionary,
    filterKey: DoorCatalogFilterKey,
    slug: string,
): number | null {
    return dictionary[filterKey]?.find((term) => term.slug === slug)?.id ?? null;
}

export function buildDoorFilterState(
    categoryId: number,
    activeFilters: CatalogActiveFilters,
    dictionary: CatalogFilterTermDictionary,
): DoorFilterState {
    const selectedTermsByFilter: DoorFilterState["selectedTermsByFilter"] = {};

    for (const definition of DOOR_CATALOG_FILTER_DEFINITIONS) {
        const slugs = sortedUniqueStrings(activeFilters[definition.key] ?? []);
        if (slugs.length === 0) continue;

        const termIds = sortedUniqueNumbers(
            slugs
                .map((slug) => getTermIdBySlug(dictionary, definition.key, slug))
                .filter((id): id is number => id !== null),
        );

        if (termIds.length > 0) {
            selectedTermsByFilter[definition.key] = termIds;
        }
    }

    return {
        categoryId,
        selectedTermsByFilter,
    };
}

export function doorFilterStateFullyResolvesActiveFilters(
    filterState: DoorFilterState,
    activeFilters: CatalogActiveFilters,
): boolean {
    for (const definition of DOOR_CATALOG_FILTER_DEFINITIONS) {
        const activeSlugs = sortedUniqueStrings(activeFilters[definition.key] ?? []);
        const termIds = sortedUniqueNumbers(filterState.selectedTermsByFilter[definition.key] ?? []);
        if (activeSlugs.length !== termIds.length) return false;
    }

    return true;
}

export function serializeDoorCatalogFilters(filters: CatalogActiveFilters): string {
    const searchParams = new URLSearchParams();

    for (const definition of DOOR_CATALOG_FILTER_DEFINITIONS) {
        const values = sortedUniqueStrings(filters[definition.key] ?? []);
        for (const value of values) {
            searchParams.append(definition.key, value);
        }
    }

    return searchParams.toString();
}

function getActiveFilterKeys(activeFilters: CatalogActiveFilters): DoorCatalogFilterKey[] {
    return DOOR_CATALOG_FILTER_DEFINITIONS
        .map((definition) => definition.key)
        .filter((key) => (activeFilters[key]?.length ?? 0) > 0);
}

function descriptorMatchesFilterState({
    descriptor,
    filterState,
    activeFilters,
}: {
    descriptor: DoorSeoRoutingDescriptor;
    filterState: DoorFilterState;
    activeFilters: CatalogActiveFilters;
}): boolean {
    if (descriptor.baseCategoryId !== filterState.categoryId) return false;

    for (const rule of descriptor.rules) {
        const activeSlugs = sortedUniqueStrings(activeFilters[rule.filterKey] ?? []);
        if (activeSlugs.length === 0) return false;

        const selectedTermIds = sortedUniqueNumbers(filterState.selectedTermsByFilter[rule.filterKey] ?? []);
        const landingTermIds = sortedUniqueNumbers(rule.termIds);

        // Если хотя бы один активный slug группы не удалось связать с настоящим Woo term,
        // группа не может считаться exact-compatible с SEO landing.
        if (selectedTermIds.length !== activeSlugs.length) return false;
        if (!arraysEqual(selectedTermIds, landingTermIds)) return false;
    }

    return true;
}

function compareDescriptors(left: DoorSeoRoutingDescriptor, right: DoorSeoRoutingDescriptor): number {
    const leftGroups = left.rules.length;
    const rightGroups = right.rules.length;
    if (leftGroups !== rightGroups) return rightGroups - leftGroups;

    const leftTerms = left.rules.reduce((sum, rule) => sum + rule.termIds.length, 0);
    const rightTerms = right.rules.reduce((sum, rule) => sum + rule.termIds.length, 0);
    if (leftTerms !== rightTerms) return rightTerms - leftTerms;

    if (left.navigationPriority !== right.navigationPriority) {
        return right.navigationPriority - left.navigationPriority;
    }

    if (left.slug !== right.slug) return left.slug < right.slug ? -1 : 1;
    return left.id - right.id;
}

function getResidualFilters(
    activeFilters: CatalogActiveFilters,
    landing: DoorSeoRoutingDescriptor,
): CatalogActiveFilters {
    const consumedKeys = new Set(landing.rules.map((rule) => rule.filterKey));
    const residual: CatalogActiveFilters = {};

    for (const definition of DOOR_CATALOG_FILTER_DEFINITIONS) {
        if (consumedKeys.has(definition.key)) continue;
        const values = sortedUniqueStrings(activeFilters[definition.key] ?? []);
        if (values.length > 0) residual[definition.key] = values;
    }

    return residual;
}

function appendFilters(path: string, filters: CatalogActiveFilters): string {
    const query = serializeDoorCatalogFilters(filters);
    return query ? `${path}?${query}` : path;
}

export function resolvePreferredDoorFilterRoute({
    categoryPath,
    filterState,
    activeFilters,
    landings,
}: {
    categoryPath: string;
    filterState: DoorFilterState;
    activeFilters: CatalogActiveFilters;
    landings: DoorSeoRoutingDescriptor[];
}): PreferredDoorFilterRoute {
    const activeKeys = getActiveFilterKeys(activeFilters);

    if (activeKeys.length === 0) {
        return {
            kind: "category",
            href: categoryPath,
            canonicalPath: categoryPath,
            residualFilters: {},
        };
    }

    const compatible = landings
        .filter((landing) => descriptorMatchesFilterState({ descriptor: landing, filterState, activeFilters }))
        .sort(compareDescriptors);

    const exact = compatible.find((landing) => {
        const landingKeys = new Set(landing.rules.map((rule) => rule.filterKey));
        return landingKeys.size === activeKeys.length && activeKeys.every((key) => landingKeys.has(key));
    });

    if (exact) {
        return {
            kind: "clean_landing",
            href: exact.path,
            canonicalPath: exact.path,
            landingId: exact.id,
            landingPath: exact.path,
            residualFilters: {},
        };
    }

    const bestLanding = compatible[0];
    if (bestLanding) {
        const residualFilters = getResidualFilters(activeFilters, bestLanding);
        return {
            kind: "landing_plus_query",
            href: appendFilters(bestLanding.path, residualFilters),
            canonicalPath: bestLanding.path,
            landingId: bestLanding.id,
            landingPath: bestLanding.path,
            residualFilters,
        };
    }

    return {
        kind: "category_query",
        href: appendFilters(categoryPath, activeFilters),
        canonicalPath: categoryPath,
        residualFilters: activeFilters,
    };
}
