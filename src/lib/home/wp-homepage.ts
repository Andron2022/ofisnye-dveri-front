// src/lib/home/wp-homepage.ts

import { homePageContent } from "@src/lib/home/homepage-content";
import type {
  HomeCategoryCard,
  HomeHeroSlide,
  HomeImage,
  HomeOneCategoryBlock,
  HomePageContent,
  HomeProcessStep,
  HomeServiceLink,
} from "@src/lib/home/homepage-content";
import { getWpPageBySlug } from "@src/lib/wp/content";
import { normalizeHeadlessSeo } from "@src/lib/seo/types";
import type { HeadlessSeo } from "@src/lib/seo/types";
import { wpPublicGetList } from "@src/lib/wp/client";
import { getRenderedText } from "@src/lib/wp/format";
import type { WpAcfImageObject, WpAcfImageValue, WpEmbeddedMedia, WpPageAcf } from "@src/lib/wp/types";

const HOMEPAGE_WP_SLUG = "glavnaya";
const HOMEPAGE_REVALIDATE_SECONDS = 300;
// const HOMEPAGE_MEDIA_TIMEOUT_MS = 3500;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const normalized = value.trim().replace(",", ".");
    if (normalized && Number.isFinite(Number(normalized))) return Number(normalized);
  }

  return null;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
  return fallback;
}

function parseIds(value: unknown): number[] {
  const rawValues = Array.isArray(value) ? value : [value];
  const ids = new Set<number>();

  for (const rawValue of rawValues) {
    if (typeof rawValue === "number" && Number.isInteger(rawValue) && rawValue > 0) {
      ids.add(rawValue);
      continue;
    }

    if (typeof rawValue !== "string") continue;

    rawValue
      .split(/[\s,;]+/)
      .map((part) => Number(part.trim()))
      .filter((id) => Number.isInteger(id) && id > 0)
      .forEach((id) => ids.add(id));
  }

  return Array.from(ids);
}

function getAcfString(acf: WpPageAcf, key: string, fallback = ""): string {
  return asString(acf[key]) || fallback;
}

function getAcfBoolean(acf: WpPageAcf, key: string, fallback = false): boolean {
  return asBoolean(acf[key], fallback);
}

function normalizeAlign(value: unknown, fallback: HomeHeroSlide["align"] = "right"): HomeHeroSlide["align"] {
  const normalized = asString(value).toLowerCase();

  if (normalized === "left" || normalized === "center" || normalized === "right") return normalized;

  return fallback;
}

function getImageUrlFromObject(image: WpAcfImageObject): string | undefined {
  const preferredSizes = ["large", "medium_large", "full"];

  for (const size of preferredSizes) {
    const value = image.sizes?.[size];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return image.url || image.source_url;
}

function getImageAltFromObject(image: WpAcfImageObject): string | undefined {
  const title = image.title;

  if (typeof image.alt === "string" && image.alt.trim()) return image.alt.trim();
  if (typeof image.alt_text === "string" && image.alt_text.trim()) return image.alt_text.trim();
  if (typeof title === "string" && title.trim()) return title.trim();

  return isPlainObject(title) ? getRenderedText(title as { rendered?: string }) : undefined;
}

function getImageAltFromMedia(media: WpEmbeddedMedia | null): string | undefined {
  return media?.alt_text || getRenderedText(media?.title);
}

function getImageId(value: WpAcfImageValue): number | null {
  if (!value) return null;

  if (typeof value === "number") return Number.isInteger(value) && value > 0 ? value : null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^https?:\/\//i.test(trimmed)) return null;

    const maybeId = asNumber(trimmed);
    return maybeId && Number.isInteger(maybeId) && maybeId > 0 ? maybeId : null;
  }

  if (isPlainObject(value)) {
    const imageObject = value as WpAcfImageObject;
    const objectUrl = getImageUrlFromObject(imageObject);
    if (objectUrl) return null;

    const id = asNumber(imageObject.id ?? imageObject.ID);
    return id && Number.isInteger(id) && id > 0 ? id : null;
  }

  return null;
}

function collectHomepageImageIds(acf: WpPageAcf): number[] {
  const ids = new Set<number>();
  const imageKeys = [
    "home_hero_slide_1_image",
    "home_hero_slide_2_image",
    "home_hero_slide_3_image",
    "home_category_big_card_image",
    "home_category_small_card_1_image",
    "home_category_small_card_2_image",
    "home_1cat_notice_image",
  ];

  for (const key of imageKeys) {
    const id = getImageId(acf[key] as WpAcfImageValue);
    if (id) ids.add(id);
  }

  return Array.from(ids);
}

