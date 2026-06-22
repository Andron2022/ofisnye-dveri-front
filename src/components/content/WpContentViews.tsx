// src/components/content/WpContentViews.tsx

import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
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

export function WpContentDetailPage({
    item,
    eyebrow,
    backHref,
    backLabel,
}: {
    item: WpContentDetails;
    eyebrow: string;
    backHref: string;
    backLabel: string;
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
