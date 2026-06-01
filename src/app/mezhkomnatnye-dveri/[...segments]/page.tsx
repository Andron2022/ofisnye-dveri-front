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
    DoorFamilySibling,
    DoorProductDetails,
} from "@src/lib/woo/types";
import DoorProductConfigurator from "./DoorProductConfigurator";

function formatPrice(price: string | null): string {
    if (!price) return "Цена по запросу";
    const normalized = Number(price.replace(",", "."));
    if (Number.isNaN(normalized)) return `${price} ₽`;
    return `${new Intl.NumberFormat("ru-RU").format(normalized)} ₽`;
}

function joinAttributeValues(values?: string[]): string {
    if (!values || values.length === 0) return "—";
    return values.join(", ");
}

function firstAttributeValue(values?: string[]): string | null {
    return values?.[0] ?? null;
}

function ProductSpecRow({ label, value }: { label: string; value?: string[] }) {
    return (
        <li className="d-flex justify-content-between gap-3 py-2 border-bottom small">
            <span className="text-muted">{label}</span>
            <span className="text-end">{joinAttributeValues(value)}</span>
        </li>
    );
}

function OptionalProductSpecRow({ label, value }: { label: string; value?: string[] }) {
    if (!value || value.length === 0) return null;
    return <ProductSpecRow label={label} value={value} />;
}

function DoorAttributesList({ attributes }: { attributes: DoorCatalogAttributes }) {
    return (
        <ul className="list-unstyled mb-0">
            <ProductSpecRow label="Цвет" value={attributes.color} />
            <ProductSpecRow label="Размер" value={attributes.size} />
            <ProductSpecRow label="Полотна" value={attributes.leafCount} />
            <ProductSpecRow label="Материал" value={attributes.material} />
            <ProductSpecRow label="Остекление" value={attributes.glazing} />
            <ProductSpecRow label="Открывание" value={attributes.openingType} />
            <OptionalProductSpecRow label="Назначение" value={attributes.purpose} />
            <OptionalProductSpecRow label="Направление" value={attributes.openingDirection} />
            <OptionalProductSpecRow label="Огнестойкость" value={attributes.fireResistance} />
            <OptionalProductSpecRow label="Тип остекления" value={attributes.glazingType} />
        </ul>
    );
}

function CategoryCatalogCard({ item }: { item: CatalogProductCard }) {
    return (
        <article className="topbar-product-card h-100 border rounded-3 p-3 bg-white d-flex flex-column">
            <Link href={item.path} className="text-decoration-none text-reset">
                <div className="mb-3">
                    <div className="rounded-3 overflow-hidden bg-light d-flex align-items-center justify-content-center" style={{ aspectRatio: "4 / 3" }}>
                        {item.image ? (
                            <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover" />
                        ) : (
                            <div className="text-muted small">Нет изображения</div>
                        )}
                    </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span className="badge text-bg-light">{getDoorTypeLabel(item.categorySlugs)}</span>
                    {item.publicArticleNo ? <span className="badge text-bg-secondary">Арт. UI {item.publicArticleNo}</span> : null}
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
                <Link href={item.path} className="small text-decoration-none">Открыть карточку</Link>
            </div>
        </article>
    );
}

