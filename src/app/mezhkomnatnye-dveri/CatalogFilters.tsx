"use client";

import Link from "next/link";
import type { CatalogFiltersState } from "@src/lib/woo/types";

function getActiveFiltersCount(filters: CatalogFiltersState): number {
    return Object.values(filters.active).reduce((count, values) => count + (values?.length ?? 0), 0);
}

function getActiveFiltersSignature(filters: CatalogFiltersState): string {
    return Object.entries(filters.active)
        .map(([key, values]) => `${key}:${[...(values ?? [])].sort().join(",")}`)
        .sort()
        .join("|");
}

function SidebarFilterTitle({ children }: { children: string }) {
    return (
        <>
            <h5 className="mb-2 mt-4">{children}</h5>
            <div className="filter-title mb-3" />
        </>
    );
}

export default function CatalogFilters({
                                           filters,
                                           action,
                                           resetHref,
                                       }: {
    filters: CatalogFiltersState;
    action: string;
    resetHref: string;
}) {
    if (filters.groups.length === 0) {
        return null;
    }

    const activeFiltersCount = getActiveFiltersCount(filters);
    const activeFiltersSignature = getActiveFiltersSignature(filters);

    return (
        <div className="catalog-sidebar-filters">
            {activeFiltersCount > 0 ? (
                <div className="small text-muted mb-3">
                    Выбрано фильтров: {activeFiltersCount}
                </div>
            ) : null}

            <form key={activeFiltersSignature || "empty"} method="get" action={action}>
                {filters.groups.map((group) => (
                    <div key={group.key} className="mb-4">
                        <SidebarFilterTitle>{group.label}</SidebarFilterTitle>

                        <div className="mt-3">
                            {group.options.map((option) => {
                                const id = `${group.key}-${option.value}`;

                                return (
                                    <div key={id} className="form-check mb-2 d-flex justify-content-between gap-2">
                                        <div>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name={group.key}
                                                value={option.value}
                                                id={id}
                                                defaultChecked={option.selected}
                                                onChange={(event) => event.currentTarget.form?.requestSubmit()}
                                            />
                                            <label className="form-check-label ms-1" htmlFor={id} style={{ cursor: "pointer" }}>
                                                {option.label}
                                            </label>
                                        </div>
                                        <span className="text-muted small">{option.count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="d-grid gap-2 mt-4">
                    <Link href={resetHref} className="btn btn-outline-secondary rounded-pill px-4">
                        Сбросить
                    </Link>
                </div>
            </form>
        </div>
    );
}
