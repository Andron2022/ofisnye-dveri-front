const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const { test, beforeEach, afterEach } = require("node:test");
const ts = require("typescript");
const { resolveTitle } = require("next/dist/lib/metadata/resolvers/resolve-title");

const root = path.resolve(__dirname, "..");
function createLoader(overrides = {}) {
  const cache = new Map();
  return function load(relativePath) {
    const filename = path.join(root, relativePath);
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const localRequire = createRequire(filename);
    const requireModule = (name) => {
      if (Object.hasOwn(overrides, name)) return overrides[name];
      return name.startsWith("@src/") ? load(`src/${name.slice(5)}.ts`) : localRequire(name);
    };
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
      fileName: filename,
    }).outputText;
    vm.runInThisContext(`(function(require,module,exports){${output}\n})`, { filename })(requireModule, module, module.exports);
    return module.exports;
  };
}

const load = createLoader();
const { normalizeHeadlessSeo } = load("src/lib/seo/types.ts");
const { buildSeoMetadata, buildDoorCategoryMetadata, buildDoorSeoLandingMetadata, buildDoorProductMetadata } = load("src/lib/seo/site.ts");
const { resolveSeoCanonicalPath, shouldIncludeSeoInSitemap } = load("src/lib/seo/canonical.ts");
const originalEnv = { ...process.env };
const fallback = { title: "Название", description: "Описание", path: "/o-nas", image: "/content.jpg" };
beforeEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://storefront.test";
  process.env.SITE_INDEXING_ENABLED = "true";
});
afterEach(() => { process.env = { ...originalEnv }; });

test("старый REST payload и отсутствующие поля совместимы", () => {
  for (const raw of [null, undefined, false, [], "seo"]) assert.deepEqual(normalizeHeadlessSeo(raw), {});
  const seo = normalizeHeadlessSeo({ title: " Заголовок ", description: null, image: null, noindex: "0" });
  assert.equal(seo.title, "Заголовок");
  assert.equal(seo.noindex, false);
  assert.equal(seo.og_title, undefined);
  assert.equal(seo.twitter_image, null);
  assert.equal(normalizeHeadlessSeo({ noindex: "true" }).noindex, true);
});

test("SEO Title обходит реальный Next title template; fallback сохраняется", () => {
  const explicit = buildSeoMetadata({ ...fallback, seo: { title: "Точный Title — Бренд" } });
  assert.equal(resolveTitle(explicit.title, "%s — Офисные двери").absolute, "Точный Title — Бренд");
  assert.equal(explicit.openGraph.title, "Точный Title — Бренд");
  const empty = buildSeoMetadata({ ...fallback, seo: { title: " " } });
  assert.equal(resolveTitle(empty.title, "%s — Офисные двери").absolute, "Название — Офисные двери");
});

test("OG и Twitter независимо переопределяются, изображения абсолютные", () => {
  const seo = normalizeHeadlessSeo({
    title: "SEO", description: "SEO description", image: { id: 1, url: "/og.jpg", alt: "Фото" },
    og_title: "OG", og_description: "OG description", twitter_title: "X", twitter_description: "X description",
    twitter_image: { id: 2, url: "https://media.test/x.jpg" },
  });
  const metadata = buildSeoMetadata({ ...fallback, seo });
  assert.equal(metadata.openGraph.title, "OG");
  assert.equal(metadata.openGraph.description, "OG description");
  assert.equal(metadata.openGraph.images[0].url, "https://storefront.test/og.jpg");
  assert.equal(metadata.twitter.title, "X");
  assert.equal(metadata.twitter.description, "X description");
  assert.deepEqual(metadata.twitter.images, ["https://media.test/x.jpg"]);
  const inherited = buildSeoMetadata({ ...fallback, seo: { ...seo, twitter_title: "", twitter_description: undefined, twitter_image: null } });
  assert.equal(inherited.twitter.title, "OG");
  assert.equal(inherited.twitter.description, "OG description");
  assert.deepEqual(inherited.twitter.images, ["https://storefront.test/og.jpg"]);
  assert.equal(buildSeoMetadata({ ...fallback, seo: { twitter_image: { url: "javascript:alert(1)" } } }).twitter.images[0], "https://storefront.test/content.jpg");
});

test("глобальный запрет, технический запрет и WP noindex имеют приоритет", () => {
  for (const enabled of ["false", "", "true"]) {
    process.env.SITE_INDEXING_ENABLED = enabled;
    for (const index of [true, false]) for (const noindex of [true, false]) {
      const robots = buildSeoMetadata({ ...fallback, index, seo: { noindex } }).robots;
      assert.equal(robots.index, enabled === "true" && index && !noindex);
      assert.equal(robots.googleBot.index, robots.index);
    }
  }
});

