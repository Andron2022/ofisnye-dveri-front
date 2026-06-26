// src/components/content/WpContentViews.tsx

import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import type { CatalogProductCard } from "@src/lib/woo/types";
import type { WpContentDetails, WpContentPreview } from "@src/lib/wp/content";

function formatDate(value: string | undefined): string | null {
    if (!value) return null;

    try {
        return new Intl.DateTimeFormat("ru-RU", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(value));
    } catch {
        return null;
    }
}

function formatPrice(price: string | null): string {
    if (!price) return "Цена по запросу";

    const normalized = Number(price.replace(",", "."));
    if (Number.isNaN(normalized)) return `${price} ₽`;

    return `${new Intl.NumberFormat("ru-RU").format(normalized)} ₽`;
}

function ContentImage({ item }: { item: Pick<WpContentPreview, "featuredImage" | "featuredImageAlt" | "title"> }) {
    if (!item.featuredImage) return null;

    return (
        <img
            src={item.featuredImage}
            alt={item.featuredImageAlt || item.title}
            className="img-fluid w-100 h-100 object-fit-cover"
            loading="lazy"
        />
    );
}

function ArchiveCard({ item, eyebrow }: { item: WpContentPreview; eyebrow: string }) {
    const date = formatDate(item.date);

    return (
        <article className="h-100 topbar-product-card border bg-white">
            <Link href={item.path} className="d-block text-reset text-decoration-none">
                <div className="ratio ratio-4x3 bg-light overflow-hidden">
                    <ContentImage item={item} />
                </div>
                <div className="p-4 text-start">
                    <p className="text-uppercase text-muted fs-12 mb-2">
                        {date ?? eyebrow}
                    </p>
                    <h2 className="h5 mb-3">{item.title}</h2>
                    {item.excerpt ? <p className="text-muted mb-0">{item.excerpt}</p> : null}
                </div>
            </Link>
        </article>
    );
}

