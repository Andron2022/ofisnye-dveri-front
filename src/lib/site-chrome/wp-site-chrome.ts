// src/lib/site-chrome/wp-site-chrome.ts

import { defaultSiteChromeSettings } from "@src/lib/site-chrome/defaults";
import type { SiteChromeContactItem, SiteChromeImage, SiteChromeSettings } from "@src/lib/site-chrome/types";
import { wpPublicGetList } from "@src/lib/wp/client";
import { getRenderedText } from "@src/lib/wp/format";
import type { WpAcfImageObject, WpAcfImageValue, WpEmbeddedMedia, WpPageAcf, WpPageRestItem } from "@src/lib/wp/types";

const SITE_CHROME_PAGE_SLUG = "nastrojki-sajta";
const SITE_CHROME_REVALIDATE_SECONDS = 300;
const SITE_CHROME_MEDIA_TIMEOUT_MS = 3500;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getPageAcf(page: WpPageRestItem): WpPageAcf {
  return isPlainObject(page.acf) ? (page.acf as WpPageAcf) : {};
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

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(normalized)) return true;
    if (["0", "false", "no", "off"].includes(normalized)) return false;
  }

  return fallback;
}

function getAcfString(acf: WpPageAcf, key: string, fallback = ""): string {
  return asString(acf[key]) || fallback;
}

function getAcfBoolean(acf: WpPageAcf, key: string, fallback = false): boolean {
  return asBoolean(acf[key], fallback);
}

function normalizeIconClass(value: string, fallback: string): string {
  const normalized = value
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => /^[a-z0-9_-]+$/i.test(item))
    .join(" ");

  return normalized || fallback;
}

function normalizePhoneHref(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^tel:/i.test(trimmed)) return trimmed;

  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.length === 11 && digits.startsWith("8")) {
    return `tel:+7${digits.slice(1)}`;
  }

  return `tel:+${digits}`;
}

function buildImplicitHref(text: string): string | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  if (trimmed.includes("@")) return `mailto:${trimmed}`;

  const phoneHref = normalizePhoneHref(trimmed);
  return phoneHref || undefined;
}

function getImageUrlFromObject(image: WpAcfImageObject): string | undefined {
  const preferredSizes = ["medium", "medium_large", "large", "full"];

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

function getPreferredMediaUrl(media: WpEmbeddedMedia | null): string | undefined {
  if (!media) return undefined;

  const preferredSizes = ["medium", "medium_large", "large", "full"];

  for (const size of preferredSizes) {
    const sourceUrl = media.media_details?.sizes?.[size]?.source_url;
    if (typeof sourceUrl === "string" && sourceUrl.trim()) return sourceUrl.trim();
  }

  return media.source_url;
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
    if (getImageUrlFromObject(imageObject)) return null;

    const id = asNumber(imageObject.id ?? imageObject.ID);
    return id && Number.isInteger(id) && id > 0 ? id : null;
  }

  return null;
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallback), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

async function getSiteChromeMediaMap(ids: number[]): Promise<Map<number, WpEmbeddedMedia>> {
  if (ids.length === 0) return new Map();

  try {
    const response = await withTimeout(
      wpPublicGetList<WpEmbeddedMedia>(
        "media",
        {
          include: ids.join(","),
          per_page: Math.min(ids.length, 100),
          _fields: "id,source_url,alt_text,title,media_details",
        },
        SITE_CHROME_REVALIDATE_SECONDS,
      ),
      SITE_CHROME_MEDIA_TIMEOUT_MS,
      { items: [], total: 0, totalPages: 0 },
    );

    return new Map(
      response.items
        .filter((item) => typeof item.id === "number")
        .map((item) => [item.id as number, item]),
    );
  } catch (error) {
    console.warn("Failed to load WP site chrome media batch", error);
    return new Map();
  }
}

function resolveSiteChromeImage(
  value: WpAcfImageValue,
  mediaMap: Map<number, WpEmbeddedMedia>,
  altOverride?: string,
): SiteChromeImage | undefined {
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

    return src ? { src, alt: altOverride || getImageAltFromMedia(media ?? null) } : undefined;
  }

  if (typeof value === "number") {
    const media = mediaMap.get(value);
    const src = getPreferredMediaUrl(media ?? null);

    return src ? { src, alt: altOverride || getImageAltFromMedia(media ?? null) } : undefined;
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

    return src ? { src, alt: altOverride || getImageAltFromMedia(media ?? null) } : undefined;
  }

  return undefined;
}

