import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import {
    getCatalogProducts,
    getDoorProductBySlug,
    resolveDoorRoute,
} from "@src/lib/woo/products";
import { parseDoorCatalogFiltersFromSearchParams } from "@src/lib/woo/catalog-filters";
import type {
    DoorCatalogAttributes,
    DoorCategoryInfo,
    DoorFamilySibling,
    DoorProductDetails,
} from "@src/lib/woo/types";
import CatalogFilters from "../CatalogFilters";
import { KallesCatalogShell } from "@src/components/storefront/KallesCatalog";
import KallesDoorProductGallery from "@src/components/storefront/KallesDoorProductGallery";
import KallesDoorProductTabs from "@src/components/storefront/KallesDoorProductTabs";
import { getDoorPdpPageSettings } from "@src/lib/wp/door-pdp-service-tabs";
import DoorProductConfigurator from "./DoorProductConfigurator";
import {
    buildBreadcrumbListJsonLd,
    buildDoorCategoryMetadata,
    buildDoorProductJsonLd,
    buildDoorProductMetadata,
    getDoorCategoryBreadcrumbItems,
    getDoorProductBreadcrumbItems,
    serializeJsonLd,
} from "@src/lib/seo/site";

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

function getDoorCategoryLead(category: DoorCategoryInfo): string {
    return category.description
        ?? `Каталог «${category.name}»: реальные товары WooCommerce, характеристики, комплектация и подбор фурнитуры под проект.`;
}

type PageParams = Promise<{ segments: string[] }>;
type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({
                                           params,
                                           searchParams,
                                       }: {
    params: PageParams;
    searchParams: PageSearchParams;
}): Promise<Metadata> {
    const { segments } = await params;
    const resolvedRoute = await resolveDoorRoute(segments);

    if (!resolvedRoute) {
        return {
            title: "Страница не найдена",
            robots: { index: false, follow: false },
        };
    }

    if (resolvedRoute.kind === "category") {
        const resolvedSearchParams = await searchParams;
        const filters = parseDoorCatalogFiltersFromSearchParams(resolvedSearchParams);

        return buildDoorCategoryMetadata(resolvedRoute.category, filters);
    }

    const product = await getDoorProductBySlug({
        slug: resolvedRoute.slug,
        wooCategorySlug: resolvedRoute.wooCategorySlug,
    });

    if (!product) {
        return {
            title: "Товар не найден",
            robots: { index: false, follow: false },
        };
    }

    return buildDoorProductMetadata(product);
}

async function DoorCategoryPage({ category, searchParams }: {
    category: DoorCategoryInfo;
    searchParams: PageSearchParams;
}) {
    const resolvedSearchParams = await searchParams;
    const filters = parseDoorCatalogFiltersFromSearchParams(resolvedSearchParams);
    const routeHref = category.path;
    let catalog: Awaited<ReturnType<typeof getCatalogProducts>> | null = null;
    let loadError: string | null = null;

    try {
        catalog = await getCatalogProducts({
            type: "doors",
            page: 1,
            perPage: 24,
            categorySlug: category.slug,
            filters,
        });
    } catch (error) {
        loadError = error instanceof Error ? error.message : "Не удалось загрузить категорию. Попробуйте обновить страницу.";
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(buildBreadcrumbListJsonLd(getDoorCategoryBreadcrumbItems(category))),
                }}
            />
            <TopBanner />
            <Header />
            <main id="nt_content">
                <KallesCatalogShell
                    title={category.name}
                    description={getDoorCategoryLead(category)}
                    heroImage={category.image}
                    total={catalog?.total}
                    activeHref={routeHref}
                    categoryTree={catalog?.categoryTree}
                    filters={catalog ? (
                        <CatalogFilters
                            filters={catalog.filters}
                            action={routeHref}
                            resetHref={routeHref}
                        />
                    ) : null}
                    items={catalog?.items ?? []}
                    loadError={loadError}
                    emptyMessage="В этой категории пока нет опубликованных товаров."
                />
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
// Поэтому переключатели ведут на соседний товар того же door_family.
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

