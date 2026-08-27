"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { resolvePreferredDoorFilterRoute } from "@src/lib/woo/seo-landing-routing";
import type {
    CatalogActiveFilters,
    CatalogFiltersState,
    DoorCatalogFilterKey,
    DoorFilterState,
    DoorSeoRoutingDescriptor,
} from "@src/lib/woo/types";

function getActiveFiltersCount(filters: CatalogFiltersState): number {
    return Object.values(filters.active).reduce((count, values) => count + (values?.length ?? 0), 0);
}

function getActiveFiltersSignature(filters: CatalogFiltersState): string {
    return Object.entries(filters.active)
        .map(([key, values]) => `${key}:${[...(values ?? [])].sort().join(",")}`)
        .sort()
        .join("|");
}

function SidebarFilterTitle({ label }: { label: string }) {
    return (
        <>
            <h5 className="mb-2 mt-4">{label}</h5>
            <div className="filter-title mb-3" />
        </>
    );
}

function toggleFilterValue(
    active: CatalogActiveFilters,
    filterKey: DoorCatalogFilterKey,
    value: string,
): CatalogActiveFilters {
    const next: CatalogActiveFilters = Object.fromEntries(
        Object.entries(active).map(([key, values]) => [key, [...(values ?? [])]]),
    );
    const values = new Set(next[filterKey] ?? []);

    if (values.has(value)) values.delete(value);
    else values.add(value);

    const normalized = Array.from(values).sort();
    if (normalized.length > 0) next[filterKey] = normalized;
    else delete next[filterKey];

    return next;
}

function buildFilterStateFromGroups(
    categoryId: number,
    filters: CatalogFiltersState,
    active: CatalogActiveFilters,
): DoorFilterState {
    const selectedTermsByFilter: DoorFilterState["selectedTermsByFilter"] = {};

    for (const group of filters.groups) {
        const selectedSlugs = new Set(active[group.key] ?? []);
        if (selectedSlugs.size === 0) continue;

        const termIds = group.options
            .filter((option) => selectedSlugs.has(option.value) && option.termId !== null)
            .map((option) => option.termId as number)
            .sort((a, b) => a - b);

        if (termIds.length > 0) {
            selectedTermsByFilter[group.key] = Array.from(new Set(termIds));
        }
    }

    return { categoryId, selectedTermsByFilter };
}

export default function CatalogFilters({
                                           filters,
                                           categoryId,
                                           categoryPath,
                                           landings,
                                       }: {
    filters: CatalogFiltersState;
    categoryId: number;
    categoryPath: string;
    landings: DoorSeoRoutingDescriptor[];
}) {
    const router = useRouter();

    if (filters.groups.length === 0) {
        return null;
    }

    const activeFiltersCount = getActiveFiltersCount(filters);
    const activeFiltersSignature = getActiveFiltersSignature(filters);

    const getNavigation = (filterKey: DoorCatalogFilterKey, value: string) => {
        const nextActive = toggleFilterValue(filters.active, filterKey, value);
        const filterState = buildFilterStateFromGroups(categoryId, filters, nextActive);

        return resolvePreferredDoorFilterRoute({
            categoryPath,
            filterState,
            activeFilters: nextActive,
            landings,
        });
    };

    return (
        <div className="catalog-sidebar-filters">
            {activeFiltersCount > 0 ? (
                <div className="small text-muted mb-3">
                    Выбрано фильтров: {activeFiltersCount}
                </div>
            ) : null}

            <form key={activeFiltersSignature || "empty"} method="get" action={categoryPath}>
                {filters.groups.map((group) => (
                    <div key={group.key} className="mb-4">
                        <SidebarFilterTitle label={group.label} />

                        <div className="mt-3">
                            {group.options.map((option) => {
                                const id = `${group.key}-${option.value}`;
                                const navigation = getNavigation(group.key, option.value);
                                const isCrawlableExactLanding = !option.selected && navigation.kind === "clean_landing";

                                return (
                                    <div key={id} className="form-check mb-2 d-flex justify-content-between gap-2">
                                        <div>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={group.key}
                                                value={option.value}
                                                id={id}
                                                checked={option.selected}
                                                aria-label={option.label}
                                                onChange={() => router.push(navigation.href)}
                                            />
                                            {isCrawlableExactLanding ? (
                                                <Link
                                                    href={navigation.href}
                                                    className="ms-1 text-reset text-decoration-none"
                                                >
                                                    {option.label}
                                                </Link>
                                            ) : (
                                                <label className="form-check-label ms-1" htmlFor={id} style={{ cursor: "pointer" }}>
                                                    {option.label}
                                                </label>
                                            )}
                                        </div>
                                        <span className="text-muted small">{option.count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="d-grid gap-2 mt-4">
                    <Link href={categoryPath} className="btn btn-outline-secondary rounded-pill px-4">
                        Сбросить
                    </Link>
                    <noscript>
                        <button type="submit" className="btn btn-outline-secondary rounded-pill px-4">
                            Применить фильтры
                        </button>
                    </noscript>
                </div>
            </form>
        </div>
    );
}
