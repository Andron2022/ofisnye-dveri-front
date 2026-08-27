import Link from "next/link";
import shopBanner from "@assets/images/shop/shop-banner.jpg";
import type { ReactNode } from "react";
import type { CatalogProductCard, DoorCategoryNode } from "@src/lib/woo/types";
import KallesCatalogGrid from "@src/components/storefront/KallesCatalogGrid";

export type KallesCatalogCategoryLink = {
    href: string;
    label: string;
    children?: KallesCatalogCategoryLink[];
};

type KallesCatalogShellProps = {
    eyebrow?: string | null;
    title: string;
    description: string;
    heroImage?: string | null;
    total?: number;
    activeHref: string;
    categoryTree?: DoorCategoryNode;
    filters: ReactNode;
    items: CatalogProductCard[];
    loadError?: string | null;
    emptyMessage: string;
    seoLinks?: Array<{ href: string; label: string }>;
    afterContent?: ReactNode;
};

const FALLBACK_DOOR_CATEGORY_TREE: DoorCategoryNode = {
    id: 0,
    name: "Межкомнатные двери",
    slug: "mezhkomnatnye-dveri",
    routeSlug: "",
    path: "/mezhkomnatnye-dveri",
    description: null,
    image: null,
    count: 0,
    seo: {},
    children: [],
};

function mapCategoryNodeToLink(node: DoorCategoryNode): KallesCatalogCategoryLink {
    return {
        href: node.path,
        label: node.name,
        children: node.children.map(mapCategoryNodeToLink),
    };
}

function getTopCatalogLinks(categoryTree: DoorCategoryNode): KallesCatalogCategoryLink[] {
    return [
        mapCategoryNodeToLink({ ...categoryTree, children: [] }),
        ...categoryTree.children.map((child) => mapCategoryNodeToLink({ ...child, children: [] })),
    ];
}

function KallesCatalogNav({ activeHref, categoryTree }: { activeHref: string; categoryTree: DoorCategoryNode }) {
    const links = getTopCatalogLinks(categoryTree);

    return (
        <div className="d-none d-lg-block navbar navbar-expand-lg py-1 border-top">
            <ul className="list-unstyled navbar-nav justify-content-center w-100 mb-0">
                {links.map((item) => {
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

function KallesCatalogHero({ eyebrow, title, description, heroImage }: {
    eyebrow?: string | null;
    title: string;
    description: string;
    heroImage?: string | null;
}) {
    const backgroundImage = heroImage || shopBanner.src;

    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: "center", backgroundSize: "cover" }}
            className="position-relative"
        >
            <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50" />
            <div className="container">
                <div className="text-white text-center py-5 position-relative">
                    {eyebrow ? <p className="text-uppercase fs-14 fw-medium mb-2">{eyebrow}</p> : null}
                    <h1 className="fs-20 fw-medium mb-2">{title}</h1>
                    <p className="fs-14 mb-0 mx-auto" style={{ maxWidth: 760 }}>{description}</p>
                </div>
            </div>
        </div>
    );
}

function KallesSidebarCategoryLink({ item, activeHref }: {
    item: KallesCatalogCategoryLink;
    activeHref: string;
}) {
    const isActive = item.href === activeHref;
    const children = item.children ?? [];
    const hasActiveChild = children.some((child) => activeHref === child.href || activeHref.startsWith(`${child.href}/`));

    if (children.length === 0) {
        return (
            <li>
                <Link
                    href={item.href}
                    className={`nav-link py-1 px-0 fs-14 ${isActive ? "text-teal" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                >
                    {item.label}
                </Link>
            </li>
        );
    }

    return (
        <li className="nav-item">
            <details open={isActive || hasActiveChild || item.href === "/mezhkomnatnye-dveri"}>
                <summary className="d-flex align-items-center justify-content-between mb-2" style={{ cursor: "pointer" }}>
                    <Link
                        href={item.href}
                        className={`nav-link p-0 ${isActive ? "text-teal" : ""}`}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                    <span className="ms-2 fs-16 text-muted">+</span>
                </summary>

                <ul className="list-unstyled mb-0 ps-3">
                    {children.map((child) => (
                        <KallesSidebarCategoryLink key={child.href} item={child} activeHref={activeHref} />
                    ))}
                </ul>
            </details>
        </li>
    );
}

function KallesSidebarCategoryLinks({ activeHref, categoryTree }: { activeHref: string; categoryTree: DoorCategoryNode }) {
    const rootLink = mapCategoryNodeToLink(categoryTree);

    return (
        <div>
            <h5 className="mb-2 mt-3">Разделы каталога</h5>
            <div className="filter-title mb-4" />

            <ul className="list-unstyled mb-4 navbar-nav justify-content-center">
                <KallesSidebarCategoryLink item={rootLink} activeHref={activeHref} />
            </ul>
        </div>
    );
}

function KallesSeoLandingLinks({ links }: { links: Array<{ href: string; label: string }> }) {
    if (links.length === 0) return null;

    return (
        <div className="mb-4">
            <h5 className="mb-2 mt-3">Популярные подборки</h5>
            <div className="filter-title mb-3" />
            <ul className="list-unstyled mb-0">
                {links.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="nav-link py-1 px-0 fs-14">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function KallesCatalogShell({
                                       eyebrow,
                                       title,
                                       description,
                                       heroImage,
                                       total,
                                       activeHref,
                                       categoryTree = FALLBACK_DOOR_CATEGORY_TREE,
                                       filters,
                                       items,
                                       loadError,
                                       emptyMessage,
                                       seoLinks = [],
                                       afterContent,
                                   }: KallesCatalogShellProps) {
    return (
        <>
            <KallesCatalogNav activeHref={activeHref} categoryTree={categoryTree} />
            <KallesCatalogHero eyebrow={eyebrow} title={title} description={description} heroImage={heroImage} />

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
                            <KallesSidebarCategoryLinks activeHref={activeHref} categoryTree={categoryTree} />
                            {filters}
                            <KallesSeoLandingLinks links={seoLinks} />
                        </aside>

                        <div className="col-12 col-lg-9">
                            {!loadError && items.length > 0 ? <KallesCatalogGrid items={items} total={total} /> : null}
                            {afterContent}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
