const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const { test, beforeEach, afterEach } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function createLoader(overrides = {}) {
    const root = path.resolve(__dirname, "..");
    const cache = new Map();
    return function load(relativePath) {
        const filename = path.join(root, relativePath);
        if (cache.has(filename)) return cache.get(filename).exports;
        const module = { exports: {} };
        cache.set(filename, module);
        const localRequire = createRequire(filename);
        const requireModule = (name) => {
            if (Object.hasOwn(overrides, name)) return overrides[name];
            if (!name.startsWith("@src/")) return localRequire(name);
            const base = `src/${name.slice(5)}`;
            return load(fs.existsSync(path.join(root, `${base}.ts`)) ? `${base}.ts` : `${base}.tsx`);
        };
        const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
            fileName: filename,
        }).outputText;
        vm.runInThisContext(`(function(require,module,exports){${output}\n})`, { filename })(requireModule, module, module.exports);
        return module.exports;
    };
}

const originalEnv = { ...process.env };
const originalFetch = global.fetch;
beforeEach(() => {
    process.env.WORDPRESS_URL = "https://wordpress.test";
    process.env.NEXT_PUBLIC_SITE_URL = "https://storefront.test";
    process.env.SITE_INDEXING_ENABLED = "true";
});
afterEach(() => { process.env = { ...originalEnv }; global.fetch = originalFetch; });

function fixture(count, type = "post") {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1, type, slug: `material-${index + 1}`,
        date: new Date(Date.UTC(2026, 9, 19 - index)).toISOString(),
        modified: "2026-10-19T00:00:00", title: { rendered: `Материал ${index + 1}` },
        excerpt: { rendered: "Описание" }, content: { rendered: "Текст" },
        headless_seo: { noindex: false }, acf: {},
    }));
}

function mockWp({ posts = [], projects = [], onRequest } = {}) {
    const calls = [];
    global.fetch = async (input) => {
        const url = new URL(input);
        calls.push(url);
        const custom = onRequest?.(url);
        if (custom) return custom;
        const collection = url.pathname.split("/").at(-1);
        let items = collection === "posts" ? posts : collection === "portfolio_project" ? projects : [];
        const include = url.searchParams.get("include");
        if (include) {
            const ids = include.split(",").map(Number);
            items = ids.flatMap((id) => items.filter((item) => item.id === id));
        }
        const slug = url.searchParams.get("slug");
        if (slug) items = items.filter((item) => item.slug === slug);
        const perPage = Number(url.searchParams.get("per_page") || 10);
        const page = Number(url.searchParams.get("page") || 1);
        const headers = { "X-WP-Total": String(items.length), "X-WP-TotalPages": String(Math.ceil(items.length / perPage)) };
        if (page > Math.max(1, Math.ceil(items.length / perPage))) return new Response("Invalid page", { status: 400 });
        let result = items.slice((page - 1) * perPage, page * perPage);
        if (url.searchParams.has("_fields")) result = result.map(({ id, slug, date, modified, headless_seo, acf }) => ({ id, slug, date, modified, headless_seo, acf }));
        return new Response(JSON.stringify(result), { headers });
    };
    return calls;
}

function loadContent(overrides = {}) {
    return createLoader({ "@src/lib/woo/products": { getPrimaryRelatedProductsByIds: async () => [] }, ...overrides })("src/lib/wp/content.ts");
}

for (const count of [0, 1, 100, 101, 250, 701]) {
    test(`REST обходит всю коллекцию из ${count} материалов, сохраняя порядок`, async () => {
        const calls = mockWp({ posts: fixture(count) });
        const { wpPublicGetAll } = createLoader()("src/lib/wp/client.ts");
        const items = await wpPublicGetAll("posts", { status: "publish", per_page: 7, page: 99 });
        assert.deepEqual(items.map((item) => item.id), Array.from({ length: count }, (_, index) => index + 1));
        assert.deepEqual(calls.map((url) => Number(url.searchParams.get("page"))), Array.from({ length: Math.max(1, Math.ceil(count / 100)) }, (_, index) => index + 1));
        assert.ok(calls.every((url) => url.searchParams.get("per_page") === "100"));
    });
}

