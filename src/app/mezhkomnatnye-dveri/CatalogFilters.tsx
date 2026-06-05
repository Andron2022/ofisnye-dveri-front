import Link from "next/link";
import type { CatalogFiltersState } from "@src/lib/woo/types";

function getActiveFiltersCount(filters: CatalogFiltersState): number {
    return Object.values(filters.active).reduce((count, values) => count + (values?.length ?? 0), 0);
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

    return (
        <aside className="border rounded-3 p-3 mb-4 bg-white">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-3">
                <div>
                    <h2 className="fs-5 mb-1">Фильтры каталога</h2>
                    <div className="small text-muted">
                        Выберите нужные характеристики — каталог обновится после применения фильтров.
                    </div>
                </div>

                <div className="d-flex align-items-start gap-2">
                    {activeFiltersCount > 0 ? (
                        <span className="badge text-bg-dark mt-1">Активно: {activeFiltersCount}</span>
                    ) : null}

                    <Link href={resetHref} className="btn btn-sm btn-outline-secondary rounded-pill">
                        Сбросить
                    </Link>
                </div>
            </div>

            <form method="get" action={action}>
                <div className="row g-3">
                    {filters.groups.map((group) => (
                        <div key={group.key} className="col-12 col-md-6 col-xl-4">
                            <div className="border rounded-3 p-3 h-100">
                                <h3 className="fs-6 mb-3">{group.label}</h3>

                                <div className="d-flex flex-column gap-2">
                                    {group.options.map((option) => (
                                        <label key={`${group.key}-${option.value}`} className="d-flex align-items-start gap-2 small">
                                            <input
                                                className="form-check-input mt-1"
                                                type="checkbox"
                                                name={group.key}
                                                value={option.value}
                                                defaultChecked={option.selected}
                                            />
                                            <span className="d-flex justify-content-between gap-3 w-100">
                                                <span>{option.label}</span>
                                                <span className="text-muted">{option.count}</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                    <button type="submit" className="btn btn-dark rounded-pill px-4">
                        Применить фильтры
                    </button>
                    <Link href={resetHref} className="btn btn-outline-secondary rounded-pill px-4">
                        Очистить
                    </Link>
                </div>
            </form>
        </aside>
    );
}
