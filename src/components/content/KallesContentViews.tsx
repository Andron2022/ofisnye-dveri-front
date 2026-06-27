import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import { ContentHtmlWithLightbox } from "@src/components/content/ContentHtmlWithLightbox";
import { ContentImageGallery } from "@src/components/content/ContentImageGallery";
import { ContentInfiniteGrid } from "@src/components/content/ContentInfiniteGrid";
import type { CatalogProductCard } from "@src/lib/woo/types";
import type { WpContentDetails, WpContentNavigation, WpContentPreview } from "@src/lib/wp/content";

type EmptyState = {
    title: string;
    description: string;
};

const MONTHS_RU = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
];

function parseDateParts(value: string | undefined): { day: number; month: number; year: number } | null {
    if (!value) return null;

    const compactMatch = value.trim().match(/^(\d{4})(\d{2})(\d{2})$/);
    if (compactMatch) {
        const year = Number(compactMatch[1]);
        const month = Number(compactMatch[2]);
        const day = Number(compactMatch[3]);
        if (year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31) return { day, month, year };
    }

    const isoMatch = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        const year = Number(isoMatch[1]);
        const month = Number(isoMatch[2]);
        const day = Number(isoMatch[3]);
        if (year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31) return { day, month, year };
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
}

function formatDate(value: string | undefined): string | null {
    const parts = parseDateParts(value);
    if (!parts) return null;

    return `${parts.day} ${MONTHS_RU[parts.month - 1]} ${parts.year}`;
}

function formatPrice(price: string | null): string {
    if (!price) return "Цена по запросу";

    const normalized = Number(price.replace(",", "."));
    if (Number.isNaN(normalized)) return `${price} ₽`;

    return `${new Intl.NumberFormat("ru-RU").format(normalized)} ₽`;
}

function getItemLabel(item: WpContentPreview, fallback: string): string {
    return item.label || item.terms[0]?.name || fallback;
}

function getHeroBackground(items: WpContentPreview[], fallback?: string): string | undefined {
    return fallback || items.find((item) => Boolean(item.featuredImage))?.featuredImage;
}

function KallesHero({ title, subtitle, backgroundImage }: { title: string; subtitle?: string | null; backgroundImage?: string }) {
    const style = backgroundImage
        ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
        }
        : {
            backgroundColor: "#3f3f3f",
        };

    return (
        <div style={style} className="position-relative">
            <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50" />
            <div className="px-4">
                <div className="text-white text-center py-5 position-relative">
                    <h1 className="fs-20 fw-medium text-uppercase mb-2">{title}</h1>
                    {subtitle ? <p className="fs-14 section-subtitle sub-title font-secondary fst-italic mb-0">{subtitle}</p> : null}
                </div>
            </div>
        </div>
    );
}

function EmptyArchiveState({ state }: { state: EmptyState }) {
    return (
        <div className="row justify-content-center py-5">
            <div className="col-lg-8 text-center border rounded-4 bg-white p-4 p-lg-5">
                <h2 className="h4 mb-3">{state.title}</h2>
                <p className="text-muted mb-0">{state.description}</p>
            </div>
        </div>
    );
}

function NewsArchiveCard({ item }: { item: WpContentPreview }) {
    const date = formatDate(item.date);
    const backgroundImage = item.featuredImage ? `url(${item.featuredImage})` : undefined;

    return (
        <article className="slideshow__slide h-100">
            <Link href={item.path} className="text-reset text-decoration-none d-block h-100">
                <div className="blog_grid overflow-hidden">
                    <div
                        className="blog_grid_img w-100 position-relative bg-light"
                        style={{
                            backgroundImage,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            aspectRatio: "3 / 2",
                        }}
                    />
                </div>
                <div className="my-4">
                    <p className="text-muted mb-2">
                        {date ? <>Опубликовано <span className="text-black">{date}</span></> : getItemLabel(item, "Материал")}
                    </p>
                    <h2 className="h6 text-black mb-2">{item.title}</h2>
                    {item.excerpt ? <p className="text-muted fs-14 mb-0">{item.excerpt}</p> : null}
                </div>
            </Link>
        </article>
    );
}

function PortfolioCard({ item }: { item: WpContentPreview }) {
    return (
        <article className="h-100">
            <Link href={item.path} className="d-block portfolio-img text-black text-center overflow-hidden h-100 bg-light">
                <div className="position-relative overflow-hidden" style={{ aspectRatio: "3 / 2" }}>
                    {item.featuredImage ? (
                        <img
                            src={item.featuredImage}
                            alt={item.featuredImageAlt || item.title}
                            className="img-fluid w-100 h-100 object-fit-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted fs-14">
                            Нет изображения
                        </div>
                    )}
                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                        <h3 className="h6 text-uppercase mb-2">{item.title}</h3>
                        <p className="text-muted mb-0">{getItemLabel(item, "Проект")}</p>
                    </div>
                </div>
            </Link>
        </article>
    );
}

