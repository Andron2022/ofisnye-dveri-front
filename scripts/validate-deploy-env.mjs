import process from "node:process";

const errors = [];
const env = process.env;
const appEnv = (env.APP_ENV || "").trim().toLowerCase();

function requireValue(name) {
  const value = env[name]?.trim();
  if (!value) errors.push(`${name} is required`);
  return value || "";
}

function parseBoolean(name, required = true) {
  const raw = env[name]?.trim().toLowerCase();
  if (!raw && !required) return undefined;
  if (raw !== "true" && raw !== "false") {
    errors.push(`${name} must be true or false`);
    return undefined;
  }
  return raw === "true";
}

function parseHttpsUrl(name) {
  const value = requireValue(name);
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") errors.push(`${name} must use https://`);
    if (url.username || url.password) errors.push(`${name} must not contain credentials`);
    return url;
  } catch {
    errors.push(`${name} must be a valid URL`);
    return null;
  }
}

if (!new Set(["staging", "production"]).has(appEnv)) {
  errors.push("APP_ENV must be staging or production");
}

const publicSiteUrl = parseHttpsUrl("NEXT_PUBLIC_SITE_URL");
const siteUrl = parseHttpsUrl("SITE_URL");
const wpUrl = parseHttpsUrl("WORDPRESS_URL");

if (publicSiteUrl && siteUrl && publicSiteUrl.origin !== siteUrl.origin) {
  errors.push("NEXT_PUBLIC_SITE_URL and SITE_URL must have the same origin");
}
if (publicSiteUrl && wpUrl && publicSiteUrl.origin === wpUrl.origin) {
  errors.push("WORDPRESS_URL should use a separate WordPress origin");
}

requireValue("WC_CONSUMER_KEY");
requireValue("WC_CONSUMER_SECRET");
requireValue("WP_HEADER_NAVIGATION_SLUG");
requireValue("WP_FOOTER_NAVIGATION_SLUG");
requireValue("WP_SITE_CHROME_PAGE_SLUG");

const writeKey = env.WC_WRITE_CONSUMER_KEY?.trim() || "";
const writeSecret = env.WC_WRITE_CONSUMER_SECRET?.trim() || "";
if (Boolean(writeKey) !== Boolean(writeSecret)) {
  errors.push("WC_WRITE_CONSUMER_KEY and WC_WRITE_CONSUMER_SECRET must be configured together");
}

const bffSecret = requireValue("BFF_SECURITY_SECRET");
if (bffSecret && bffSecret.length < 32) {
  errors.push("BFF_SECURITY_SECRET must be at least 32 characters");
}

const allowedOrigins = requireValue("BFF_ALLOWED_ORIGINS")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
if (publicSiteUrl && !allowedOrigins.includes(publicSiteUrl.origin)) {
  errors.push("BFF_ALLOWED_ORIGINS must include NEXT_PUBLIC_SITE_URL origin");
}

if (parseBoolean("BFF_REQUIRE_ORIGIN") !== true) {
  errors.push("BFF_REQUIRE_ORIGIN must be true on staging and production");
}

const indexingEnabled = parseBoolean("SITE_INDEXING_ENABLED");
if (appEnv === "staging" && indexingEnabled !== false) {
  errors.push("SITE_INDEXING_ENABLED must be false on staging");
}
if (appEnv === "production" && indexingEnabled !== true) {
  errors.push("SITE_INDEXING_ENABLED must be true on production");
}

if (env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
  errors.push("NODE_TLS_REJECT_UNAUTHORIZED=0 is forbidden on staging and production");
}

for (const name of ["WP_REST_TIMEOUT_MS", "BFF_RATE_LIMIT_WINDOW_MS", "BFF_CHECKOUT_RATE_LIMIT", "BFF_WALL_PANEL_RATE_LIMIT"]) {
  const value = requireValue(name);
  if (value && (!Number.isFinite(Number(value)) || Number(value) <= 0)) {
    errors.push(`${name} must be a positive number`);
  }
}

if (errors.length > 0) {
  console.error("Deployment environment validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Deployment environment is valid for ${appEnv}.`);