function getPreferredMediaUrl(media: WpEmbeddedMedia | null): string | undefined {
  if (!media) return undefined;

  const preferredSizes = ["large", "medium_large", "full"];

  for (const size of preferredSizes) {
    const sourceUrl = media.media_details?.sizes?.[size]?.source_url;
    if (typeof sourceUrl === "string" && sourceUrl.trim()) return sourceUrl.trim();
  }

  return media.source_url;
}

// async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
//   let timeoutId: ReturnType<typeof setTimeout> | undefined;

//   const timeoutPromise = new Promise<T>((resolve) => {
//     timeoutId = setTimeout(() => resolve(fallback), timeoutMs);
//   });

//   try {
//     return await Promise.race([promise, timeoutPromise]);
//   } finally {
//     if (timeoutId) clearTimeout(timeoutId);
//   }
// }

async function getHomepageMediaMap(ids: number[]): Promise<Map<number, WpEmbeddedMedia>> {
  if (ids.length === 0) return new Map();

  try {
    // const response = await withTimeout(
    //   wpPublicGetList<WpEmbeddedMedia>(
    //     "media",
    //     {
    //       include: ids.join(","),
    //       per_page: Math.min(ids.length, 100),
    //       _fields: "id,source_url,alt_text,title,media_details",
    //     },
    //     HOMEPAGE_REVALIDATE_SECONDS,
    //   ),
    //   HOMEPAGE_MEDIA_TIMEOUT_MS,
    //   { items: [], total: 0, totalPages: 0 },
    // );
    const response = await wpPublicGetList<WpEmbeddedMedia>(
      "media",
      {
        include: ids.join(","),
        per_page: Math.min(ids.length, 100),
        _fields: "id,source_url,alt_text,title,media_details",
      },
      HOMEPAGE_REVALIDATE_SECONDS,
    );

    return new Map(
      response.items
        .filter((item) => typeof item.id === "number")
        .map((item) => [item.id as number, item]),
    );
  } catch (error) {
    console.warn("Failed to load WP homepage media batch", error);
    return new Map();
  }
}

function resolveHomepageImage(
  value: WpAcfImageValue,
  mediaMap: Map<number, WpEmbeddedMedia>,
  altOverride?: string,
): HomeImage | undefined {
  if (!value) return undefined;

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (/^https?:\/\//i.test(trimmed)) {
      return {
        src: trimmed,
        alt: altOverride || undefined,
      };
    }

    const maybeId = asNumber(trimmed);
    if (!maybeId) return undefined;

    const media = mediaMap.get(maybeId);
    const src = getPreferredMediaUrl(media ?? null);
    return src
      ? {
          src,
          alt: altOverride || getImageAltFromMedia(media ?? null),
        }
      : undefined;
  }

  if (typeof value === "number") {
    const media = mediaMap.get(value);
    const src = getPreferredMediaUrl(media ?? null);
    return src
      ? {
          src,
          alt: altOverride || getImageAltFromMedia(media ?? null),
        }
      : undefined;
  }

  if (isPlainObject(value)) {
    const imageObject = value as WpAcfImageObject;
    const objectUrl = getImageUrlFromObject(imageObject);

    if (objectUrl) {
      return {
        src: objectUrl,
        alt: altOverride || getImageAltFromObject(imageObject),
      };
    }

    const id = asNumber(imageObject.id ?? imageObject.ID);
    if (!id) return undefined;

    const media = mediaMap.get(id);
    const src = getPreferredMediaUrl(media ?? null);
    return src
      ? {
          src,
          alt: altOverride || getImageAltFromMedia(media ?? null),
        }
      : undefined;
  }

  return undefined;
}

