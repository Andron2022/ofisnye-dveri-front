import { cache } from "react";
import type { Metadata } from "next";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import KallesHomePage from "@src/components/storefront/KallesHomePage";
import { getWpHomepageContent } from "@src/lib/home/wp-homepage";
import { getWpPosts, getWpPostsByIds } from "@src/lib/wp/content";
import { getCatalogProducts, getPrimaryDoorProductsByIds } from "@src/lib/woo/products";
import { buildSeoMetadata } from "@src/lib/seo/site";
import type { CatalogProductCard } from "@src/lib/woo/types";
import type { WpContentPreview } from "@src/lib/wp/content";
import type { HomePageContent } from "@src/lib/home/homepage-content";

export const revalidate = 300;

const getCachedWpHomepageContent = cache(getWpHomepageContent);

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCachedWpHomepageContent();

  return buildSeoMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/",
    image: content.hero.slides.find((slide) => Boolean(slide.image))?.image?.src,
  });
}

async function getFallbackHomepageFeaturedDoors(): Promise<CatalogProductCard[]> {
  const catalog = await getCatalogProducts({
    type: "doors",
    page: 1,
    perPage: 8,
    categorySlug: "mezhkomnatnye-dveri",
  });

  return catalog.items;
}

async function getHomepageFeaturedProducts(content: HomePageContent): Promise<{
  items: CatalogProductCard[];
  error: string | null;
}> {
  if (!content.featuredProducts.enabled) return { items: [], error: null };

  try {
    const items = content.featuredProducts.productIds.length > 0
      ? await getPrimaryDoorProductsByIds(content.featuredProducts.productIds)
      : await getFallbackHomepageFeaturedDoors();

    return { items, error: null };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Не удалось загрузить товары для главной страницы.",
    };
  }
}

async function getHomepagePosts(content: HomePageContent): Promise<{
  items: WpContentPreview[];
  error: string | null;
}> {
  if (!content.posts.enabled) return { items: [], error: null };

  try {
    const items = content.posts.postIds.length > 0
      ? await getWpPostsByIds(content.posts.postIds)
      : await getWpPosts(3);

    return { items, error: null };
  } catch (error) {
    return {
      items: [],
      error: error instanceof Error ? error.message : "Не удалось загрузить материалы для главной страницы.",
    };
  }
}

export default async function HomePage() {
  const content = await getCachedWpHomepageContent();
  const [featuredProducts, posts] = await Promise.all([
    getHomepageFeaturedProducts(content),
    getHomepagePosts(content),
  ]);

  return (
    <>
      <TopBanner />
      <Header />

      <main id="nt_content">
        <KallesHomePage
          content={content}
          featuredProducts={featuredProducts.items}
          posts={posts.items}
          productsLoadError={featuredProducts.error}
          postsLoadError={posts.error}
        />
      </main>

      <FooterPage />
    </>
  );
}