export function WpContentArchivePage({
    eyebrow,
    title,
    description,
    emptyTitle,
    emptyDescription,
    items,
}: {
    eyebrow: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyDescription: string;
    items: WpContentPreview[];
}) {
    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <section className="py-5 bg-light border-bottom">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <p className="text-uppercase text-muted small mb-2">{eyebrow}</p>
                                <h1 className="mb-3">{title}</h1>
                                <p className="lead text-muted mb-0">{description}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        {items.length > 0 ? (
                            <div className="row g-4">
                                {items.map((item) => (
                                    <div key={item.id} className="col-md-6 col-lg-4">
                                        <ArchiveCard item={item} eyebrow={eyebrow} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="row justify-content-center">
                                <div className="col-lg-8 text-center border rounded-4 bg-white p-4 p-lg-5">
                                    <h2 className="h4 mb-3">{emptyTitle}</h2>
                                    <p className="text-muted mb-0">{emptyDescription}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <FooterPage />
        </>
    );
}

type RelatedSectionConfig = {
    title: string;
    emptyMessage: string;
};

function RelatedEmptyMessage({ message }: { message: string }) {
    return (
        <div className="border bg-light rounded-3 p-4 text-muted">
            {message}
        </div>
    );
}

function RelatedProductCard({ item }: { item: CatalogProductCard }) {
    const articleLabel = item.publicArticleNo ? `Арт. ${item.publicArticleNo}` : item.sku ? `Арт. ${item.sku}` : null;

    return (
        <article className="topbar-product-card h-100 border bg-white d-flex flex-column">
            <Link href={item.path} className="d-block text-reset text-decoration-none">
                <div className="ratio ratio-4x3 bg-light overflow-hidden">
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="img-fluid w-100 h-100 object-fit-cover" loading="lazy" />
                    ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted fs-14">
                            Нет изображения
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-3 d-flex flex-column flex-grow-1">
                {articleLabel ? <p className="text-muted fs-12 mb-2">{articleLabel}</p> : null}
                <h3 className="fs-16 lh-base mb-2">
                    <Link href={item.path} className="main_link_acid_green text-decoration-none">
                        {item.name}
                    </Link>
                </h3>
                <div className="mt-auto d-flex justify-content-between align-items-center gap-3 pt-2">
                    <span className="text-muted fs-14">{formatPrice(item.price)}</span>
                    <Link href={item.path} className="main_link_acid_green text-decoration-none fs-14 text-nowrap">
                        Подробнее
                    </Link>
                </div>
            </div>
        </article>
    );
}

function RelatedContentCard({ item }: { item: WpContentPreview }) {
    const date = formatDate(item.date);

    return (
        <article className="topbar-product-card h-100 border bg-white">
            <Link href={item.path} className="d-block text-reset text-decoration-none">
                <div className="ratio ratio-4x3 bg-light overflow-hidden">
                    <ContentImage item={item} />
                </div>
                <div className="p-3">
                    {date ? <p className="text-muted fs-12 mb-2">{date}</p> : null}
                    <h3 className="fs-16 lh-base mb-2">{item.title}</h3>
                    {item.excerpt ? <p className="text-muted fs-14 mb-0">{item.excerpt}</p> : null}
                </div>
            </Link>
        </article>
    );
}

function RelatedProductsSection({ config, items }: { config?: RelatedSectionConfig; items: CatalogProductCard[] }) {
    if (!config) return null;

    return (
        <section className="mt-5 pt-4 border-top">
            <h2 className="h4 mb-4">{config.title}</h2>
            {items.length > 0 ? (
                <div className="row g-4">
                    {items.map((item) => (
                        <div key={item.id} className="col-md-6 col-lg-4">
                            <RelatedProductCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <RelatedEmptyMessage message={config.emptyMessage} />
            )}
        </section>
    );
}

function RelatedContentSection({ config, items }: { config?: RelatedSectionConfig; items: WpContentPreview[] }) {
    if (!config) return null;

    return (
        <section className="mt-5 pt-4 border-top">
            <h2 className="h4 mb-4">{config.title}</h2>
            {items.length > 0 ? (
                <div className="row g-4">
                    {items.map((item) => (
                        <div key={item.id} className="col-md-6 col-lg-4">
                            <RelatedContentCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <RelatedEmptyMessage message={config.emptyMessage} />
            )}
        </section>
    );
}

export function WpContentDetailPage({
    item,
    eyebrow,
    backHref,
    backLabel,
    relatedProductsSection,
    relatedPostsSection,
    relatedProjectsSection,
}: {
    item: WpContentDetails;
    eyebrow: string;
    backHref: string;
    backLabel: string;
    relatedProductsSection?: RelatedSectionConfig;
    relatedPostsSection?: RelatedSectionConfig;
    relatedProjectsSection?: RelatedSectionConfig;
}) {
    const date = formatDate(item.date);

    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <article>
                    <section className="py-5 bg-light border-bottom">
                        <div className="container">
                            <div className="row justify-content-center text-center">
                                <div className="col-lg-9">
                                    <p className="text-uppercase text-muted small mb-2">{date ?? eyebrow}</p>
                                    <h1 className="mb-3">{item.title}</h1>
                                    {item.excerpt ? <p className="lead text-muted mb-0">{item.excerpt}</p> : null}
                                </div>
                            </div>
                        </div>
                    </section>

                    {item.featuredImage ? (
                        <section className="pt-5">
                            <div className="container">
                                <div className="ratio ratio-16x9 bg-light overflow-hidden rounded-4">
                                    <ContentImage item={item} />
                                </div>
                            </div>
                        </section>
                    ) : null}

                    <section className="py-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-9">
                                    <div
                                        className="wp-content fs-6 lh-lg"
                                        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                                    />

                                    <RelatedProductsSection config={relatedProductsSection} items={item.relatedProducts} />
                                    <RelatedContentSection config={relatedPostsSection} items={item.relatedPosts} />
                                    <RelatedContentSection config={relatedProjectsSection} items={item.relatedProjects} />

                                    <div className="border-top mt-5 pt-4">
                                        <Link href={backHref} className="btn btn-outline-dark rounded-0 px-4 py-3">
                                            {backLabel}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>

            <FooterPage />
        </>
    );
}
