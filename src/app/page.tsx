import type { Metadata } from "next";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import KallesHomePage from "@src/components/storefront/KallesHomePage";
import { getCatalogProducts } from "@src/lib/woo/products";
import { buildSeoMetadata } from "@src/lib/seo/site";
import type { CatalogProductCard } from "@src/lib/woo/types";

export const metadata: Metadata = buildSeoMetadata({
  title: "Межкомнатные двери с комплектацией",
  description:
    "Каталог межкомнатных дверей с комплектацией, фурнитурой, корзиной и оформлением заказа без онлайн-оплаты.",
  path: "/",
});

async function getHomepageFeaturedDoors(): Promise<{ items: CatalogProductCard[]; error: string | null }> {
  try {
    const catalog = await getCatalogProducts({
      type: "doors",
      page: 1,
      perPage: 8,
      categorySlug: "mezhkomnatnye-dveri",
    });

    return { items: catalog.items, error: null };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Не удалось загрузить товары для главной страницы.",
    };
  }
}

export default async function HomePage() {
  const featuredDoors = await getHomepageFeaturedDoors();

  return (
    <>
      <TopBanner />
      <Header />

      <main id="nt_content">
        <KallesHomePage
          featuredDoors={featuredDoors.items}
          productsLoadError={featuredDoors.error}
        />
      </main>

      <FooterPage />
    </>
  );
}