test("ошибка второй REST-страницы и изменившиеся totals не возвращают усечённый результат", async () => {
    mockWp({ posts: fixture(101), onRequest: (url) => url.searchParams.get("page") === "2" ? new Response("Unavailable", { status: 503 }) : undefined });
    await assert.rejects(createLoader()("src/lib/wp/client.ts").wpPublicGetAll("posts"), /503/);
    mockWp({ posts: fixture(101), onRequest: (url) => url.searchParams.get("page") === "2"
        ? new Response(JSON.stringify(fixture(1)), { headers: { "X-WP-Total": "102", "X-WP-TotalPages": "2" } }) : undefined });
    await assert.rejects(createLoader()("src/lib/wp/client.ts").wpPublicGetAll("posts"), /changed during pagination/);
});

test("отсутствующие заголовки и дубли между страницами обнаруживаются", async () => {
    mockWp({ onRequest: () => new Response(JSON.stringify(fixture(1))) });
    await assert.rejects(createLoader()("src/lib/wp/client.ts").wpPublicGetAll("posts"), /Incomplete WP collection/);
    mockWp({ posts: fixture(101), onRequest: (url) => url.searchParams.get("page") === "2"
        ? new Response(JSON.stringify(fixture(1)), { headers: { "X-WP-Total": "101", "X-WP-TotalPages": "2" } }) : undefined });
    await assert.rejects(createLoader()("src/lib/wp/client.ts").wpPublicGetAll("posts"), /Incomplete WP collection/);
});

test("архив из 101 статьи выдаёт 12 карточек за страницу и все старые записи без дублей", async () => {
    const calls = mockWp({ posts: fixture(101) });
    const content = loadContent();
    const ids = [];
    for (let page = 1; page <= 9; page++) {
        const result = await content.getWpPostsPage(page);
        assert.equal(result.total, 101);
        assert.equal(result.totalPages, 9);
        assert.equal(result.items.length, page === 9 ? 5 : 12);
        ids.push(...result.items.map((item) => item.id));
    }
    assert.deepEqual(ids, fixture(101).map((item) => item.id));
    assert.ok(calls.filter((url) => url.searchParams.has("include")).every((url) => url.searchParams.get("include").split(",").length <= 12));
    assert.ok(calls.filter((url) => !url.searchParams.has("include")).every((url) => url.searchParams.has("_fields") && !url.searchParams.has("_embed")));
    assert.deepEqual((await content.getWpPostsPage(10)).items, []);
    await assert.rejects(content.getWpPostsPage(0), /Invalid content page/);
});

test("пустой архив остаётся первой страницей без карточек", async () => {
    const calls = mockWp();
    const result = await loadContent().getWpPostsPage();
    assert.deepEqual(result, { items: [], page: 1, total: 0, totalPages: 1 });
    assert.equal(calls.length, 1);
});

test("старые проекты сортируются по глобальному ACF-порядку до разбиения на страницы", async () => {
    const projects = fixture(101, "portfolio_project");
    projects[100].acf.portfolio_card_order = "10";
    projects[98].acf.portfolio_card_order = 3;
    projects[99].acf.portfolio_card_order = "3";
    projects[97].acf.portfolio_card_order = 0;
    projects[96].acf.portfolio_card_order = -1;
    projects[0].acf.portfolio_card_order = "";
    mockWp({ projects });
    const content = loadContent();
    const ids = [];
    for (let page = 1; page <= 9; page++) ids.push(...(await content.getWpPortfolioProjectsPage(page)).items.map((item) => item.id));
    assert.deepEqual(ids, [101, 99, 100, 98, 97, ...Array.from({ length: 96 }, (_, index) => index + 1)]);
});