function ProductCard({ item }: { item: CatalogProductCard }) {
    const articleLabel = item.publicArticleNo ? `Арт. ${item.publicArticleNo}` : item.sku ? `Арт. ${item.sku}` : null;

    return (
        <article className="topbar-product-card pb-3 h-100">
            <Link href={item.path} className="d-block text-reset text-decoration-none">
                <div className="position-relative overflow-hidden bg-light" style={{ aspectRatio: "3 / 2" }}>
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="img-fluid w-100 h-100 object-fit-cover" loading="lazy" />
                    ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted fs-14">
                            Нет изображения
                        </div>
                    )}
                </div>
            </Link>
            <div className="mt-3">
                {articleLabel ? <p className="text-muted fs-12 mb-1">{articleLabel}</p> : null}
                <h3 className="fs-16 mb-1">
                    <Link href={item.path} className="main_link_acid_green text-decoration-none">
                        {item.name}
                    </Link>
                </h3>
                <p className="mb-0 fs-14 text-muted">{formatPrice(item.price)}</p>
            </div>
        </article>
    );
}

function SectionTitle({ children }: { children: string }) {
    return (
        <h3 className="shop-title position-relative w-100 text-center my-4">
            <span className="bg-white px-3">{children}</span>
        </h3>
    );
}

