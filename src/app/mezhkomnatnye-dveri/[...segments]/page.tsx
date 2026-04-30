import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import {
    getCatalogProducts,
    getDoorCategoryLabelByRouteCategory,
    getDoorProductBySlug,
    getDoorTypeLabel,
    resolveDoorRoute,
} from "@src/lib/woo/products";
import type {
    CatalogProductCard,
    DoorCatalogAttributes,
    DoorProductDetails,
} from "@src/lib/woo/types";

// -----------------------------------------------------
// Форматирование цены.
// Оставляем локально в файле, чтобы не раздувать helper-слой раньше времени.
// -----------------------------------------------------

function formatPrice(price: string | null): string {
    if (!price) {
        return "Цена по запросу";
    }
    
    const normalized = Number(price.replace(",", "."));
    
    if (Number.isNaN(normalized)) {
        return `${price} ₽`;
    }
    
    return `${new Intl.NumberFormat("ru-RU").format(normalized)} ₽`;
}

// -----------------------------------------------------
// Подготовка строкового значения атрибута
// -----------------------------------------------------

function joinAttributeValues(values?: string[]): string {
    if (!values || values.length === 0) {
        return "—";
    }
    
    return values.join(", ");
}

// -----------------------------------------------------
// Строка характеристики
// -----------------------------------------------------

function ProductSpecRow({
                            label,
                            value,
                        }: {
    label: string;
    value?: string[];
}) {
    return (
        <li className="d-flex justify-content-between gap-3 py-2 border-bottom small">
            <span className="text-muted">{label}</span>
            <span className="text-end">{joinAttributeValues(value)}</span>
        </li>
    );
}

function OptionalProductSpecRow({
                                    label,
                                    value,
                                }: {
    label: string;
    value?: string[];
}) {
    if (!value || value.length === 0) {
        return null;
    }
    
    return <ProductSpecRow label={label} value={value} />;
}

// -----------------------------------------------------
// Общий блок списка характеристик двери.
// Используем и в карточках категорий, и на PDP.
// -----------------------------------------------------

function DoorAttributesList({
                                attributes,
                            }: {
    attributes: DoorCatalogAttributes;
}) {
    return (
        <ul className="list-unstyled mb-0">
            <ProductSpecRow label="Цвет" value={attributes.color} />
            <ProductSpecRow label="Размер" value={attributes.size} />
            <ProductSpecRow label="Полотна" value={attributes.leafCount} />
            <ProductSpecRow label="Материал" value={attributes.material} />
            <ProductSpecRow label="Остекление" value={attributes.glazing} />
            <ProductSpecRow label="Открывание" value={attributes.openingType} />
            <OptionalProductSpecRow label="Назначение" value={attributes.purpose} />
            <OptionalProductSpecRow
                label="Направление"
                value={attributes.openingDirection}
            />
            <OptionalProductSpecRow
                label="Огнестойкость"
                value={attributes.fireResistance}
            />
            <OptionalProductSpecRow
                label="Тип остекления"
                value={attributes.glazingType}
            />
        </ul>
    );
}

// -----------------------------------------------------
// Карточка товара внутри страницы категории.
// -----------------------------------------------------

function CategoryCatalogCard({ item }: { item: CatalogProductCard }) {
    return (
        <article className="topbar-product-card h-100 border rounded-3 p-3 bg-white d-flex flex-column">
            <Link href={item.path} className="text-decoration-none text-reset">
                <div className="mb-3">
                    <div
                        className="rounded-3 overflow-hidden bg-light d-flex align-items-center justify-content-center"
                        style={{ aspectRatio: "4 / 3" }}
                    >
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-100 h-100 object-fit-cover"
                            />
                        ) : (
                            <div className="text-muted small">Нет изображения</div>
                        )}
                    </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span className="badge text-bg-light">
                        {getDoorTypeLabel(item.categorySlugs)}
                    </span>
                    
                    {item.publicArticleNo ? (
                        <span className="badge text-bg-secondary">
                            Арт. UI {item.publicArticleNo}
                        </span>
                    ) : null}
                </div>
                
                <h2 className="fs-5 mb-2">{item.name}</h2>
                
                <div className="small text-muted mb-3">
                    <div>SKU: {item.sku || "—"}</div>
                    <div>Slug: {item.slug}</div>
                </div>
                
                <DoorAttributesList attributes={item.attributes} />
            </Link>
            
            <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center gap-3">
                <strong className="fs-5">{formatPrice(item.price)}</strong>
                
                <Link href={item.path} className="small text-decoration-none">
                    Открыть карточку
                </Link>
            </div>
        </article>
    );
}