test("sitemap содержит старые статьи/проекты и применяет их noindex/Canonical после границы 100", async () => {
    const posts = fixture(104);
    const projects = fixture(104, "portfolio_project");
    for (const items of [posts, projects]) {
        items[101].headless_seo.noindex = true;
        items[102].headless_seo.canonical_url = "/kontakty";
    }
    const calls = mockWp({ posts, projects });
    const entries = await loadContent().getWpContentSitemapEntries();
    for (const prefix of ["/novosti-i-stati", "/portfolio"]) {
        const materials = entries.filter((entry) => entry.path.startsWith(`${prefix}/`));
        assert.equal(materials.length, 102);
        assert.ok(materials.some((entry) => entry.path === `${prefix}/material-101`));
        assert.ok(materials.some((entry) => entry.path === `${prefix}/material-104`));
        assert.ok(!materials.some((entry) => /material-10[23]$/.test(entry.path)));
        assert.equal(materials[0].modified, "2026-10-19T00:00:00");
    }
    assert.ok(calls.filter((url) => /posts|portfolio_project/.test(url.pathname)).every((url) => !url.searchParams.has("_embed")));
});

test("sitemap отклоняет сбой последующей REST-страницы вместо публикации неполного списка", async () => {
    mockWp({ posts: fixture(101), onRequest: (url) => url.searchParams.get("page") === "2" ? new Response("Unavailable", { status: 503 }) : undefined });
    await assert.rejects(loadContent().getWpContentSitemapEntries(), /503/);
});

test("верхний маршрут sitemap сохраняет глобальный запрет и не скрывает ошибку WP-коллекции", async () => {
    const expected = new Error("Incomplete WP collection: posts");
    let contentCalls = 0;
    const load = createLoader({
        "@src/lib/home/wp-homepage": { getWpHomepageContent: async () => ({ seo: {} }) },
        "@src/lib/woo/products": {
            getDoorSitemapCategories: async () => [], getDoorSeoLandingSitemapEntries: async () => [], getDoorSitemapProducts: async () => [],
        },
        "@src/lib/wall-panels/content": { getWallPanelsPageContent: async () => ({ path: "/stenovye-paneli", productIds: [] }) },
        "@src/lib/wall-panels/products": { getWallPanelProductsByIds: async () => [] },
        "@src/lib/wp/content": { getWpContentSitemapEntries: async () => { contentCalls++; throw expected; } },
    });
    const sitemap = load("src/app/sitemap.ts").default;
    process.env.SITE_INDEXING_ENABLED = "false";
    assert.deepEqual(await sitemap(), []);
    assert.equal(contentCalls, 0);
    process.env.SITE_INDEXING_ENABLED = "true";
    const originalError = console.error;
    const logged = [];
    console.error = (...args) => logged.push(args);
    try { await assert.rejects(sitemap(), (error) => error === expected); }
    finally { console.error = originalError; }
    assert.equal(contentCalls, 1);
    assert.equal(logged[0][1], expected);
});

for (const collection of ["posts", "portfolio_project"]) {
    test(`навигация ${collection} за границей 100 загружает только двух соседей`, async () => {
        const items = fixture(103, collection === "posts" ? "post" : "portfolio_project");
        const calls = mockWp({ posts: collection === "posts" ? items : [], projects: collection === "portfolio_project" ? items : [] });
        const content = loadContent();
        const result = collection === "posts" ? await content.getWpPostBySlug("material-101") : await content.getWpPortfolioProjectBySlug("material-101");
        assert.equal(result.navigation.previous.id, 102);
        assert.equal(result.navigation.next.id, 100);
        const includeCalls = calls.filter((url) => url.searchParams.has("include"));
        assert.equal(includeCalls.length, 1);
        assert.equal(includeCalls[0].searchParams.get("include"), "102,100");
    });
}

test("главная по-прежнему запрашивает только три статьи", async () => {
    const calls = mockWp({ posts: fixture(101) });
    assert.equal((await loadContent().getWpPosts(3)).length, 3);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].searchParams.get("per_page"), "3");
});