function buildFooterContact(acf: WpPageAcf, index: number, fallback?: SiteChromeContactItem): SiteChromeContactItem | null {
  const prefix = `footer_contact_${index}`;
  const enabled = getAcfBoolean(acf, `${prefix}_enabled`, fallback?.enabled ?? false);
  if (!enabled) return null;

  const text = getAcfString(acf, `${prefix}_text`, fallback?.text ?? "");
  const explicitHref = getAcfString(acf, `${prefix}_href`, fallback?.href ?? "");
  const iconClass = normalizeIconClass(
    getAcfString(acf, `${prefix}_icon_class`, fallback?.iconClass ?? ""),
    fallback?.iconClass ?? "pegk pe-7s-info",
  );

  if (!text && !explicitHref) return null;

  return {
    id: `footer-contact-${index}`,
    enabled: true,
    iconClass,
    text,
    href: explicitHref || buildImplicitHref(text),
  };
}

async function getSiteChromeSettingsPage(): Promise<WpPageRestItem | null> {
  const slug = process.env.WP_SITE_CHROME_PAGE_SLUG?.trim() || SITE_CHROME_PAGE_SLUG;

  const { items } = await wpPublicGetList<WpPageRestItem>(
    "pages",
    {
      slug,
      status: "publish",
      _fields: "id,slug,status,title,acf",
    },
    SITE_CHROME_REVALIDATE_SECONDS,
  );

  return items[0] ?? null;
}

function mergeSiteChromeSettings(acf: WpPageAcf, logoImage?: SiteChromeImage): SiteChromeSettings {
  const fallback = defaultSiteChromeSettings;
  const phoneHref = getAcfString(acf, "header_phone_href", fallback.header.phoneHref ?? "");
  const phoneText = getAcfString(acf, "header_phone_text", fallback.header.phoneText);
  const contacts = Array.from({ length: 4 }, (_, index) => buildFooterContact(acf, index + 1, fallback.footer.contacts[index]))
    .filter((item): item is SiteChromeContactItem => Boolean(item));

  return {
    logo: {
      text: getAcfString(acf, "site_logo_text", fallback.logo.text),
      image: logoImage ?? fallback.logo.image,
    },
    announcement: {
      enabled: getAcfBoolean(acf, "site_announcement_enabled", fallback.announcement.enabled),
      text: getAcfString(acf, "site_announcement_text", fallback.announcement.text),
      href: getAcfString(acf, "site_announcement_href", fallback.announcement.href),
      linkLabel: getAcfString(acf, "site_announcement_link_label", fallback.announcement.linkLabel),
    },
    header: {
      phoneIconClass: normalizeIconClass(
        getAcfString(acf, "header_phone_icon_class", fallback.header.phoneIconClass),
        fallback.header.phoneIconClass,
      ),
      phoneText,
      phoneHref: phoneHref || normalizePhoneHref(phoneText) || fallback.header.phoneHref,
      centerText: getAcfString(acf, "header_center_text", fallback.header.centerText),
      emailIconClass: normalizeIconClass(
        getAcfString(acf, "header_email_icon_class", fallback.header.emailIconClass),
        fallback.header.emailIconClass,
      ),
      email: getAcfString(acf, "header_email", fallback.header.email),
      emailLabel: getAcfString(acf, "header_email_label", fallback.header.emailLabel),
    },
    footer: {
      aboutText: getAcfString(acf, "footer_about_text", fallback.footer.aboutText),
      contacts: contacts.length ? contacts : fallback.footer.contacts,
      bottomLeft: getAcfString(acf, "footer_bottom_left", fallback.footer.bottomLeft),
      bottomRight: getAcfString(acf, "footer_bottom_right", fallback.footer.bottomRight),
    },
  };
}

export async function getWpDrivenSiteChrome(): Promise<SiteChromeSettings> {
  try {
    const page = await getSiteChromeSettingsPage();
    if (!page) return defaultSiteChromeSettings;

    const acf = getPageAcf(page);
    const logoImageId = getImageId(acf.site_logo_image as WpAcfImageValue);
    const mediaMap = await getSiteChromeMediaMap(logoImageId ? [logoImageId] : []);
    const logoImage = resolveSiteChromeImage(
      acf.site_logo_image as WpAcfImageValue,
      mediaMap,
      getAcfString(acf, "site_logo_alt"),
    );

    return mergeSiteChromeSettings(acf, logoImage);
  } catch (error) {
    console.error("Failed to load WP site chrome settings", error);
    return defaultSiteChromeSettings;
  }
}
