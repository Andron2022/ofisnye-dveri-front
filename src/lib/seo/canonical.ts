import type { HeadlessSeo } from "@src/lib/seo/types";

// Only routes backed by editorial WP content may override their canonical.
// Keep the page slugs aligned with Headless SEO Foundation's ACF visibility.
const INFORMATION_PATHS = new Set([
  "/o-nas",
  "/kontakty",
  "/klientam/zamery",
  "/klientam/oplata",
  "/klientam/dostavka",
  "/klientam/ustanovka",
  "/partneram/podryadchikam",
  "/partneram/arkhitektoram",
  "/uhod-i-obsluzhivanie",
  "/garantiya",
]);

function normalizePath(path: string): string {
  const normalized = path === "/" ? path : path.replace(/\/+$/, "");
  return normalized.replace(/%[\da-f]{2}/gi, (value) => value.toUpperCase());
}

function allowsOverride(path: string): boolean {
  return INFORMATION_PATHS.has(path) || /^\/(novosti-i-stati|portfolio)\/[^/]+$/.test(path);
}

function parseCanonicalPath(value: string): string | null {
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  // Reject encoded separators and double encoding before URL normalization.
  if (/%(?:2f|5c|25)/i.test(value)) return null;

  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return null;
  }

  if (/[\s\\?#%\u0000-\u001f\u007f]/.test(decoded) || decoded.includes("//")) return null;
  if (decoded.split("/").some((segment) => segment === "." || segment === "..")) return null;
  if (/^\/(api|checkout|shopping-cart|feeds)(\/|$)/i.test(decoded)) return null;
  if (/\.(xml|txt)(\/|$)/i.test(decoded)) return null;

  return normalizePath(new URL(decoded, "https://storefront.invalid").pathname);
}

export function resolveSeoCanonicalPath(path: string, seo?: HeadlessSeo | null): string {
  const automaticPath = normalizePath(path);
  const value = seo?.canonical_url?.trim();
  if (!value) return automaticPath;

  if (!allowsOverride(automaticPath)) {
    console.warn(`[SEO] Canonical override ignored for automatic route: ${automaticPath}`);
    return automaticPath;
  }

  const canonicalPath = parseCanonicalPath(value);
  if (!canonicalPath) {
    console.warn(`[SEO] Invalid canonical override for ${automaticPath}; using automatic canonical.`);
    return automaticPath;
  }

  return canonicalPath;
}

export function shouldIncludeSeoInSitemap(path: string, seo?: HeadlessSeo | null): boolean {
  return !seo?.noindex && resolveSeoCanonicalPath(path, seo) === normalizePath(path);
}