function buildHeroSlide(
  acf: WpPageAcf,
  mediaMap: Map<number, WpEmbeddedMedia>,
  index: number,
  fallback?: HomeHeroSlide,
): HomeHeroSlide | null {
  const enabled = getAcfBoolean(acf, `home_hero_slide_${index}_enabled`, Boolean(fallback));
  if (!enabled) return null;

  const image = resolveHomepageImage(
    acf[`home_hero_slide_${index}_image`] as WpAcfImageValue,
    mediaMap,
    getAcfString(acf, `home_hero_slide_${index}_image_alt`),
  );
  const eyebrow = getAcfString(acf, `home_hero_slide_${index}_eyebrow`, fallback?.eyebrow ?? "");
  const titleTop = getAcfString(acf, `home_hero_slide_${index}_title_top`, fallback?.titleTop ?? "");
  const titleBottom = getAcfString(acf, `home_hero_slide_${index}_title_bottom`, fallback?.titleBottom ?? "");
  const buttonLabel = getAcfString(acf, `home_hero_slide_${index}_button_label`, fallback?.buttonLabel ?? "");
  const buttonHref = getAcfString(acf, `home_hero_slide_${index}_button_href`, fallback?.buttonHref ?? "#");

  if (!image && !eyebrow && !titleTop && !titleBottom && !buttonLabel) return null;

  return {
    id: `home-hero-slide-${index}`,
    image: image ?? fallback?.image,
    eyebrow,
    titleTop,
    titleBottom,
    buttonLabel,
    buttonHref,
    align: normalizeAlign(acf[`home_hero_slide_${index}_align`], fallback?.align ?? "right"),
  };
}

function buildCategoryCard({
  acf,
  mediaMap,
  prefix,
  id,
  fallback,
}: {
  acf: WpPageAcf;
  prefix: string;
  id: string;
  fallback?: HomeCategoryCard;
  mediaMap: Map<number, WpEmbeddedMedia>;
}): HomeCategoryCard | undefined {
  const enabled = getAcfBoolean(acf, `${prefix}_enabled`, Boolean(fallback));
  if (!enabled) return undefined;

  const title = getAcfString(acf, `${prefix}_title`, fallback?.title ?? "");
  const href = getAcfString(acf, `${prefix}_href`, fallback?.href ?? "#");
  const image = resolveHomepageImage(acf[`${prefix}_image`] as WpAcfImageValue, mediaMap, fallback?.image?.alt);

  if (!title && !image) return undefined;

  return {
    id,
    title,
    href,
    image: image ?? fallback?.image,
  };
}

function buildProcessStep(acf: WpPageAcf, index: number, fallback?: HomeProcessStep): HomeProcessStep | null {
  const title = getAcfString(acf, `home_process_step_${index}_title`, fallback?.title ?? "");
  const description = getAcfString(acf, `home_process_step_${index}_description`, fallback?.description ?? "");

  if (!title && !description) return null;

  return {
    id: fallback?.id ?? `home-process-step-${index}`,
    title,
    description,
  };
}

function buildOneCategoryBlock(
  acf: WpPageAcf,
  mediaMap: Map<number, WpEmbeddedMedia>,
  fallback: HomeOneCategoryBlock,
): HomeOneCategoryBlock {
  const image = resolveHomepageImage(
    acf.home_1cat_notice_image as WpAcfImageValue,
    mediaMap,
    getAcfString(acf, "home_1cat_notice_image_alt"),
  );

  return {
    enabled: getAcfBoolean(acf, "home_1cat_enabled", fallback.enabled),
    image: image ?? fallback.image,
    title: getAcfString(acf, "home_1cat_notice_title", fallback.title),
    description: getAcfString(acf, "home_1cat_notice_description", fallback.description),
    buttonLabel: getAcfString(acf, "home_1cat_notice_button_label", fallback.buttonLabel),
    buttonHref: getAcfString(acf, "home_1cat_notice_button_href", fallback.buttonHref),
  };
}

function buildServiceLink(acf: WpPageAcf, index: number, fallback?: HomeServiceLink): HomeServiceLink | null {
  const enabled = getAcfBoolean(acf, `home_service_${index}_enabled`, Boolean(fallback));
  if (!enabled) return null;

  const titleFallback = index === 2 ? getAcfString(acf, "home_service_title", fallback?.title ?? "") : fallback?.title ?? "";
  const title = getAcfString(acf, `home_service_${index}_title`, titleFallback);
  const description = getAcfString(acf, `home_service_${index}_description`, fallback?.description ?? "");
  const href = getAcfString(acf, `home_service_${index}_href`, fallback?.href ?? "#");
  const iconClass = getAcfString(acf, `home_service_${index}_icon_class`, fallback?.iconClass ?? "pegk pe-7s-info");

  if (!title && !description) return null;

  return {
    id: fallback?.id ?? `home-service-${index}`,
    iconClass,
    title,
    description,
    href,
  };
}