async function DoorCategoryPage({ wooCategorySlug, routeCategory }: {
    wooCategorySlug: string;
    routeCategory: "skrytye" | "protivopozharnye";
}) {
    let catalog: Awaited<ReturnType<typeof getCatalogProducts>> | null = null;
    let loadError: string | null = null;
    
    try {
        catalog = await getCatalogProducts({ type: "doors", page: 1, perPage: 24, categorySlug: wooCategorySlug });
    } catch (error) {
        loadError = error instanceof Error ? error.message : "Не удалось загрузить категорию из WooCommerce";
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
                            <span className="text-muted">{getDoorCategoryLabelByRouteCategory(routeCategory)}</span>
                        </nav>
                        
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
                            <div>
                                <p className="text-uppercase text-muted mb-2">Универсальный маршрут категории</p>
                                <h1 className="mb-0">{getDoorCategoryLabelByRouteCategory(routeCategory)}</h1>
                            </div>
                            {catalog ? <div className="text-muted">Найдено товаров: {catalog.total}</div> : null}
                        </div>
                        
                        {loadError ? (
                            <div className="alert alert-danger" role="alert">
                                <strong>Ошибка загрузки категории.</strong>
                                <div className="mt-2 small">{loadError}</div>
                            </div>
                        ) : null}
                        
                        {!loadError && catalog && catalog.items.length === 0 ? (
                            <div className="alert alert-warning" role="alert">В этой категории пока нет опубликованных товаров.</div>
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
// Sibling UI: матрица вариантов семейства.
//
// Важно: у нас НЕ variable products Woo.
// Каждый SEO-значимый вариант двери — отдельный simple product.
// Поэтому переключатель не меняет атрибуты текущего товара на месте,
// а ведёт на соседний товар того же door_family.
//
// Логика матрицы:
// - показываем все значения, которые вообще есть в family;
// - для каждого значения ищем точную комбинацию:
//   выбранное значение по текущей оси + остальные значения как у текущего товара;
// - если такой simple product есть — даём ссылку;
// - если такой simple product не создан — показываем disabled.
// -----------------------------------------------------

type SiblingAttributeKey = "color" | "size" | "leafCount";

type VariantAxisConfig = {
    key: SiblingAttributeKey;
    title: string;
    shortTitle: string;
};

const VARIANT_AXES: VariantAxisConfig[] = [
    { key: "color", title: "Цвет", shortTitle: "Цвет" },
    { key: "size", title: "Размер", shortTitle: "Размер" },
    { key: "leafCount", title: "Количество полотен", shortTitle: "Полотна" },
];

const variantValueCollator = new Intl.Collator("ru", {
    numeric: true,
    sensitivity: "base",
});

function getSiblingAttributeValue(sibling: DoorFamilySibling, key: SiblingAttributeKey): string | null {
    return firstAttributeValue(sibling.attributes[key]);
}

function getCurrentAttributeValue(product: DoorProductDetails, key: SiblingAttributeKey): string | null {
    return firstAttributeValue(product.attributes[key]);
}

function getVariantValueLabel(value: string | null): string {
    return value || "—";
}

function getFamilyAttributeValues(product: DoorProductDetails, key: SiblingAttributeKey): string[] {
    const values = new Set<string>();

    for (const sibling of product.family.siblings) {
        const value = getSiblingAttributeValue(sibling, key);
        if (value) values.add(value);
    }

    const currentValue = getCurrentAttributeValue(product, key);
    if (currentValue) values.add(currentValue);

    return Array.from(values).sort((a, b) => variantValueCollator.compare(a, b));
}

function siblingMatchesExactCombination({
                                            sibling,
                                            product,
                                            changedKey,
                                            changedValue,
                                        }: {
    sibling: DoorFamilySibling;
    product: DoorProductDetails;
    changedKey: SiblingAttributeKey;
    changedValue: string;
}): boolean {
    return VARIANT_AXES.every(({ key }) => {
        const siblingValue = getSiblingAttributeValue(sibling, key);

        if (key === changedKey) {
            return siblingValue === changedValue;
        }

        return siblingValue === getCurrentAttributeValue(product, key);
    });
}

function findExactSiblingForVariant({
                                        product,
                                        changedKey,
                                        changedValue,
                                    }: {
    product: DoorProductDetails;
    changedKey: SiblingAttributeKey;
    changedValue: string;
}): DoorFamilySibling | null {
    return product.family.siblings.find((sibling) => siblingMatchesExactCombination({
        sibling,
        product,
        changedKey,
        changedValue,
    })) ?? null;
}

function getSortedFamilySiblings(product: DoorProductDetails): DoorFamilySibling[] {
    return [...product.family.siblings].sort((a, b) => {
        for (const { key } of VARIANT_AXES) {
            const result = variantValueCollator.compare(
                getVariantValueLabel(getSiblingAttributeValue(a, key)),
                getVariantValueLabel(getSiblingAttributeValue(b, key)),
            );

            if (result !== 0) return result;
        }

        return variantValueCollator.compare(a.name, b.name);
    });
}

function VariantMatrixRow({ axis, product }: {
    axis: VariantAxisConfig;
    product: DoorProductDetails;
}) {
    const values = getFamilyAttributeValues(product, axis.key);
    if (values.length === 0) return null;

    const currentValue = getCurrentAttributeValue(product, axis.key);

    return (
        <div className="mb-3">
            <div className="d-flex justify-content-between gap-3 mb-2">
                <h3 className="fs-6 text-muted mb-0">{axis.title}</h3>
                <span className="small text-muted">Текущее: {getVariantValueLabel(currentValue)}</span>
            </div>

            <div className="d-flex flex-wrap gap-2">
                {values.map((value) => {
                    const exactSibling = findExactSiblingForVariant({
                        product,
                        changedKey: axis.key,
                        changedValue: value,
                    });
                    const isCurrentValue = value === currentValue;
                    const label = getVariantValueLabel(value);

                    if (!exactSibling) {
                        return (
                            <button
                                key={`${axis.key}-${value}`}
                                type="button"
                                className="btn btn-sm btn-outline-secondary rounded-pill opacity-50"
                                disabled
                                title="Такой точной комплектации в этом семействе нет"
                            >
                                {label}
                                <span className="ms-2 small">недоступно</span>
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={`${axis.key}-${value}-${exactSibling.id}`}
                            href={exactSibling.path}
                            className={`btn btn-sm rounded-pill ${isCurrentValue ? "btn-dark" : "btn-outline-dark"}`}
                            aria-current={exactSibling.isCurrent ? "page" : undefined}
                            title={exactSibling.name}
                        >
                            {label}
                            {isCurrentValue ? <span className="ms-2 small">текущий</span> : null}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function CurrentFamilyCombination({ product }: { product: DoorProductDetails }) {
    return (
        <div className="small text-muted">
            Текущая комбинация: {VARIANT_AXES.map(({ key, shortTitle }) => (
                `${shortTitle}: ${getVariantValueLabel(getCurrentAttributeValue(product, key))}`
            )).join(" / ")}
        </div>
    );
}

function AllFamilyConfigurations({ product }: { product: DoorProductDetails }) {
    const siblings = getSortedFamilySiblings(product);
    if (siblings.length === 0) return null;

    return (
        <div className="border rounded-3 p-3 mb-4 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
                <div>
                    <h2 className="fs-5 mb-1">Все комплектации</h2>
                    <div className="small text-muted">Полный список simple products внутри семейства.</div>
                </div>
                <div className="small text-muted">Всего: {siblings.length}</div>
            </div>

            <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                    <thead>
                    <tr>
                        <th scope="col">Товар</th>
                        <th scope="col">Цвет</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Полотна</th>
                        <th scope="col">Цена</th>
                        <th scope="col" className="text-end">Переход</th>
                    </tr>
                    </thead>
                    <tbody>
                    {siblings.map((sibling) => (
                        <tr key={sibling.id} className={sibling.isCurrent ? "table-active" : undefined}>
                            <td>
                                <div className="fw-medium">{sibling.name}</div>
                                <div className="small text-muted">SKU: {sibling.sku || "—"}</div>
                            </td>
                            <td>{getVariantValueLabel(getSiblingAttributeValue(sibling, "color"))}</td>
                            <td>{getVariantValueLabel(getSiblingAttributeValue(sibling, "size"))}</td>
                            <td>{getVariantValueLabel(getSiblingAttributeValue(sibling, "leafCount"))}</td>
                            <td>{formatPrice(sibling.price)}</td>
                            <td className="text-end">
                                {sibling.isCurrent ? (
                                    <span className="badge text-bg-dark">Открыто</span>
                                ) : (
                                    <Link href={sibling.path} className="btn btn-sm btn-outline-dark rounded-pill">
                                        Открыть
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function DoorFamilyVariants({ product }: { product: DoorProductDetails }) {
    if (!product.family.code || product.family.siblings.length <= 1) return null;

    return (
        <>
            <div className="border rounded-3 p-3 mb-4 bg-white">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
                    <div>
                        <h2 className="fs-5 mb-1">Матрица вариантов</h2>
                        <div className="small text-muted">Семейство: {product.family.code}</div>
                    </div>
                    <div className="small text-muted">Найдено вариантов: {product.family.siblings.length}</div>
                </div>

                <CurrentFamilyCombination product={product} />
                <div className="mt-3">
                    {VARIANT_AXES.map((axis) => (
                        <VariantMatrixRow key={axis.key} axis={axis} product={product} />
                    ))}
                </div>

                <div className="small text-muted border-top pt-3 mt-3">
                    Серые варианты — это значения, которые есть в семействе, но не образуют точную комплектацию с текущими выбранными характеристиками.
                </div>
            </div>

            <AllFamilyConfigurations product={product} />
        </>
    );
}

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
                                        <img src={product.image} alt={product.name} className="w-100 h-100 object-fit-cover" />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center text-muted" style={{ minHeight: 360 }}>Нет изображения</div>
                                    )}
                                </div>
                                
                                {product.gallery.length > 1 ? (
                                    <div className="row g-2">
                                        {product.gallery.map((image) => (
                                            <div key={image.id} className="col-4 col-md-3">
                                                <div className="border rounded-3 overflow-hidden bg-light">
                                                    <img src={image.src} alt={image.alt || image.name || product.name} className="w-100 h-100 object-fit-cover" style={{ aspectRatio: "1 / 1" }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                            
                            <div className="col-12 col-lg-6">
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    <span className="badge text-bg-light">{getDoorTypeLabel(product.categorySlugs)}</span>
                                    {product.publicArticleNo ? <span className="badge text-bg-secondary">Арт. UI {product.publicArticleNo}</span> : null}
                                </div>
                                
                                <h1 className="mb-3">{product.name}</h1>
                                <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
                                    <strong className="fs-3">{formatPrice(product.price)}</strong>
                                    {product.regularPrice && product.salePrice && product.regularPrice !== product.salePrice ? (
                                        <span className="text-muted text-decoration-line-through">{formatPrice(product.regularPrice)}</span>
                                    ) : null}
                                </div>
                                
                                <div className="small text-muted mb-4">
                                    <div>SKU: {product.sku || "—"}</div>
                                    <div>Slug: {product.slug}</div>
                                    <div>Статус наличия: {product.stockStatus || "—"}</div>
                                </div>
                                
                                {product.shortDescriptionHtml ? <div className="mb-4" dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }} /> : null}
                                <DoorFamilyVariants product={product} />
                                
                                <div className="border rounded-3 p-3 mb-4">
                                    <h2 className="fs-5 mb-3">Характеристики</h2>
                                    <DoorAttributesList attributes={product.attributes} />
                                </div>
                                
                                {product.categories.length > 0 ? (
                                    <div className="mb-4">
                                        <h2 className="fs-6 text-uppercase text-muted mb-2">Категории Woo</h2>
                                        <div className="d-flex flex-wrap gap-2">
                                            {product.categories.map((category) => <span key={category.id} className="badge text-bg-light">{category.name}</span>)}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        
                        <DoorProductConfigurator product={product} />
                        
                        {product.descriptionHtml ? (
                            <div className="mt-5 border-top pt-4">
                                <h2 className="fs-4 mb-3">Описание</h2>
                                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                            </div>
                        ) : null}
                    </div>
                </section>
            </main>
            <FooterPage />
        </>
    );
}

export default async function InteriorDoorsSegmentsPage({ params }: { params: Promise<{ segments: string[] }> }) {
    const { segments } = await params;
    const resolvedRoute = resolveDoorRoute(segments);
    
    if (!resolvedRoute) notFound();
    
    if (resolvedRoute.kind === "category") {
        return <DoorCategoryPage wooCategorySlug={resolvedRoute.wooCategorySlug} routeCategory={resolvedRoute.routeCategory} />;
    }
    
    const product = await getDoorProductBySlug({ slug: resolvedRoute.slug, routeCategory: resolvedRoute.routeCategory });
    if (!product) notFound();
    
    return <DoorProductPage product={product} />;
}