// -----------------------------------------------------
// Серверная страница категории внутри /mezhkomnatnye-dveri/[...segments]
// -----------------------------------------------------

async function DoorCategoryPage({
                                    wooCategorySlug,
                                    routeCategory,
                                }: {
    wooCategorySlug: string;
    routeCategory: "skrytye" | "protivopozharnye";
}) {
    let catalog: Awaited<ReturnType<typeof getCatalogProducts>> | null = null;
    let loadError: string | null = null;
    
    try {
        catalog = await getCatalogProducts({
            type: "doors",
            page: 1,
            perPage: 24,
            categorySlug: wooCategorySlug,
        });
    } catch (error) {
        loadError =
            error instanceof Error
                ? error.message
                : "Не удалось загрузить категорию из WooCommerce";
    }
    
    return (
        <>
            <TopBanner />
            <Header />
            
            <main id="nt_content">
                <section className="py-4 py-lg-5">
                    <div className="container">
                        <nav className="small mb-3">
                            <Link href="/mezhkomnatnye-dveri">Межкомнатные двери</Link>
                            <span className="mx-2 text-muted">/</span>
                            <span className="text-muted">
                                {getDoorCategoryLabelByRouteCategory(routeCategory)}
                            </span>
                        </nav>
                        
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
                            <div>
                                <p className="text-uppercase text-muted mb-2">
                                    Универсальный маршрут категории
                                </p>
                                <h1 className="mb-0">
                                    {getDoorCategoryLabelByRouteCategory(routeCategory)}
                                </h1>
                            </div>
                            
                            {catalog ? (
                                <div className="text-muted">
                                    Найдено товаров: {catalog.total}
                                </div>
                            ) : null}
                        </div>
                        
                        {loadError ? (
                            <div className="alert alert-danger" role="alert">
                                <strong>Ошибка загрузки категории.</strong>
                                <div className="mt-2 small">{loadError}</div>
                            </div>
                        ) : null}
                        
                        {!loadError && catalog && catalog.items.length === 0 ? (
                            <div className="alert alert-warning" role="alert">
                                В этой категории пока нет опубликованных товаров.
                            </div>
                        ) : null}
                        
                        {!loadError && catalog && catalog.items.length > 0 ? (
                            <div className="row g-4">
                                {catalog.items.map((item) => (
                                    <div key={item.id} className="col-12 col-sm-6 col-xl-4">
                                        <CategoryCatalogCard item={item} />
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </section>
            </main>
            
            <FooterPage />
        </>
    );
}

// -----------------------------------------------------
// Серверная карточка товара двери.
// На этом шаге это сознательно простой живой PDP,
// а не адаптация тяжёлой demo-страницы Kalles.
// -----------------------------------------------------

function DoorProductPage({ product }: { product: DoorProductDetails }) {
    return (
        <>
            <TopBanner />
            <Header />
            
            <main id="nt_content">
                <section className="py-4 py-lg-5">
                    <div className="container">
                        <nav className="small mb-3">
                            <Link href="/mezhkomnatnye-dveri">Межкомнатные двери</Link>
                            <span className="mx-2 text-muted">/</span>
                            <span className="text-muted">{product.name}</span>
                        </nav>
                        
                        <div className="row g-4 g-lg-5 align-items-start">
                            <div className="col-12 col-lg-6">
                                <div className="border rounded-3 overflow-hidden bg-light mb-3">
                                    {product.image ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-100 h-100 object-fit-cover"
                                        />
                                    ) : (
                                        <div
                                            className="d-flex align-items-center justify-content-center text-muted"
                                            style={{ minHeight: 360 }}
                                        >
                                            Нет изображения
                                        </div>
                                    )}
                                </div>
                                
                                {product.gallery.length > 1 ? (
                                    <div className="row g-2">
                                        {product.gallery.map((image) => (
                                            <div key={image.id} className="col-4 col-md-3">
                                                <div className="border rounded-3 overflow-hidden bg-light">
                                                    <img
                                                        src={image.src}
                                                        alt={image.alt || image.name || product.name}
                                                        className="w-100 h-100 object-fit-cover"
                                                        style={{ aspectRatio: "1 / 1" }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                            
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    <span className="badge text-bg-light">
                                        {getDoorTypeLabel(product.categorySlugs)}
                                    </span>
                                    
                                    {product.publicArticleNo ? (
                                        <span className="badge text-bg-secondary">
                                            Арт. UI {product.publicArticleNo}
                                        </span>
                                    ) : null}
                                </div>
                                
                                <h1 className="mb-3">{product.name}</h1>
                                
                                <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
                                    <strong className="fs-3">{formatPrice(product.price)}</strong>
                                    
                                    {product.regularPrice &&
                                    product.salePrice &&
                                    product.regularPrice !== product.salePrice ? (
                                        <span className="text-muted text-decoration-line-through">
                                            {formatPrice(product.regularPrice)}
                                        </span>
                                    ) : null}
                                </div>
                                
                                <div className="small text-muted mb-4">
                                    <div>SKU: {product.sku || "—"}</div>
                                    <div>Slug: {product.slug}</div>
                                    <div>Статус наличия: {product.stockStatus || "—"}</div>
                                </div>
                                
                                {product.shortDescriptionHtml ? (
                                    <div
                                        className="mb-4"
                                        dangerouslySetInnerHTML={{
                                            __html: product.shortDescriptionHtml,
                                        }}
                                    />
                                ) : null}
                                
                                <div className="border rounded-3 p-3 mb-4">
                                    <h2 className="fs-5 mb-3">Характеристики</h2>
                                    <DoorAttributesList attributes={product.attributes} />
                                </div>
                                
                                {product.categories.length > 0 ? (
                                    <div className="mb-4">
                                        <h2 className="fs-6 text-uppercase text-muted mb-2">
                                            Категории Woo
                                        </h2>
                                        <div className="d-flex flex-wrap gap-2">
                                            {product.categories.map((category) => (
                                                <span key={category.id} className="badge text-bg-light">
                                                    {category.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        
                        {product.descriptionHtml ? (
                            <div className="mt-5 border-top pt-4">
                                <h2 className="fs-4 mb-3">Описание</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.descriptionHtml,
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                </section>
            </main>
            
            <FooterPage />
        </>
    );
}

// -----------------------------------------------------
// Главный entry point универсального маршрута.
// -----------------------------------------------------

export default async function InteriorDoorsSegmentsPage({
                                                            params,
                                                        }: {
    params: Promise<{ segments: string[] }>;
}) {
    // В Next 15 params у dynamic route асинхронный.
    // Сначала дожидаемся его, потом читаем segments.
    const { segments } = await params;
    
    const resolvedRoute = resolveDoorRoute(segments);
    
    if (!resolvedRoute) {
        notFound();
    }
    
    if (resolvedRoute.kind === "category") {
        return (
            <DoorCategoryPage
                wooCategorySlug={resolvedRoute.wooCategorySlug}
                routeCategory={resolvedRoute.routeCategory}
            />
        );
    }
    
    const product = await getDoorProductBySlug({
        slug: resolvedRoute.slug,
        routeCategory: resolvedRoute.routeCategory,
    });
    
    if (!product) {
        notFound();
    }
    
    return <DoorProductPage product={product} />;
}