test("ручной Canonical применяется только к редакционным источникам и согласован с Sitemap", () => {
  for (const source of ["/o-nas", "/klientam/zamery", "/novosti-i-stati/statya", "/portfolio/proekt"]) {
    const seo = { canonical_url: "/kontakty/" };
    assert.equal(resolveSeoCanonicalPath(source, seo), "/kontakty");
    assert.equal(buildSeoMetadata({ ...fallback, path: source, seo }).alternates.canonical, "https://storefront.test/kontakty");
    assert.equal(shouldIncludeSeoInSitemap(source, seo), false);
    assert.equal(shouldIncludeSeoInSitemap(source, { canonical_url: source + "/" }), true);
    assert.equal(shouldIncludeSeoInSitemap(source, { noindex: true }), false);
  }
  assert.equal(shouldIncludeSeoInSitemap("/novosti-i-stati/%d1%82", { canonical_url: "/novosti-i-stati/%D1%82/" }), true);
});

test("опасные и недопустимые Canonical отклоняются с диагностикой", (t) => {
  const warnings = t.mock.method(console, "warn", () => {});
  for (const canonical_url of ["https://other.test/x", "//other.test/x", "/a?x=1", "/a#x", "/a/../b", "/%2e%2e/b", "/%2fother.test", "/%252fother.test", "/bad%zz", "/a\\b", "/a\nb", "/checkout", "/api/health", "/sitemap.xml", "/a//b"]) {
    assert.equal(resolveSeoCanonicalPath("/o-nas", { canonical_url }), "/o-nas", canonical_url);
    assert.equal(shouldIncludeSeoInSitemap("/o-nas", { canonical_url }), true);
  }
  for (const source of ["/", "/stenovye-paneli", "/stenovye-paneli/product", "/mezhkomnatnye-dveri", "/mezhkomnatnye-dveri/skrytye", "/mezhkomnatnye-dveri/skrytye/product", "/novosti-i-stati", "/portfolio", "/checkout"]) {
    assert.equal(resolveSeoCanonicalPath(source, { canonical_url: "/o-nas" }), source);
  }
  assert.ok(warnings.mock.callCount() > 0);
});

test("категории, clean landing, residual query и товары сохраняют технические правила", (t) => {
  t.mock.method(console, "warn", () => {});
  const category = { name: "Категория", description: "Описание", path: "/mezhkomnatnye-dveri/skrytye", seo: { title: "SEO категории", canonical_url: "/o-nas" } };
  const clean = buildDoorCategoryMetadata(category, {});
  assert.equal(clean.title.absolute, "SEO категории");
  assert.equal(clean.robots.index, true);
  const filtered = buildDoorCategoryMetadata(category, { color: ["1"] }, "/mezhkomnatnye-dveri/skrytye/belye");
  assert.equal(filtered.robots.index, false);
  assert.equal(filtered.alternates.canonical, "https://storefront.test/mezhkomnatnye-dveri/skrytye/belye");
  const landing = { title: "Подборка", path: "/mezhkomnatnye-dveri/skrytye/belye", baseCategoryInfo: category, seo: { canonical_url: "/o-nas" } };
  assert.equal(buildDoorSeoLandingMetadata(landing, {}, 3).robots.index, true);
  assert.equal(buildDoorSeoLandingMetadata(landing, { color: ["2"] }, 3).robots.index, false);
  assert.equal(buildDoorSeoLandingMetadata(landing, {}, 0).robots.index, false);
  assert.equal(buildDoorSeoLandingMetadata(landing, {}, 3).alternates.canonical, "https://storefront.test" + landing.path);
  const product = { name: "Дверь", path: category.path + "/product", attributes: {}, categories: [], seo: { title: "SEO товара", canonical_url: "/o-nas" } };
  assert.equal(buildDoorProductMetadata(product).alternates.canonical, "https://storefront.test" + product.path);
});

test("главная и панели передают новые поля и сохраняют legacy fallback без новых HTTP-запросов", async () => {
  const calls = [];
  let page = { id: 1, title: { rendered: "Страница" }, acf: { home_meta_title: "Legacy home", wall_panels_meta_title: "Legacy panels" }, headless_seo: { title: "WP SEO", og_title: "OG", twitter_title: "X", noindex: true } };
  const adapterLoad = createLoader({
    "@src/lib/wp/content": { getWpPageBySlug: async (slug) => { calls.push(slug); return page; } },
    "@src/lib/wp/client": { wpPublicGetList: async () => { throw new Error("Unexpected extra HTTP request"); } },
  });
  const { getWpHomepageContent } = adapterLoad("src/lib/home/wp-homepage.ts");
  const { getWallPanelsPageContent, buildWallPanelsMetadata } = adapterLoad("src/lib/wall-panels/content.ts");
  const home = await getWpHomepageContent();
  assert.equal(home.seo.headless.og_title, "OG");
  assert.equal(home.seo.title, "WP SEO");
  const panels = await buildWallPanelsMetadata();
  assert.equal(panels.title.absolute, "WP SEO");
  assert.equal(panels.openGraph.title, "OG");
  assert.equal(panels.twitter.title, "X");
  assert.equal(panels.robots.index, false);
  assert.deepEqual(calls, ["glavnaya", "stenovye-paneli"]);
  page = { ...page, headless_seo: {} };
  assert.equal((await getWpHomepageContent()).seo.title, "Legacy home");
  assert.equal((await getWallPanelsPageContent()).metaTitle, "Legacy panels");
});
