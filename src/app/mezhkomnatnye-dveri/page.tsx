import type { Metadata } from "next";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import { getCatalogProducts } from "@src/lib/woo/products";
import { parseDoorCatalogFiltersFromSearchParams } from "@src/lib/woo/catalog-filters";
import CatalogFilters from "./CatalogFilters";
import { KallesCatalogShell } from "@src/components/storefront/KallesCatalog";
import {
    buildBreadcrumbListJsonLd,
    buildDoorCategoryMetadata,
    getDoorCategoryBreadcrumbItems,
    serializeJsonLd,
} from "@src/lib/seo/site";

type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ searchParams }: { searchParams: PageSearchParams }): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const filters = parseDoorCatalogFiltersFromSearchParams(resolvedSearchParams);

    return buildDoorCategoryMetadata(undefined, filters);
}

export default async function DoorsCatalogPage({ searchParams }: { searchParams: PageSearchParams }) {
    const resolvedSearchParams = await searchParams;
    const filters = parseDoorCatalogFiltersFromSearchParams(resolvedSearchParams);
    let catalog: Awaited<ReturnType<typeof getCatalogProducts>> | null = null;
    let loadError: string | null = null;

    try {
        catalog = await getCatalogProducts({
            type: "doors",
            page: 1,
            perPage: 24,
            categorySlug: "mezhkomnatnye-dveri",
            filters,
        });
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
                    eyebrow="Каталог дверей"
                    title="Межкомнатные двери"
                    description="Подберите дверь по размеру, цвету, материалу, типу открывания и другим характеристикам. После выбора можно настроить комплектацию и добавить фурнитуру."
                    total={catalog?.total}
                    activeHref="/mezhkomnatnye-dveri"
                    filters={catalog ? (
                        <CatalogFilters
                            filters={catalog.filters}
                            action="/mezhkomnatnye-dveri"
                            resetHref="/mezhkomnatnye-dveri"
                        />
                    ) : null}
                    items={catalog?.items ?? []}
                    loadError={loadError}
                    emptyMessage="В этом разделе пока нет опубликованных товаров."
                />
            </main>

            <FooterPage />
        </>
    );
}
