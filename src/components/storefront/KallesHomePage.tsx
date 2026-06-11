import Link from "next/link";
import type { StaticImageData } from "next/image";
import { homePageContent } from "@src/lib/home/homepage-content";
import type { CatalogProductCard } from "@src/lib/woo/types";

import heroPrimaryImage from "@assets/images/home-bags/main-slide-01.jpg";
import heroSecondaryImage from "@assets/images/home-bags/main-slide-02.jpg";
import categoryDoorsImage from "@assets/images/home-video-banner/cat-01.jpg";
import categoryHiddenImage from "@assets/images/home-video-banner/cat-02.jpg";
import categoryFireproofImage from "@assets/images/home-video-banner/cat-03.jpg";
import blogImage1 from "@assets/images/blog/blog-01.jpg";
import blogImage2 from "@assets/images/blog/blog-02.jpg";
import blogImage3 from "@assets/images/blog/blog-03.jpg";

type KallesHomePageProps = {
    featuredDoors: CatalogProductCard[];
    productsLoadError?: string | null;
};

type HomeCategoryCard = {
    id: string;
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
    badge?: string;
    image: StaticImageData;
    variant: "large" | "small";
};

type HomeArticleCard = {
    id: string;
    title: string;
    description: string;
    href: string;
    image: StaticImageData;
    meta: string;
};

const categoryImagesById: Record<string, StaticImageData> = {
    "interior-doors": categoryDoorsImage,
    "hidden-doors": categoryHiddenImage,
    "fireproof-doors": categoryFireproofImage,
};

const fallbackArticles: HomeArticleCard[] = [
    {
        id: "measurements",
        title: "Как подготовиться к замеру дверного проёма",
        description: "Что важно проверить до подбора двери, коробки, фурнитуры и услуги установки.",
        href: "/novosti-i-stati",
        image: blogImage1,
        meta: "Полезное · замеры",
    },
    {
        id: "hidden-doors",
        title: "Когда выбирать скрытые двери для офиса",
        description: "Коротко о сценариях, где скрытый монтаж помогает сохранить чистую геометрию интерьера.",
        href: "/novosti-i-stati",
        image: blogImage2,
        meta: "Каталог · скрытые двери",
    },
    {
        id: "fireproof-doors",
        title: "Противопожарные двери: что уточнить перед заказом",
        description: "Огнестойкость, назначение помещения, комплектация и согласование условий поставки.",
        href: "/novosti-i-stati",
        image: blogImage3,
        meta: "Каталог · безопасность",
    },
];

function formatPrice(price: string | null): string {
    if (!price) return "Цена по запросу";

    const normalized = Number(price.replace(",", "."));
    if (Number.isNaN(normalized)) return `${price} ₽`;

    return `${new Intl.NumberFormat("ru-RU").format(normalized)} ₽`;
}

