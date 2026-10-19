export const CONTENT_PAGE_SIZE = 12;

export type ContentPagination = {
    page: number;
    totalPages: number;
};

export function parseContentPage(value: string | string[] | undefined): number | null {
    if (value === undefined) return 1;
    if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return null;
    const page = Number(value);
    return Number.isSafeInteger(page) ? page : null;
}

export function contentPagePath(path: string, page: number): string {
    return page === 1 ? path : `${path}?page=${page}`;
}

export function contentPaginationPages({ page, totalPages }: ContentPagination): number[] {
    const pages = new Set([1, totalPages]);
    for (let number = Math.max(1, page - 2); number <= Math.min(totalPages, page + 2); number++) {
        pages.add(number);
    }
    return [...pages].sort((a, b) => a - b);
}