function getColorSwatchClass(value: string): string {
    const lowerValue = value.toLowerCase();

    if (lowerValue.includes("графит") || lowerValue.includes("сер") || lowerValue.includes("grey")) return "bg-secondary bg-opacity-50";
    if (lowerValue.includes("бел") || lowerValue.includes("white")) return "bg-white";
    if (lowerValue.includes("чер") || lowerValue.includes("black")) return "bg-dark";
    if (lowerValue.includes("pink") || lowerValue.includes("роз")) return "bg_color_pink";
    if (lowerValue.includes("дерев") || lowerValue.includes("дуб") || lowerValue.includes("wood")) return "bg-warning bg-opacity-25";

    return "bg-light";
}

function VariantColorPicker({ product }: { product: DoorProductDetails }) {
    const values = getFamilyAttributeValues(product, "color");
    const currentValue = getCurrentAttributeValue(product, "color");
    if (values.length === 0) return null;

    return (
        <div className="mb-2">
            <h6 className="text-uppercase fw-bold mb-2">Color: <span>{getVariantValueLabel(currentValue)}</span></h6>
            <div className="product-color-list mt-1 gap-2 d-flex align-items-center flex-wrap">
                {values.map((value) => {
                    const exactSibling = findExactSiblingForVariant({ product, changedKey: "color", changedValue: value });
                    const isCurrentValue = value === currentValue;
                    const className = `d-inline-block rounded-circle square-xs ${getColorSwatchClass(value)} ${isCurrentValue ? "active" : ""} ${exactSibling ? "" : "opacity-50"}`;

                    if (!exactSibling) {
                        return <span key={value} className={className} title={`${value}: недоступно`} />;
                    }

                    return (
                        <Link
                            key={`${value}-${exactSibling.id}`}
                            href={exactSibling.path}
                            className={className}
                            aria-current={exactSibling.isCurrent ? "page" : undefined}
                            title={value}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function VariantRadioPicker({ product, axis }: { product: DoorProductDetails; axis: Extract<SiblingAttributeKey, "size" | "leafCount"> }) {
    const values = getFamilyAttributeValues(product, axis);
    const currentValue = getCurrentAttributeValue(product, axis);
    if (values.length === 0) return null;

    const title = axis === "size" ? "Size" : "Полотна";

    return (
        <div className="pt-1 mb-2 pb-1">
            <h6 className="text-uppercase fw-bold mt-2 mb-2">{title}: <span>{getVariantValueLabel(currentValue)}</span></h6>
            <div className="d-flex flex-wrap gap-2">
                {values.map((value) => {
                    const exactSibling = findExactSiblingForVariant({ product, changedKey: axis, changedValue: value });
                    const isCurrentValue = value === currentValue;
                    const id = `${axis}-${value}`.replace(/\s+/g, "-");

                    return (
                        <div key={`${axis}-${value}`} className="form-check me-2">
                            {exactSibling ? (
                                <Link
                                    href={exactSibling.path}
                                    className="text-decoration-none text-reset"
                                    aria-current={exactSibling.isCurrent ? "page" : undefined}
                                >
                                    <input
                                        className="form-check-input product-radio"
                                        type="radio"
                                        id={id}
                                        name={axis}
                                        checked={isCurrentValue}
                                        readOnly
                                    />
                                    <label className="form-check-label" htmlFor={id}>{value}</label>
                                </Link>
                            ) : (
                                <>
                                    <input className="form-check-input product-radio" type="radio" id={id} name={axis} disabled />
                                    <label className="form-check-label text-muted" htmlFor={id}>{value}</label>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function KallesSummaryVariantSelectors({ product }: { product: DoorProductDetails }) {
    if (!product.family.code || product.family.siblings.length === 0) return null;

    return (
        <div className="mb-3">
            <VariantColorPicker product={product} />
            <VariantRadioPicker product={product} axis="size" />
            <VariantRadioPicker product={product} axis="leafCount" />
        </div>
    );
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

function DoorFamilyTechnicalMatrix({ product }: { product: DoorProductDetails }) {
    if (!product.family.code || product.family.siblings.length <= 1) return null;

    return (
        <section className="py-4">
            <div className="container">
                <details className="border rounded-3 p-3 bg-white">
                    <summary className="fw-medium">Техническая проверка вариантов двери</summary>
                    <div className="small text-muted mt-2 mb-3">Этот блок временно оставлен для проверки sibling-логики simple products.</div>
                    <CurrentFamilyCombination product={product} />
                    <div className="mt-3">
                        {VARIANT_AXES.map((axis) => (
                            <VariantMatrixRow key={axis.key} axis={axis} product={product} />
                        ))}
                    </div>
                    <div className="small text-muted border-top pt-3 mt-3">
                        Серые варианты сейчас недоступны для выбранной комбинации характеристик.
                    </div>
                </details>
            </div>
        </section>
    );
}

function DoorFamilyCardsSection({ product }: { product: DoorProductDetails }) {
    const siblings = getSortedFamilySiblings(product);
    if (!product.family.code || siblings.length === 0) return null;

    return (
        <section className="py-5 bg-white">
            <div className="container">
                <h2 className="fs-4 text-center mb-4">Другие варианты этой коллекции</h2>
                <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5">
                    {siblings.map((sibling) => (
                        <div key={sibling.id} className="col">
                            <article className={`topbar-product-card h-100 ${sibling.isCurrent ? "border border-dark p-2" : ""}`}>
                                <Link href={sibling.path} className="d-block bg-light text-decoration-none text-reset overflow-hidden">
                                    <div className="d-flex align-items-center justify-content-center" style={{ aspectRatio: "3 / 2" }}>
                                        {sibling.image ? (
                                            <img src={sibling.image} alt={sibling.name} className="w-100 h-100 object-fit-cover" />
                                        ) : (
                                            <span className="text-muted small">Нет фото</span>
                                        )}
                                    </div>
                                </Link>
                                <div className="pt-3">
                                    <h3 className="fs-6 mb-2 fw-medium">
                                        <Link href={sibling.path} className="main_link_acid_green text-decoration-none">{sibling.name}</Link>
                                    </h3>
                                    <div className="small text-muted mb-2">{getVariantValueLabel(getSiblingAttributeValue(sibling, "color"))} · {getVariantValueLabel(getSiblingAttributeValue(sibling, "size"))} · {getVariantValueLabel(getSiblingAttributeValue(sibling, "leafCount"))}</div>
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                        <span className="fw-medium">{formatPrice(sibling.price)}</span>
                                        {sibling.isCurrent ? <span className="badge text-bg-dark">Открыто</span> : null}
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductMetaLinks() {
    return (
        <div className="mt-3 d-flex gap-3 text-nowrap flex-wrap row-gap-1">
            <Link className="text-black fw-semibold" href="/klientam/zamery">Замер</Link>
            <Link className="text-black fw-semibold mx-2" href="/klientam/dostavka">Доставка</Link>
            <Link className="text-black fw-semibold" href="/klientam/ustanovka">Установка</Link>
            <Link className="text-black fw-semibold mx-2" href="/kontakty">Задать вопрос</Link>
        </div>
    );
}

const PRODUCT_META_ATTRIBUTE_ROWS: Array<{
    key: Exclude<keyof DoorCatalogAttributes, "color" | "size" | "leafCount">;
    label: string;
}> = [
    { key: "material", label: "Материал" },
    { key: "glazing", label: "Остекление" },
    { key: "openingType", label: "Тип открывания" },
    // { key: "purpose", label: "Назначение" },
    { key: "openingDirection", label: "Направление открывания" },
    { key: "fireResistance", label: "Огнестойкость" },
    { key: "glazingType", label: "Тип остекления" },
];

function ProductMetaBlock({ product }: { product: DoorProductDetails }) {
    return (
        <div className="mt-3 small">
            {product.publicArticleNo ? <p className="mb-1"><span>Арт.:</span><span className="text-muted"> {product.publicArticleNo}</span></p> : null}
            <p className="mb-1"><span>Наличие:</span><span className="text-muted"> {product.stockStatus === "instock" ? "в наличии" : product.stockStatus || "уточняется"}</span></p>
            {product.categories.length > 0 ? (
                <p className="mb-1">
                    <span>Категории:</span>
                    <span className="text-muted"> {product.categories.map((category, index) => (
                        <span key={category.id}>{category.name}{index < product.categories.length - 1 ? ", " : ""}</span>
                    ))}</span>
                </p>
            ) : null}
            {PRODUCT_META_ATTRIBUTE_ROWS.map(({ key, label }) => {
                const values = product.attributes[key];
                if (!values || values.length === 0) return null;

                return (
                    <p key={key} className="mb-1">
                        <span>{label}:</span>
                        <span className="text-muted"> {values.join(", ")}</span>
                    </p>
                );
            })}
        </div>
    );
}

async function DoorProductPage({ product }: { product: DoorProductDetails }) {
    const breadcrumbs = getDoorProductBreadcrumbItems(product);
    const doorPdpSettings = await getDoorPdpPageSettings();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(buildBreadcrumbListJsonLd(getDoorProductBreadcrumbItems(product))),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(buildDoorProductJsonLd(product)),
                }}
            />
            <TopBanner />
            <Header />
            <main id="nt_content">
                <section className="bg-light border-bottom py-3">
                    <div className="container">
                        <nav className="small d-flex flex-wrap align-items-center gap-2">
                            {breadcrumbs.map((item, index) => {
                                const isLast = index === breadcrumbs.length - 1;

                                return (
                                    <span key={`${item.path}-${index}`} className="d-inline-flex align-items-center gap-2">
                                        {isLast ? (
                                            <span className="text-muted">{item.name}</span>
                                        ) : (
                                            <Link href={item.path} className="text-decoration-none">{item.name}</Link>
                                        )}
                                        {!isLast ? <span className="text-muted">/</span> : null}
                                    </span>
                                );
                            })}
                        </nav>
                    </div>
                </section>

                <section className="py-4">
                    <div className="container">
                        <div className="row py-3 gx-xl-5 gy-4 align-items-start">
                            <div className="col-12 col-lg-6">
                                <KallesDoorProductGallery
                                    productName={product.name}
                                    fallbackImage={product.image}
                                    images={product.gallery}
                                />
                            </div>

                            <div className="col-12 col-lg-6">
                                <h1 className="fs-3 fw-semibold mb-2">{product.name}</h1>

                                <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
                                    <strong className="fs-2 fw-semibold">{formatPrice(product.price)}</strong>
                                    {product.regularPrice && product.salePrice && product.regularPrice !== product.salePrice ? (
                                        <span className="text-muted text-decoration-line-through fs-5">{formatPrice(product.regularPrice)}</span>
                                    ) : null}
                                </div>

                                {product.shortDescriptionHtml ? (
                                    <div className="text-muted mb-3" dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }} />
                                ) : (
                                    <p className="text-muted mb-3">Подберите вариант двери, комплектацию и фурнитуру. Доставка и установка уточняются менеджером после отправки заказа.</p>
                                )}

                                <KallesSummaryVariantSelectors product={product} />
                                <ProductMetaLinks />
                                <ProductMetaBlock product={product} />

                                <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
                                    <a href="#door-configurator" className="btn btn-info text-white rounded-pill px-5 flex-grow-1">Выбрать комплектацию</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {doorPdpSettings.showFamilyTechnicalMatrix ? <DoorFamilyTechnicalMatrix product={product} /> : null}
                <DoorProductConfigurator product={product} />
                <KallesDoorProductTabs
                    descriptionHtml={product.descriptionHtml}
                    attributes={product.attributes}
                    serviceTabs={doorPdpSettings.serviceTabs}
                />
                <DoorFamilyCardsSection product={product} />
            </main>
            <FooterPage />
        </>
    );
}

export default async function InteriorDoorsSegmentsPage({
                                                            params,
                                                            searchParams,
                                                        }: {
    params: PageParams;
    searchParams: PageSearchParams;
}) {
    const { segments } = await params;
    const resolvedRoute = await resolveDoorRoute(segments);

    if (!resolvedRoute) notFound();

    if (resolvedRoute.kind === "category") {
        return (
            <DoorCategoryPage
                category={resolvedRoute.category}
                searchParams={searchParams}
            />
        );
    }

    const product = await getDoorProductBySlug({ slug: resolvedRoute.slug, wooCategorySlug: resolvedRoute.wooCategorySlug });
    if (!product) notFound();

    return <DoorProductPage product={product} />;
}
