import Link from "next/link";
import { contentPaginationPages } from "@src/lib/content/pagination";
import { buildDoorCatalogPagePath } from "@src/lib/woo/catalog-pagination";
import type { CatalogPagination as CatalogPaginationProps } from "@src/lib/woo/catalog-pagination";

export function CatalogPagination({ path, filters, page, totalPages }: CatalogPaginationProps) {
    if (totalPages <= 1) return null;
    const pages = contentPaginationPages({ page, totalPages });
    const href = (number: number) => `${buildDoorCatalogPagePath(path, filters, number)}#catalog-products`;

    return (
        <nav aria-label="Страницы каталога" className="d-flex flex-wrap justify-content-center align-items-center gap-2 my-4">
            {page > 1 ? <Link href={href(page - 1)} prefetch={false} rel="prev" className="btn btn-outline-dark">Назад</Link> : null}
            {pages.map((number, index) => (
                <span key={number} className="d-inline-flex align-items-center gap-2">
                    {index > 0 && number - pages[index - 1] > 1 ? <span aria-hidden="true">…</span> : null}
                    {number === page ? (
                        <span className="btn btn-dark" aria-current="page" aria-label={`Страница ${number}`}>{number}</span>
                    ) : (
                        <Link href={href(number)} prefetch={false} className="btn btn-outline-dark" aria-label={`Страница ${number}`}>{number}</Link>
                    )}
                </span>
            ))}
            {page < totalPages ? <Link href={href(page + 1)} prefetch={false} rel="next" className="btn btn-outline-dark">Далее</Link> : null}
        </nav>
    );
}
