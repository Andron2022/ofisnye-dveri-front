import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import {
    getCatalogProducts,
    getDoorTypeLabel,
} from "@src/lib/woo/products";
import type { CatalogProductCard } from "@src/lib/woo/types";

// -----------------------------------------------------
// Форматирование цены
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
// Строка характеристики в карточке
// -----------------------------------------------------

function ProductSpecRow({
                            label,
                            value,
                        }: {
    label: string;
    value?: string[];
}) {
    return (
        <li className="d-flex justify-content-between gap-3 py-1 border-bottom small">
            <span className="text-muted">{label}</span>
            <span className="text-end">{joinAttributeValues(value)}</span>
        </li>
    );
}

// -----------------------------------------------------
// Условная строка характеристики.
// Нужна, чтобы не показывать пустые строки там,
// где атрибут не применим.
// -----------------------------------------------------

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
// Карточка товара каталога.
// Теперь она уже ведёт в реальную карточку товара.
// -----------------------------------------------------

function CatalogCard({ item }: { item: CatalogProductCard }) {
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
                
                <ul className="list-unstyled mb-3">
                    <ProductSpecRow label="Цвет" value={item.attributes.color} />
                    <ProductSpecRow label="Размер" value={item.attributes.size} />
                    <ProductSpecRow label="Полотна" value={item.attributes.leafCount} />
                    <ProductSpecRow label="Материал" value={item.attributes.material} />
                    <ProductSpecRow label="Остекление" value={item.attributes.glazing} />
                    <ProductSpecRow label="Открывание" value={item.attributes.openingType} />
                    
                    <OptionalProductSpecRow
                        label="Назначение"
                        value={item.attributes.purpose}
                    />
                    
                    <OptionalProductSpecRow
                        label="Направление"
                        value={item.attributes.openingDirection}
                    />
                    
                    <OptionalProductSpecRow
                        label="Огнестойкость"
                        value={item.attributes.fireResistance}
                    />
                    
                    <OptionalProductSpecRow
                        label="Тип остекления"
                        value={item.attributes.glazingType}
                    />
                </ul>
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
// Главная серверная страница каталога
// -----------------------------------------------------

export default async function InteriorDoorsPage() {
    let catalog: Awaited<ReturnType<typeof getCatalogProducts>> | null = null;
    let loadError: string | null = null;
    
    try {
        catalog = await getCatalogProducts({
            type: "doors",
            page: 1,
            perPage: 24,
        });
    } catch (error) {
        loadError =
            error instanceof Error
                ? error.message
                : "Не удалось загрузить каталог из WooCommerce";
    }
    
    return (
        <>
            <TopBanner />
            <Header />
            
            <main id="nt_content">
                <section className="py-4 py-lg-5">
                    <div className="container">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
                            <div>
                                <p className="text-uppercase text-muted mb-2">
                                    Живой каталог из WooCommerce
                                </p>
                                <h1 className="mb-0">Межкомнатные двери</h1>
                            </div>
                            
                            {catalog ? (
                                <div className="text-muted">
                                    Найдено товаров: {catalog.total}
                                </div>
                            ) : null}
                        </div>
                        
                        <div className="alert alert-light border mb-4">
                            Теперь каталог уже не тупиковый: карточки ведут в реальные URL
                            товаров, а универсальный маршрут /mezhkomnatnye-dveri/[...segments]
                            будет разбирать категории и PDP.
                        </div>
                        
                        {loadError ? (
                            <div className="alert alert-danger" role="alert">
                                <strong>Ошибка загрузки каталога.</strong>
                                <div className="mt-2 small">{loadError}</div>
                            </div>
                        ) : null}
                        
                        {!loadError && catalog && catalog.items.length === 0 ? (
                            <div className="alert alert-warning" role="alert">
                                В категории <code>mezhkomnatnye-dveri</code> пока нет опубликованных товаров.
                            </div>
                        ) : null}
                        
                        {!loadError && catalog && catalog.items.length > 0 ? (
                            <div className="row g-4">
                                {catalog.items.map((item) => (
                                    <div key={item.id} className="col-12 col-sm-6 col-xl-4">
                                        <CatalogCard item={item} />
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