async function mergeHomepageWithAcf(acf: WpPageAcf, seo: HeadlessSeo, modified?: string): Promise<HomePageContent> {
  const mediaMap = await getHomepageMediaMap(collectHomepageImageIds(acf));

  const heroSlides = [1, 2, 3].map((index) =>
    buildHeroSlide(acf, mediaMap, index, homePageContent.hero.slides[index - 1]),
  );

  const bigCategoryCard = buildCategoryCard({
    acf,
    mediaMap,
    prefix: "home_category_big_card",
    id: "home-category-big-card",
    fallback: homePageContent.categories.bigCard,
  });
  const firstSmallCategoryCard = buildCategoryCard({
    acf,
    mediaMap,
    prefix: "home_category_small_card_1",
    id: "home-category-small-card-1",
    fallback: homePageContent.categories.smallCards[0],
  });
  const secondSmallCategoryCard = buildCategoryCard({
    acf,
    mediaMap,
    prefix: "home_category_small_card_2",
    id: "home-category-small-card-2",
    fallback: homePageContent.categories.smallCards[1],
  });
  const oneCategory = buildOneCategoryBlock(acf, mediaMap, homePageContent.oneCategory);

  const processSteps = [1, 2, 3, 4]
    .map((index) => buildProcessStep(acf, index, homePageContent.process.steps[index - 1]))
    .filter((step): step is HomeProcessStep => Boolean(step));

  const serviceLinks = [1, 2, 3, 4]
    .map((index) => buildServiceLink(acf, index, homePageContent.services.items[index - 1]))
    .filter((service): service is HomeServiceLink => Boolean(service));

  const smallCards = [firstSmallCategoryCard, secondSmallCategoryCard].filter(
    (card): card is HomeCategoryCard => Boolean(card),
  );

  return {
    seo: {
      title: seo.title || getAcfString(acf, "home_meta_title", homePageContent.seo.title),
      description: seo.description || getAcfString(acf, "home_meta_description", homePageContent.seo.description),
      image: seo.image?.url ? { src: seo.image.url, alt: seo.image.alt } : undefined,
      noindex: Boolean(seo.noindex),
      modified,
    },
    hero: {
      enabled: getAcfBoolean(acf, "home_hero_slide_enabled", homePageContent.hero.enabled) && heroSlides.some(Boolean),
      slides: heroSlides.filter((slide): slide is HomeHeroSlide => Boolean(slide)),
    },
    categories: {
      enabled: getAcfBoolean(acf, "home_category_enabled", homePageContent.categories.enabled) && Boolean(bigCategoryCard || smallCards.length),
      bigCard: bigCategoryCard,
      smallCards,
    },
    featuredProducts: {
      enabled: getAcfBoolean(acf, "home_featured_products_enabled", homePageContent.featuredProducts.enabled),
      title: getAcfString(acf, "home_featured_products_title", homePageContent.featuredProducts.title),
      productIds: parseIds(acf.home_featured_products_category_ids),
      buttonLabel: getAcfString(acf, "home_featured_products_button_label", homePageContent.featuredProducts.buttonLabel),
      buttonHref: getAcfString(acf, "home_featured_products_button_href", homePageContent.featuredProducts.buttonHref),
    },
    process: {
      enabled: getAcfBoolean(acf, "home_process_enabled", homePageContent.process.enabled) && processSteps.length > 0,
      title: getAcfString(acf, "home_process_title", homePageContent.process.title),
      subtitle: getAcfString(acf, "home_process_subtitle", homePageContent.process.subtitle),
      steps: processSteps,
    },
    oneCategory,
    posts: {
      enabled: getAcfBoolean(acf, "home_posts_enabled", homePageContent.posts.enabled),
      title: getAcfString(acf, "home_posts_title", homePageContent.posts.title),
      postIds: parseIds(acf.home_posts_ids),
    },
    services: {
      enabled: getAcfBoolean(acf, "home_service_enabled", homePageContent.services.enabled) && serviceLinks.length > 0,
      items: serviceLinks,
    },
  };
}

export async function getWpHomepageContent(): Promise<HomePageContent> {
  try {
    const page = await getWpPageBySlug(HOMEPAGE_WP_SLUG);
    if (!page || !isPlainObject(page.acf)) return homePageContent;

    return await mergeHomepageWithAcf(
      page.acf as WpPageAcf,
      normalizeHeadlessSeo(page.headless_seo),
      page.modified,
    );
  } catch (error) {
    console.error("Failed to load WP-driven homepage content", error);
    return homePageContent;
  }
}
