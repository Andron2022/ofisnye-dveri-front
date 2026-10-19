// src/lib/seo/types.ts

export type HeadlessSeoImage = {
  id?: number;
  url?: string;
  alt?: string;
};

export type HeadlessSeo = {
  title?: string;
  description?: string;
  image?: HeadlessSeoImage | null;
  noindex?: boolean;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: HeadlessSeoImage | null;
  canonical_url?: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(normalized)) return true;
    if (["0", "false", "no", "off", ""].includes(normalized)) return false;
  }

  return undefined;
}

function normalizeImage(value: unknown): HeadlessSeoImage | null {
  const imageValue = isPlainObject(value) ? value : null;
  const imageUrl = imageValue ? asString(imageValue.url) : undefined;
  const imageId =
    imageValue && typeof imageValue.id === "number" && Number.isInteger(imageValue.id)
      ? imageValue.id
      : undefined;

  return imageUrl || imageId
    ? {
        id: imageId,
        url: imageUrl,
        alt: imageValue ? asString(imageValue.alt) : undefined,
      }
    : null;
}

export function normalizeHeadlessSeo(value: unknown): HeadlessSeo {
  if (!isPlainObject(value)) return {};

  return {
    title: asString(value.title),
    description: asString(value.description),
    image: normalizeImage(value.image),
    noindex: asBoolean(value.noindex) ?? false,
    og_title: asString(value.og_title),
    og_description: asString(value.og_description),
    twitter_title: asString(value.twitter_title),
    twitter_description: asString(value.twitter_description),
    twitter_image: normalizeImage(value.twitter_image),
    canonical_url: asString(value.canonical_url),
  };
}

export function getHeadlessSeoImageUrl(
  seo: HeadlessSeo | null | undefined,
): string | undefined {
  return seo?.image?.url?.trim() || undefined;
}
