import Link from "next/link";
import KallesHomeHeroSlider from "@src/components/storefront/KallesHomeHeroSlider";
import type { HomeCategoryCard, HomePageContent } from "@src/lib/home/homepage-content";
import type { CatalogProductCard } from "@src/lib/woo/types";
import type { WpContentPreview } from "@src/lib/wp/content";

type KallesHomePageProps = {
  content: HomePageContent;
  featuredProducts: CatalogProductCard[];
  posts: WpContentPreview[];
  productsLoadError?: string | null;
  postsLoadError?: string | null;
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

function formatPrice(price: string | null): string {
  if (!price) return "Цена по запросу";

  const normalized = Number(price.replace(",", "."));
  if (Number.isNaN(normalized)) return `${price} ₽`;

  return `${new Intl.NumberFormat("ru-RU").format(normalized)} ₽`;
}

function formatDate(value: string | undefined): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return `${date.getDate()} ${MONTHS_RU[date.getMonth()]} ${date.getFullYear()}`;
}

function getPublicArticleLabel(item: CatalogProductCard): string | null {
  if (item.publicArticleNo) return `Арт. ${item.publicArticleNo}`;
  if (item.sku) return `Арт. ${item.sku}`;
  return null;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="text-center mb-4 pb-2">
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

function KallesHomeHero({ content }: { content: HomePageContent["hero"] }) {
  if (!content.enabled || content.slides.length === 0) return null;

  return <KallesHomeHeroSlider slides={content.slides} />;
}

function KallesCategoryTile({ card, variant }: { card: HomeCategoryCard; variant: "large" | "small" }) {
  const minHeight = variant === "large" ? 620 : 300;

  return (
    <Link href={card.href} className="d-block position-relative cat_grid_item overflow-hidden h-100 text-decoration-none">
      {card.image ? (
        <div
          className="h-100 w-100 cat-grid-img"
          style={{ backgroundImage: `url(${card.image.src})`, minHeight }}
          role="img"
          aria-label={card.image.alt || card.title}
        />
      ) : (
        <div className="h-100 w-100 cat-grid-img bg-light" style={{ minHeight }} />
      )}
      <div className="cat-grid-button text-body">
        <div className="cat_grid_item__title">{card.title}</div>
      </div>
    </Link>
  );
}

function KallesCategoriesSection({ content }: { content: HomePageContent["categories"] }) {
  if (!content.enabled || (!content.bigCard && content.smallCards.length === 0)) return null;

  return (
    <section className="cat-section">
      <div className="container">
        <div className="row g-lg-4 g-2">
          {content.bigCard ? (
            <div className="col-md-6">
              <KallesCategoryTile card={content.bigCard} variant="large" />
            </div>
          ) : null}

          {content.smallCards.length > 0 ? (
            <div className="col-md-6">
              <div className="row gy-lg-4 gy-2">
                {content.smallCards.map((card) => (
                  <div key={card.id} className="col-lg-12">
                    <KallesCategoryTile card={card} variant="small" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
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
            <img src={item.image} alt={item.name} className="img-fluid w-100 h-100 object-fit-cover" loading="lazy" />
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

function KallesFeaturedProductsSection({
  content,
  items,
  loadError,
}: {
  content: HomePageContent["featuredProducts"];
  items: CatalogProductCard[];
  loadError?: string | null;
}) {
  if (!content.enabled) return null;

  return (
    <section className="kalles-furnitur-featured-collection position-relative py-5">
      <div className="container">
        <SectionTitle title={content.title} />

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

        {content.buttonLabel && content.buttonHref ? (
          <div className="text-center mt-4">
            <Link href={content.buttonHref} className="btn btn-dark rounded-pill px-5 py-3 text-uppercase fs-14">
              {content.buttonLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function KallesProcessSection({ content }: { content: HomePageContent["process"] }) {
  if (!content.enabled || content.steps.length === 0) return null;

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <SectionTitle title={content.title} subtitle={content.subtitle} />

        <div className="row g-4">
          {content.steps.map((step, index) => (
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

function KallesOneCategorySection({ content }: { content: HomePageContent["oneCategory"] }) {
  if (!content.enabled) return null;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            {content.image ? (
              <div
                className="position-relative overflow-hidden bg-light"
                style={{
                  minHeight: 360,
                  backgroundImage: `url(${content.image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                role="img"
                aria-label={content.image.alt || content.title}
              >
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25" />
              </div>
            ) : (
              <div className="position-relative overflow-hidden bg-light" style={{ minHeight: 360 }} />
            )}
          </div>
          <div className="col-lg-6">
            <div className="p-lg-5">
              <h2 className="mb-3">{content.title}</h2>
              <p className="text-muted mb-4">{content.description}</p>
              {content.buttonLabel && content.buttonHref ? (
                <Link href={content.buttonHref} className="btn btn-outline-dark rounded-pill px-5 py-3 text-uppercase fs-14">
                  {content.buttonLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KallesArticlesSection({
  content,
  items,
  loadError,
}: {
  content: HomePageContent["posts"];
  items: WpContentPreview[];
  loadError?: string | null;
}) {
  if (!content.enabled) return null;

  return (
    <section className="kalles-section_type_featured_blog latest-blogs py-5">
      <div className="container">
        <SectionTitle title={content.title} />

        {loadError ? (
          <div className="alert alert-warning" role="alert">
            Не удалось загрузить материалы для главной: {loadError}
          </div>
        ) : null}

        {!loadError && items.length === 0 ? (
          <div className="alert alert-light border" role="alert">
            Полезные материалы скоро появятся на главной.
          </div>
        ) : null}

        {items.length > 0 ? (
          <div className="row g-4 blog-arrow kalles-blog-grid">
            {items.map((item) => {
              const date = formatDate(item.date);

              return (
                <div key={item.id} className="col-md-4 px-2 slideshow__slide">
                  <Link href={item.path} className="blog-card d-block blog-wrap text-decoration-none text-reset">
                    <div className="blog_grid overflow-hidden">
                      {item.featuredImage ? (
                        <div
                          className="blog_grid_img w-100 position-relative"
                          style={{
                            background: `url(${item.featuredImage}) center no-repeat`,
                            backgroundSize: "cover",
                            height: 254,
                          }}
                          role="img"
                          aria-label={item.featuredImageAlt || item.title}
                        />
                      ) : (
                        <div className="blog_grid_img w-100 position-relative bg-light" style={{ height: 254 }} />
                      )}
                    </div>
                    <p className="text-muted fs-13 mt-3 mb-1">
                      {date ? <>Опубликовано <span className="text-black">{date}</span></> : item.terms[0]?.name || "Материал"}
                    </p>
                    <h3 className="fs-16 mt-1 main_link">{item.title}</h3>
                    {item.excerpt ? <div className="post-content text-muted mt-3">{item.excerpt}</div> : null}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function KallesServiceStrip({ content }: { content: HomePageContent["services"] }) {
  if (!content.enabled || content.items.length === 0) return null;

  return (
    <section className="kalles-section-type-shipping">
      <div className="container">
        <div className="row g-4">
          {content.items.map((service) => (
            <div key={service.id} className="col-xl-3 col-md-6">
              <Link href={service.href} className="d-flex gap-3 text-reset text-decoration-none h-100">
                <i className={`${service.iconClass} fs-36 text-muted flex-shrink-0`} />
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

export default function KallesHomePage({
  content,
  featuredProducts,
  posts,
  productsLoadError,
  postsLoadError,
}: KallesHomePageProps) {
  return (
    <>
      <KallesHomeHero content={content.hero} />
      <KallesCategoriesSection content={content.categories} />
      <KallesFeaturedProductsSection
        content={content.featuredProducts}
        items={featuredProducts}
        loadError={productsLoadError}
      />
      <KallesProcessSection content={content.process} />
      <KallesOneCategorySection content={content.oneCategory} />
      <KallesArticlesSection content={content.posts} items={posts} loadError={postsLoadError} />
      <KallesServiceStrip content={content.services} />
    </>
  );
}
