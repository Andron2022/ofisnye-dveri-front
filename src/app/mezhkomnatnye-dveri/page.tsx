import type { Metadata } from "next";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import {
    getCatalogProducts,
    getDoorRootCategoryInfo,
    getDoorSeoLandingLinksForCategory,
    getDoorSeoRoutingDescriptorsForCategory,
    resolvePreferredDoorCatalogRoute,
} from "@src/lib/woo/products";
import {
    hasActiveCatalogFilters,
    parseDoorCatalogFiltersFromSearchParams,
} from "@src/lib/woo/catalog-filters";
import CatalogFilters from "./CatalogFilters";
import { KallesCatalogShell } from "@src/components/storefront/KallesCatalog";
import {
    buildBreadcrumbListJsonLd,
    buildDoorCategoryMetadata,
    getDoorCategoryBreadcrumbItems,
    serializeJsonLd,
} from "@src/lib/seo/site";

const ROOT_PATH = "/mezhkomnatnye-dveri";

type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ searchParams }: { searchParams: PageSearchParams }): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const filters = parseDoorCatalogFiltersFromSearchParams(resolvedSearchParams);

    if (!hasActiveCatalogFilters(filters)) {
        return buildDoorCategoryMetadata(undefined, filters);
    }

    try {
        const rootCategory = await getDoorRootCategoryInfo();
        const preferredRoute = await resolvePreferredDoorCatalogRoute(rootCategory, filters);
        return buildDoorCategoryMetadata(rootCategory, filters, preferredRoute.canonicalPath);
    } catch (error) {
        console.error("Failed to resolve root door category canonical", error);
        return buildDoorCategoryMetadata(undefined, filters);
    }
}

export default async function DoorsCatalogPage({ searchParams }: { searchParams: PageSearchParams }) {
    const resolvedSearchParams = await searchParams;
    const filters = parseDoorCatalogFiltersFromSearchParams(resolvedSearchParams);
    let catalog: Awaited<ReturnType<typeof getCatalogProducts>> | null = null;
    let seoLinks: Array<{ href: string; label: string }> = [];
    let routingLandings: Awaited<ReturnType<typeof getDoorSeoRoutingDescriptorsForCategory>> = [];
    let loadError: string | null = null;

    try {
        catalog = await getCatalogProducts({
            type: "doors",
            page: 1,
            perPage: 24,
            categorySlug: "mezhkomnatnye-dveri",
            filters,
        });

        if (catalog.currentCategory) {
            [seoLinks, routingLandings] = await Promise.all([
                getDoorSeoLandingLinksForCategory(catalog.currentCategory.id),
                getDoorSeoRoutingDescriptorsForCategory(catalog.currentCategory.id),
            ]);
        }
    } catch (error) {
        loadError =
            error instanceof Error
                ? error.message
                : "Не удалось загрузить каталог. Попробуйте обновить страницу.";
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(buildBreadcrumbListJsonLd(getDoorCategoryBreadcrumbItems())),
                }}
            />
            <TopBanner />
            <Header />

            <main id="nt_content">
                <KallesCatalogShell
                    title={catalog?.currentCategory?.name ?? "Межкомнатные двери"}
                    description={catalog?.currentCategory?.description ?? "Подберите дверь по размеру, цвету, материалу, типу открывания и другим характеристикам. После выбора можно настроить комплектацию и добавить фурнитуру."}
                    heroImage={catalog?.currentCategory?.image}
                    total={catalog?.total}
                    activeHref={ROOT_PATH}
                    categoryTree={catalog?.categoryTree}
                    filters={catalog?.currentCategory ? (
                        <CatalogFilters
                            filters={catalog.filters}
                            categoryId={catalog.currentCategory.id}
                            categoryPath={catalog.currentCategory.path}
                            landings={routingLandings}
                        />
                    ) : null}
                    items={catalog?.items ?? []}
                    loadError={loadError}
                    emptyMessage="В этом разделе пока нет опубликованных товаров."
                    seoLinks={seoLinks}
                />
            </main>

            <FooterPage />
        </>
    );
}