test("URL пагинации, невалидные параметры и ограниченное число ссылок", () => {
    const { parseContentPage, contentPagePath, contentPaginationPages } = createLoader()("src/lib/content/pagination.ts");
    assert.equal(parseContentPage(undefined), 1);
    assert.equal(parseContentPage("123"), 123);
    for (const value of ["", "0", "-1", "1.5", "01", "2abc", "1e3", "9007199254740992", ["1", "2"]]) assert.equal(parseContentPage(value), null);
    assert.equal(contentPagePath("/portfolio", 1), "/portfolio");
    assert.equal(contentPagePath("/portfolio", 9), "/portfolio?page=9");
    assert.deepEqual(contentPaginationPages({ page: 500, totalPages: 1000 }), [1, 498, 499, 500, 501, 502, 1000]);
});

test("Canonical и OG URL каждой страницы списка указывают на неё, WP noindex и глобальный запрет сохраняются", async () => {
    mockWp({ onRequest: (url) => url.pathname.endsWith("/pages") ? new Response(JSON.stringify([{ id: 1, slug: "portfolio", headless_seo: { title: "Точный Title", noindex: true } }])) : undefined });
    const content = loadContent();
    for (const page of [1, 2, 9]) {
        const meta = await content.buildWpArchiveMetadata({ slug: "portfolio", path: "/portfolio", title: "Портфолио", description: "Описание", page });
        assert.equal(meta.alternates.canonical, `https://storefront.test/portfolio${page === 1 ? "" : `?page=${page}`}`);
        assert.equal(meta.openGraph.url, meta.alternates.canonical);
        assert.equal(meta.robots.index, false);
        assert.deepEqual(meta.title, { absolute: "Точный Title" });
    }
    process.env.SITE_INDEXING_ENABLED = "false";
    assert.equal((await content.buildWpArchiveMetadata({ slug: "portfolio", path: "/portfolio", title: "T", description: "D", page: 2 })).robots.index, false);
});

test("пагинация рендерит ссылки без JavaScript с корректными первой/следующей страницами", () => {
    const Link = ({ children, prefetch, ...props }) => React.createElement("a", props, children);
    const { ContentArchivePagination } = createLoader({ "next/link": { default: Link } })("src/components/content/ContentArchivePagination.tsx");
    const html = renderToStaticMarkup(React.createElement(ContentArchivePagination, { path: "/portfolio", page: 2, totalPages: 10 }));
    assert.match(html, /href="\/portfolio"[^>]*rel="prev"/);
    assert.match(html, /href="\/portfolio\?page=3"/);
    assert.match(html, /aria-current="page"/);
    assert.equal(renderToStaticMarkup(React.createElement(ContentArchivePagination, { path: "/portfolio", page: 1, totalPages: 1 })), "");
});

for (const [routePath, method] of [["src/app/novosti-i-stati/page.tsx", "getWpPostsPage"], ["src/app/(kompaniya)/portfolio/page.tsx", "getWpPortfolioProjectsPage"]]) {
    test(`${routePath}: ошибочный номер/выход за диапазон вызывают 404, ошибка WP не становится пустым архивом`, async () => {
        const calls = [];
        let unavailable = false;
        const route = createLoader({
            "next/navigation": { notFound: () => { throw new Error("NOT_FOUND"); } },
            "@src/components/content/KallesContentViews": { KallesNewsArchivePage: () => null, KallesPortfolioArchivePage: () => null },
            "@src/lib/wp/content": {
                [method]: async (page) => {
                    calls.push(page);
                    if (unavailable) throw new Error("WP_UNAVAILABLE");
                    return { items: [], page, totalPages: 9, total: 101 };
                },
            },
        })(routePath).default;
        for (const page of ["0", "abc", ["1", "2"]]) await assert.rejects(route({ searchParams: Promise.resolve({ page }) }), /NOT_FOUND/);
        assert.equal(calls.length, 0);
        await assert.rejects(route({ searchParams: Promise.resolve({ page: "10" }) }), /NOT_FOUND/);
        const element = await route({ searchParams: Promise.resolve({ page: "9" }) });
        assert.equal(element.props.pagination.page, 9);
        unavailable = true;
        await assert.rejects(route({ searchParams: Promise.resolve({ page: "1" }) }), /WP_UNAVAILABLE/);
    });
}
