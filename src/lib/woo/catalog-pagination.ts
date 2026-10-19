import { parseContentPage } from "@src/lib/content/pagination";
import { serializeDoorCatalogFilters } from "@src/lib/woo/seo-landing-routing";
import type { CatalogActiveFilters, CatalogResult } from "@src/lib/woo/types";

export const DOOR_CATALOG_PAGE_SIZE = 30;
export const parseDoorCatalogPage = parseContentPage;

export type CatalogPagination = Pick<CatalogResult, "page" | "totalPages"> & {
    path: string;
    filters: CatalogActiveFilters;
};

export function buildDoorCatalogPagePath(path: string, filters: CatalogActiveFilters, page: number): string {
    const query = new URLSearchParams(serializeDoorCatalogFilters(filters));
    if (page > 1) query.set("page", String(page));
    return query.size > 0 ? `${path}?${query}` : path;
}
