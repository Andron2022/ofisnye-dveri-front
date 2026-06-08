import Link from "next/link";
import shopBanner from "@assets/images/shop/shop-banner.jpg";
import type { ReactNode } from "react";
import type { CatalogProductCard } from "@src/lib/woo/types";
import KallesCatalogGrid from "@src/components/storefront/KallesCatalogGrid";

export type KallesCatalogCategoryLink = {
    href: string;
    label: string;
};

type KallesCatalogShellProps = {
    eyebrow: string;
    title: string;
    description: string;
    total?: number;
    activeHref: string;
    filters: ReactNode;
    items: CatalogProductCard[];
    loadError?: string | null;
    emptyMessage: string;
};

const DOOR_CATEGORY_TREE: Array<{
    href: string;
    label: string;
    children: KallesCatalogCategoryLink[];
}> = [
    {
        href: "/mezhkomnatnye-dveri",
        label: "Межкомнатные двери",
        children: [
            { href: "/mezhkomnatnye-dveri/skrytye", label: "Скрытые" },
            { href: "/mezhkomnatnye-dveri/protivopozharnye", label: "Противопожарные" },
        ],
    },
];

const DOOR_CATEGORY_LINKS: KallesCatalogCategoryLink[] = [
    { href: "/mezhkomnatnye-dveri", label: "Межкомнатные двери" },
    ...DOOR_CATEGORY_TREE[0].children,
];

function KallesCatalogNav({ activeHref }: { activeHref: string }) {
    return (
        <div className="d-none d-lg-block navbar navbar-expand-lg py-1 border-top">
            <ul className="list-unstyled navbar-nav justify-content-center w-100 mb-0">
                {DOOR_CATEGORY_LINKS.map((item) => {
                    const isActive = item.href === activeHref;

                    return (
                        <li key={item.href} className="nav-item">
                            <Link
                                className={`nav-link px-3 ${isActive ? "text-teal" : ""}`}
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function KallesCatalogHero({ eyebrow, title, description }: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div
            style={{ backgroundImage: `url(${shopBanner.src})`, backgroundPosition: "center", backgroundSize: "cover" }}
            className="position-relative"
        >
            <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50" />
            <div className="container">
                <div className="text-white text-center py-5 position-relative">
                    <p className="text-uppercase fs-14 fw-medium mb-2">{eyebrow}</p>
                    <h1 className="fs-20 fw-medium mb-2">{title}</h1>
                    <p className="fs-14 mb-0 mx-auto" style={{ maxWidth: 760 }}>{description}</p>
                </div>
            </div>
        </div>
    );
}

function KallesSidebarCategoryLinks({ activeHref }: { activeHref: string }) {
    return (
        <div>
            <h5 className="mb-2 mt-3">Разделы каталога</h5>
            <div className="filter-title mb-4" />

            <ul className="list-unstyled mb-4 navbar-nav justify-content-center">
                {DOOR_CATEGORY_TREE.map((section) => {
                    const isParentActive = activeHref === section.href;
                    const hasActiveChild = section.children.some((child) => child.href === activeHref);

                    return (
                        <li key={section.href} className="nav-item">
                            <details open={isParentActive || hasActiveChild || section.href === "/mezhkomnatnye-dveri"}>
                                <summary className="d-flex align-items-center justify-content-between mb-2" style={{ cursor: "pointer" }}>
                                    <Link
                                        href={section.href}
                                        className={`nav-link p-0 ${isParentActive ? "text-teal" : ""}`}
                                        aria-current={isParentActive ? "page" : undefined}
                                    >
                                        {section.label}
                                    </Link>
                                    <span className="ms-2 fs-16 text-muted">+</span>
                                </summary>

                                <ul className="list-unstyled mb-0 ps-3">
                                    {section.children.map((child) => {
                                        const isActive = child.href === activeHref;

                                        return (
                                            <li key={child.href}>
                                                <Link
                                                    href={child.href}
                                                    className={`nav-link py-1 px-0 fs-14 ${isActive ? "text-teal" : ""}`}
                                                    aria-current={isActive ? "page" : undefined}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export function KallesCatalogShell({
                                       eyebrow,
                                       title,
                                       description,
                                       total,
                                       activeHref,
                                       filters,
                                       items,
                                       loadError,
                                       emptyMessage,
                                   }: KallesCatalogShellProps) {
    return (
        <>
            <KallesCatalogNav activeHref={activeHref} />
            <KallesCatalogHero eyebrow={eyebrow} title={title} description={description} />

            <section className="py-5">
                <div className="container">
                    {loadError ? (
                        <div className="alert alert-danger mb-4" role="alert">
                            <strong>Ошибка загрузки каталога.</strong>
                            <div className="mt-2 small">{loadError}</div>
                        </div>
                    ) : null}

                    {!loadError && items.length === 0 ? (
                        <div className="alert alert-warning mb-4" role="alert">{emptyMessage}</div>
                    ) : null}

                    <div className="row">
                        <aside className="col-12 col-lg-3 mb-4 mb-lg-0">
                            <KallesSidebarCategoryLinks activeHref={activeHref} />
                            {filters}
                        </aside>

                        <div className="col-12 col-lg-9">
                            {!loadError && items.length > 0 ? <KallesCatalogGrid items={items} total={total} /> : null}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
