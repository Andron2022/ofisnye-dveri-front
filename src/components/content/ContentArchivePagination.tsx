import Link from "next/link";
import { contentPagePath, contentPaginationPages } from "@src/lib/content/pagination";
import type { ContentPagination } from "@src/lib/content/pagination";

export function ContentArchivePagination({ path, page, totalPages }: ContentPagination & { path: string }) {
    if (totalPages <= 1) return null;
    const pages = contentPaginationPages({ page, totalPages });
    return (
        <nav aria-label="Страницы раздела" className="d-flex flex-wrap justify-content-center align-items-center gap-2 my-4">
            {page > 1 ? (
                <Link href={contentPagePath(path, page - 1)} prefetch={false} rel="prev" className="btn btn-outline-dark">
                    Назад
                </Link>
            ) : null}
            {pages.map((number, index) => (
                <span key={number} className="d-inline-flex align-items-center gap-2">
                    {index > 0 && number - pages[index - 1] > 1 ? <span aria-hidden="true">…</span> : null}
                    {number === page ? (
                        <span className="btn btn-dark" aria-current="page" aria-label={`Страница ${number}`}>{number}</span>
                    ) : (
                        <Link href={contentPagePath(path, number)} prefetch={false} className="btn btn-outline-dark" aria-label={`Страница ${number}`}>
                            {number}
                        </Link>
                    )}
                </span>
            ))}
            {page < totalPages ? (
                <Link href={contentPagePath(path, page + 1)} prefetch={false} rel="next" className="btn btn-outline-dark">
                    Далее
                </Link>
            ) : null}
        </nav>
    );
}