function getPublicArticleLabel(item: CatalogProductCard): string | null {
    if (item.publicArticleNo) return `Арт. ${item.publicArticleNo}`;
    if (item.sku) return `Арт. ${item.sku}`;
    return null;
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="text-center mb-4 pb-2">
                    <p className="text-uppercase text-muted fs-12 mb-2">{eyebrow}</p>
                    <h2 className="section-title position-relative flex text-uppercase mb-2">
                        <span style={{ whiteSpace: "nowrap" }}>{title}</span>
                    </h2>
                    {subtitle ? (
                        <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">
                            {subtitle}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function KallesHomeHero() {
    const { hero } = homePageContent;

    return (
        <section className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-bags">
            <div className="slideshow">
                <div className="slideshow__slide position-relative" style={{ minHeight: 620 }}>
                    <img
                        src={heroPrimaryImage.src}
                        alt="Межкомнатные двери для офисов и общественных пространств"
                        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25" />
                    <div className="container position-relative h-100">
                        <div className="row justify-content-end align-items-center" style={{ minHeight: 620 }}>
                            <div className="col-lg-6">
                                <div className="content text-lg-end text-white py-5">
                                    <h5 className="text-white fs-18 fw-medium text-uppercase">{hero.eyebrow}</h5>
                                    <h1 className="display-4 fw-bold text-white mb-3">{hero.title}</h1>
                                    <p className="fs-18 text-white mb-4">{hero.description}</p>
                                    <div className="d-flex flex-column flex-sm-row justify-content-lg-end gap-3">
                                        <Link
                                            href={hero.primaryCta.href}
                                            className="btn text-white btn-custom-white-red btn_icon_true fw-medium min-w-150 rounded-0 py-3 px-5 text-uppercase fs-16"
                                        >
                                            {hero.primaryCta.label}
                                        </Link>
                                        <Link
                                            href={hero.secondaryCta.href}
                                            className="btn btn-outline-light rounded-0 py-3 px-5 text-uppercase fs-16"
                                        >
                                            {hero.secondaryCta.label}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function KallesCategoryTile({ card }: { card: HomeCategoryCard }) {
    const minHeight = card.variant === "large" ? 620 : 300;

    return (
        <Link href={card.href} className="d-block position-relative cat_grid_item overflow-hidden h-100 text-decoration-none">
            <div
                className="h-100 w-100 cat-grid-img"
                style={{ backgroundImage: `url(${card.image.src})`, minHeight }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25" />
            <div className="cat-grid-button text-body">
                <div className="cat_grid_item__title">{card.title}</div>
            </div>
            <div className="position-absolute start-0 bottom-0 p-4 text-white" style={{ maxWidth: 460 }}>
                {card.badge ? <span className="badge bg-white text-dark mb-2">{card.badge}</span> : null}
                <p className="mb-3 fs-14 text-white-50">{card.description}</p>
                <span className="text-uppercase fs-13 fw-semibold text-white">{card.ctaLabel}</span>
            </div>
        </Link>
    );
}

function KallesCategoriesSection() {
    const cards: HomeCategoryCard[] = homePageContent.productDirections.map((item, index) => ({
        ...item,
        image: categoryImagesById[item.id] ?? categoryDoorsImage,
        variant: index === 0 ? "large" : "small",
    }));

    const [primaryCard, ...secondaryCards] = cards;

    return (
        <section className="cat-section">
            <div className="container">
                <SectionTitle
                    eyebrow="Продукция"
                    title="Основные направления"
                    subtitle="Двери доступны к заказу через каталог. Стеновые панели рассчитываются отдельно под проект."
                />

                <div className="row g-lg-4 g-2">
                    {primaryCard ? (
                        <div className="col-md-6">
                            <KallesCategoryTile card={primaryCard} />
                        </div>
                    ) : null}

                    <div className="col-md-6">
                        <div className="row gy-lg-4 gy-2">
                            {secondaryCards.map((card) => (
                                <div key={card.id} className="col-lg-12">
                                    <KallesCategoryTile card={card} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HomeProductCard({ item }: { item: CatalogProductCard }) {
    const articleLabel = getPublicArticleLabel(item);

    return (
        <article className="topbar-product-card pb-3 h-100 d-flex flex-column text-start">
            <Link href={item.path} className="position-relative overflow-hidden d-block bg-light text-decoration-none text-reset">
                <div className="d-flex align-items-center justify-content-center bg-light" style={{ aspectRatio: "4 / 3" }}>
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="img-fluid w-100 h-100 object-fit-cover" />
                    ) : (
                        <span className="text-muted fs-14">Нет изображения</span>
                    )}
                </div>
                <div className="product-button d-none d-lg-flex flex-column gap-2 align-items-center" style={{ width: "100%" }}>
                    <span className="btn rounded-pill fs-14" style={{ width: "50%", minWidth: 150 }}>
                        <span>Выбрать</span>
                        <i className="iccl iccl-eye" />
                    </span>
                </div>
            </Link>

            <div className="mt-3 d-flex flex-column flex-grow-1">
                {articleLabel ? <span className="fs-12 text-muted mb-1">{articleLabel}</span> : null}
                <h3 className="mb-1 fw-medium fs-16 lh-base">
                    <Link href={item.path} className="main_link_acid_green text-decoration-none">
                        {item.name}
                    </Link>
                </h3>
                <p className="mb-0 fs-15 text-muted mt-auto">{formatPrice(item.price)}</p>
            </div>
        </article>
    );
}

function KallesFeaturedDoorsSection({ items, loadError }: { items: CatalogProductCard[]; loadError?: string | null }) {
    return (
        <section className="kalles-furnitur-featured-collection position-relative py-5">
            <div className="container">
                <SectionTitle
                    eyebrow="Каталог дверей"
                    title="Популярные позиции"
                    subtitle="Свежие товары из Woo-каталога: реальные цены, фото и ссылки на карточки товара."
                />

                {loadError ? (
                    <div className="alert alert-warning" role="alert">
                        Не удалось загрузить товары для главной: {loadError}
                    </div>
                ) : null}

                {!loadError && items.length === 0 ? (
                    <div className="alert alert-light border" role="alert">
                        Товары скоро появятся на главной. Сейчас каталог доступен в разделе дверей.
                    </div>
                ) : null}

                {items.length > 0 ? (
                    <div className="row g-4 text-center">
                        {items.map((item) => (
                            <div key={item.id} className="col-sm-6 col-lg-3">
                                <HomeProductCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : null}

                <div className="text-center mt-4">
                    <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-pill px-5 py-3 text-uppercase fs-14">
                        Смотреть весь каталог
                    </Link>
                </div>
            </div>
        </section>
    );
}

function KallesProcessSection() {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <SectionTitle
                    eyebrow="Сценарий заказа"
                    title="От выбора двери до подтверждения заказа"
                    subtitle="Покупатель собирает комплектацию онлайн, а менеджер подтверждает доставку, установку и финальные условия."
                />

                <div className="row g-4">
                    {homePageContent.processSteps.map((step, index) => (
                        <div key={step.id} className="col-md-6 col-xl-3">
                            <div className="h-100 bg-white p-4 text-center border">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 bg-dark text-white"
                                    style={{ width: 46, height: 46 }}
                                >
                                    {index + 1}
                                </div>
                                <h3 className="h6 text-uppercase mb-2">{step.title}</h3>
                                <p className="text-muted small mb-0">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function KallesServiceStrip() {
    const iconClasses = ["pegk pe-7s-ribbon", "pegk pe-7s-tools", "pegk pe-7s-car", "pegk pe-7s-help2"];

    return (
        <section className="kalles-section-type-shipping">
            <div className="container">
                <div className="row g-4">
                    {homePageContent.serviceLinks.map((service, index) => (
                        <div key={service.id} className="col-xl-3 col-md-6">
                            <Link href={service.href} className="d-flex gap-3 text-reset text-decoration-none h-100">
                                <i className={`${iconClasses[index] ?? "pegk pe-7s-info"} fs-36 text-muted flex-shrink-0`} />
                                <div className="flex-grow-1">
                                    <h3 className="h6 text-uppercase">{service.title}</h3>
                                    <p className="text-muted mb-0">{service.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function KallesPanelNoticeSection() {
    const { panelNotice } = homePageContent;

    return (
        <section className="py-5">
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <div
                            className="position-relative overflow-hidden bg-light"
                            style={{ minHeight: 360, backgroundImage: `url(${heroSecondaryImage.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        >
                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="p-lg-5">
                            <p className="text-uppercase text-muted fs-12 mb-2">Проектный расчёт</p>
                            <h2 className="mb-3">{panelNotice.title}</h2>
                            <p className="text-muted mb-4">{panelNotice.description}</p>
                            <Link href={panelNotice.href} className="btn btn-outline-dark rounded-pill px-5 py-3 text-uppercase fs-14">
                                {panelNotice.ctaLabel}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function KallesArticlesSection() {
    return (
        <section className="kalles-section_type_featured_blog latest-blogs py-5">
            <div className="container">
                <SectionTitle
                    eyebrow="Новости и статьи"
                    title="Полезные материалы"
                    subtitle="Блок подготовлен под будущий WP-driven контент. Сейчас он ведёт в общий раздел статей."
                />

                <div className="row g-4 blog-arrow kalles-blog-grid">
                    {fallbackArticles.map((item) => (
                        <div key={item.id} className="col-md-4 px-2 slideshow__slide">
                            <Link href={item.href} className="blog-card d-block blog-wrap text-decoration-none text-reset">
                                <div className="blog_grid overflow-hidden">
                                    <div
                                        className="blog_grid_img w-100 position-relative"
                                        style={{ background: `url(${item.image.src}) center no-repeat`, backgroundSize: "cover", height: 254 }}
                                    />
                                </div>
                                <p className="text-muted fs-13 mt-3 mb-1">{item.meta}</p>
                                <h3 className="fs-16 mt-1 main_link">{item.title}</h3>
                                <div className="post-content text-muted mt-3">{item.description}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function KallesHomePage({ featuredDoors, productsLoadError }: KallesHomePageProps) {
    return (
        <>
            <KallesHomeHero />
            <KallesCategoriesSection />
            <KallesFeaturedDoorsSection items={featuredDoors} loadError={productsLoadError} />
            <KallesProcessSection />
            <KallesPanelNoticeSection />
            <KallesArticlesSection />
            <KallesServiceStrip />
        </>
    );
}