function RelatedProductsSection({ title, emptyMessage, items }: { title: string; emptyMessage: string; items: CatalogProductCard[] }) {
    return (
        <section className="py-3">
            <SectionTitle>{title}</SectionTitle>
            {items.length > 0 ? (
                <div className="row g-4 text-start">
                    {items.map((item) => (
                        <div key={item.id} className="col-sm-6 col-lg-3">
                            <ProductCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted py-3 mb-0">{emptyMessage}</p>
            )}
        </section>
    );
}

function RelatedNewsSection({ title, emptyMessage, items }: { title: string; emptyMessage: string; items: WpContentPreview[] }) {
    return (
        <section className="py-3">
            <SectionTitle>{title}</SectionTitle>
            {items.length > 0 ? (
                <div className="row py-2 blog-arrow kalles-blog-grid pb-5 mb-4 related-slideshow">
                    {items.map((item) => (
                        <div key={item.id} className="col-md-4 col-sm-6 px-lg-2">
                            <NewsArchiveCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted py-3 mb-0">{emptyMessage}</p>
            )}
        </section>
    );
}

function RelatedPortfolioSection({ title, emptyMessage, items }: { title: string; emptyMessage: string; items: WpContentPreview[] }) {
    return (
        <section className="py-3">
            <SectionTitle>{title}</SectionTitle>
            {items.length > 0 ? (
                <div className="row py-2 blog-arrow kalles-blog-grid pb-5 mb-4 related-slideshow">
                    {items.map((item) => (
                        <div key={item.id} className="col-md-4 col-sm-6 px-lg-2 mb-4">
                            <PortfolioCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted py-3 mb-0">{emptyMessage}</p>
            )}
        </section>
    );
}

function QuoteBlock({ children, variant = "post" }: { children: string; variant?: "post" | "portfolio" }) {
    const className = variant === "post"
        ? "sub-title font-secondary lookbook-contain my-3 fst-italic px-5 position-relative gray-light mt-4 p-30"
        : "sub-title font-secondary lookbook-contain my-3 fst-italic py-4 position-relative px-5 gray-light";

    return <p className={className}>{children}</p>;
}

function ContentNavigationBlock({ navigation }: { navigation?: WpContentNavigation }) {
    if (!navigation) return null;

    return (
        <div className="py-5 tooltip-back d-flex justify-content-center align-items-center">
            {navigation.previous ? (
                <Link href={navigation.previous.path} aria-label="Предыдущая запись">
                    <i className="h1 m-0 pegk pe-7s-angle-left text-muted" data-bs-toggle="tooltip" title={navigation.previous.title}></i>
                </Link>
            ) : (
                <span className="opacity-25" aria-hidden="true">
                    <i className="h1 m-0 pegk pe-7s-angle-left text-muted"></i>
                </span>
            )}
            <Link href={navigation.archivePath} aria-label={navigation.archiveLabel}>
                <i className="pegk pe-7s-keypad text-muted mx-5 lh-1" style={{ fontSize: "40px" }} data-bs-toggle="tooltip" title={navigation.archiveLabel}></i>
            </Link>
            {navigation.next ? (
                <Link href={navigation.next.path} aria-label="Следующая запись">
                    <i className="h1 m-0 pegk pe-7s-angle-right text-muted" data-bs-toggle="tooltip" title={navigation.next.title}></i>
                </Link>
            ) : (
                <span className="opacity-25" aria-hidden="true">
                    <i className="h1 m-0 pegk pe-7s-angle-right text-muted"></i>
                </span>
            )}
        </div>
    );
}

function PortfolioFacts({ item }: { item: WpContentDetails }) {
    const facts = [
        { label: "Город", value: item.portfolio?.location },
        { label: "Клиент", value: item.portfolio?.client },
        { label: "Объём работ", value: item.portfolio?.scope },
    ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

    if (facts.length === 0) return null;

    return (
        <div className="row my-4 my-md-5 g-3">
            {facts.map((fact, index) => (
                <div key={fact.label} className={`col-md-4 text-center${index < facts.length - 1 ? " border-end" : ""}`}>
                    <h6 className="text-uppercase">{fact.label}:</h6>
                    <p className="text-muted mb-0">{fact.value}</p>
                </div>
            ))}
        </div>
    );
}

export function KallesNewsArchivePage({ items, emptyState }: { items: WpContentPreview[]; emptyState: EmptyState }) {
    return (
        <>
            <TopBanner />
            <Header />
            <KallesHero title="НОВОСТИ И СТАТЬИ" backgroundImage={getHeroBackground(items)} />

            <main id="nt_content">
                <section>
                    <div className="container">
                        {items.length > 0 ? (
                            <ContentInfiniteGrid
                                className="kalles-blog-grid my-4 g-4 row"
                                itemClassName="col-sm-6"
                                initialCount={6}
                                step={6}
                            >
                                {items.map((item) => <NewsArchiveCard key={item.id} item={item} />)}
                            </ContentInfiniteGrid>
                        ) : (
                            <EmptyArchiveState state={emptyState} />
                        )}
                    </div>
                </section>
            </main>

            <FooterPage />
        </>
    );
}

export function KallesPortfolioArchivePage({ items, emptyState }: { items: WpContentPreview[]; emptyState: EmptyState }) {
    return (
        <>
            <TopBanner />
            <Header />
            <KallesHero title="ПОРТФОЛИО" backgroundImage={getHeroBackground(items)} />

            <main id="nt_content">
                <section className="type_tab_collection pt-0 py-5">
                    <div className="container">
                        <div id="pills-tabContent" className="tab-content mt-4">
                            {items.length > 0 ? (
                                <ContentInfiniteGrid
                                    className="row g-2 g-lg-4"
                                    itemClassName="col-md-6"
                                    initialCount={6}
                                    step={6}
                                >
                                    {items.map((item) => <PortfolioCard key={item.id} item={item} />)}
                                </ContentInfiniteGrid>
                            ) : (
                                <EmptyArchiveState state={emptyState} />
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
        </>
    );
}

export function KallesNewsDetailPage({ item }: { item: WpContentDetails }) {
    const date = formatDate(item.date);
    const postQuote = item.post?.quote;
    const relatedProductsSubText = item.post?.subTextRelatedProducts;

    return (
        <>
            <TopBanner />
            <Header />
            <KallesHero title={item.title} subtitle={date} backgroundImage={item.featuredImage} />

            <main id="nt_content">
                <article>
                    <section className="py-4">
                        <div className="container">
                            <div className="mt-4 text-muted pt-3">
                                <ContentHtmlWithLightbox html={item.contentHtml} />
                                {postQuote ? <QuoteBlock>{postQuote}</QuoteBlock> : null}
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="container">
                            <div className="pb-3 pt-4">
                                <RelatedProductsSection
                                    title="Связанные товары"
                                    emptyMessage="Связанные товары не выбраны."
                                    items={item.relatedProducts}
                                />
                                {relatedProductsSubText ? <p className="text-muted my-4">{relatedProductsSubText}</p> : null}
                                <ContentNavigationBlock navigation={item.navigation} />
                                <RelatedNewsSection
                                    title="Связанные новости и статьи"
                                    emptyMessage="Связанные материалы не выбраны."
                                    items={item.relatedPosts}
                                />
                            </div>
                        </div>
                    </section>
                </article>
            </main>

            <FooterPage />
        </>
    );
}

export function KallesPortfolioDetailPage({ item }: { item: WpContentDetails }) {
    const portfolio = item.portfolio;
    const subtitle = formatDate(portfolio?.projectDate) || formatDate(item.date);
    const galleryImages = portfolio?.galleryImages ?? [];

    return (
        <>
            <TopBanner />
            <Header />
            <KallesHero title={item.title} subtitle={subtitle} backgroundImage={portfolio?.heroImage || item.featuredImage} />

            <main id="nt_content">
                <article>
                    <section className="py-4">
                        <div className="container">
                            <PortfolioFacts item={item} />
                            {item.contentHtmlWithoutImages ? (
                                <div className="mt-4 text-muted pt-4 wp-content fs-6 lh-lg" dangerouslySetInnerHTML={{ __html: item.contentHtmlWithoutImages }} />
                            ) : null}
                        </div>
                    </section>

                    <ContentImageGallery images={galleryImages} columns="three" />

                    {portfolio?.quote ? (
                        <section>
                            <div className="container">
                                <QuoteBlock variant="portfolio">{portfolio.quote}</QuoteBlock>
                            </div>
                        </section>
                    ) : null}

                    <section>
                        <div className="container">
                            <div className="pb-3 pt-4">
                                <RelatedProductsSection
                                    title="Товары из проекта"
                                    emptyMessage="Связанные товары не выбраны."
                                    items={item.relatedProducts}
                                />
                                <ContentNavigationBlock navigation={item.navigation} />
                                <RelatedPortfolioSection
                                    title="Связанные проекты"
                                    emptyMessage="Связанные проекты не выбраны."
                                    items={item.relatedProjects}
                                />
                            </div>
                        </div>
                    </section>
                </article>
            </main>

            <FooterPage />
        </>
    );
}
