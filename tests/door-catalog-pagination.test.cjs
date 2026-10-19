const assert = require("node:assert/strict");
const { test, beforeEach, afterEach } = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { createTsLoader } = require("./helpers/load-ts.cjs");

const originalEnv = { ...process.env };
beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://storefront.test";
    process.env.SITE_INDEXING_ENABLED = "true";
});
afterEach(() => { process.env = { ...originalEnv }; });

const root = { id: 77, slug: "mezhkomnatnye-dveri", name: "Двери", parent: 0, path: "/mezhkomnatnye-dveri", seo: {} };
const child = { id: 78, slug: "skrytye-dveri", name: "Скрытые", parent: 77, path: "/mezhkomnatnye-dveri/skrytye", seo: {} };
const dictionary = {
    "tsvet-dveri": [{ id: 10, slug: "white", name: "Белый" }, { id: 11, slug: "black", name: "Чёрный" }],
    naznachenie: [{ id: 20, slug: "ofisnye", name: "Офисные" }],
};
const definitions = Object.keys(dictionary).map(key => ({ key, label: key, taxonomy: `pa_${key}`, collapsedVisibleCount: 0 }));
const landing = {
    id: 877, path: `${child.path}/ofisnye`, slug: "ofisnye", title: "Офисные", h1: "Офисные двери", intro: "Описание",
    baseCategory: child, baseCategoryInfo: child, seo: {}, enabled: true, valid: true, status: "publish",
    rules: [{ filterKey: "naznachenie", taxonomy: "pa_naznachenie", terms: [{ id: 20, slug: "ofisnye", name: "Офисные" }] }],
    faq: [], relatedIds: [], contentHtml: "",
};

function products(count) {
    // Equal dates exercise preservation of the deterministic date DESC, ID DESC REST order.
    return Array.from({ length: count }, (_, index) => ({
        id: count - index, slug: `door-${count - index}`, name: `Дверь ${count - index}`, sku: "", price: "1000",
        type: "simple", status: "publish", date_created: "2026-10-19T00:00:00",
        categories: [child], images: [], attributes: [], meta_data: [], headless_seo: {},
    }));
}

function catalogService(count, matchedIds) {
    const items = products(count);
    const calls = [];
    const states = [];
    const load = createTsLoader({
        "@src/lib/woo/client": { wooGetList: async (path, query) => {
            calls.push({ path, query });
            const all = path === "products/categories" ? [root, child] : items;
            const start = (query.page - 1) * query.per_page;
            return { items: all.slice(start, start + query.per_page), total: all.length, totalPages: Math.ceil(all.length / query.per_page) };
        } },
        "@src/lib/wp/door-seo-landings": {
            getDoorCatalogFilterContract: async () => ({ definitions, termDictionary: dictionary }),
            getDoorCatalogProductIds: async state => { states.push(state); return matchedIds ?? items.map(item => item.id); },
        },
    });
    return { ...load("src/lib/woo/products.ts"), calls, states };
}

for (const count of [0, 1, 30, 31, 60, 61, 131]) {
    test(`${count} товаров: полная выборка, порции по 30, точные totals и отсутствие дублей`, async () => {
        const service = catalogService(count);
        const collected = [];
        const pages = Math.max(1, Math.ceil(count / 30));
        for (let page = 1; page <= pages; page++) {
            const result = await service.getCatalogProducts({ type: "doors", page, perPage: 30 });
            assert.equal(result.total, count);
            assert.equal(result.totalPages, pages);
            assert.equal(result.page, page);
            assert.equal(result.perPage, 30);
            assert.equal(result.items.length, Math.min(30, count - (page - 1) * 30));
            collected.push(...result.items.map(item => item.id));
        }
        assert.deepEqual(collected, products(count).map(item => item.id));
        assert.equal(new Set(collected).size, count);
        const rest = service.calls.filter(call => call.path === "products");
        assert.ok(rest.every(call => call.query.per_page === 100 && call.query.orderby === "date" && call.query.order === "desc"));
        if (count > 100) assert.ok(rest.some(call => call.query.page === 2));
    });
}

test("matching WP применяется к полному набору до нарезки; порядок ID ответа matching не меняет порядок карточек", async () => {
    const matching = Array.from({ length: 70 }, (_, index) => 2 + index * 2);
    const service = catalogService(140, matching);
    const filters = { "tsvet-dveri": ["white", "black"], naznachenie: ["ofisnye"] };
    const result = await service.getCatalogProducts({ type: "doors", categorySlug: child.slug, page: 3, perPage: 30, filters });
    assert.equal(result.total, 70);
    assert.equal(result.totalPages, 3);
    assert.deepEqual(result.items.map(item => item.id), [20, 18, 16, 14, 12, 10, 8, 6, 4, 2]);
    assert.deepEqual(service.states[0], { categoryId: 78, selectedTermsByFilter: { naznachenie: [20], "tsvet-dveri": [10, 11] } });
});

test("дефолтный размер и подмена страницы в сервисе/BFF остаются совместимыми", async () => {
    const service = catalogService(31);
    const result = await service.getCatalogProducts({ type: "doors", page: 999 });
    assert.equal(result.perPage, 24);
    assert.equal(result.page, 2);
    assert.equal(result.items.length, 7);
});

test("URL сохраняет несколько значений фильтра и page не попадает в FilterState", () => {
    const load = createTsLoader();
    const { buildDoorCatalogPagePath, parseDoorCatalogPage, DOOR_CATALOG_PAGE_SIZE } = load("src/lib/woo/catalog-pagination.ts");
    const { parseDoorCatalogFiltersFromSearchParams } = load("src/lib/woo/catalog-filters.ts");
    const filters = { "tsvet-dveri": ["white", "black"], naznachenie: ["ofisnye"] };
    const url = new URL(buildDoorCatalogPagePath(child.path, filters, 2), "https://storefront.test");
    assert.equal(url.searchParams.get("page"), "2");
    assert.deepEqual(url.searchParams.getAll("tsvet-dveri"), ["black", "white"]);
    assert.equal(url.searchParams.get("naznachenie"), "ofisnye");
    assert.ok(!buildDoorCatalogPagePath(child.path, filters, 1).includes("page="));
    assert.equal(DOOR_CATALOG_PAGE_SIZE, 30);
    assert.equal(load("src/lib/content/pagination.ts").CONTENT_PAGE_SIZE, 12);
    assert.equal(parseDoorCatalogPage(undefined), 1);
    for (const value of ["0", "-1", "abc", "01", "1.2", "1e2", "", ["2", "3"], "9007199254740992"]) assert.equal(parseDoorCatalogPage(value), null);
    assert.deepEqual(parseDoorCatalogFiltersFromSearchParams({ page: "2", "tsvet-dveri": "white" }, Object.keys(dictionary)), { "tsvet-dveri": ["white"] });
});

test("чистая категория/landing имеют self-canonical, фильтры сохраняют прежний canonical/noindex", () => {
    const { buildDoorCategoryMetadata, buildDoorSeoLandingMetadata } = createTsLoader()("src/lib/seo/site.ts");
    for (const page of [1, 2, 10]) {
        const suffix = page === 1 ? "" : `?page=${page}`;
        for (const category of [root, child]) {
            const meta = buildDoorCategoryMetadata(category, {}, undefined, page);
            assert.equal(meta.alternates.canonical, `https://storefront.test${category.path}${suffix}`);
            assert.equal(meta.openGraph.url, meta.alternates.canonical);
            assert.equal(meta.robots.index, true);
        }
        assert.equal(buildDoorSeoLandingMetadata(landing, {}, 61, page).alternates.canonical, `https://storefront.test${landing.path}${suffix}`);
        const filtered = buildDoorCategoryMetadata(child, { "tsvet-dveri": ["white"] }, landing.path, page);
        assert.equal(filtered.alternates.canonical, `https://storefront.test${landing.path}`);
        assert.equal(filtered.robots.index, false);
        for (const filters of [{ "tsvet-dveri": ["white"] }, { naznachenie: ["ofisnye"] }]) {
            const residual = buildDoorSeoLandingMetadata(landing, filters, 31, page);
            assert.equal(residual.alternates.canonical, `https://storefront.test${landing.path}`);
            assert.equal(residual.robots.index, false);
        }
    }
    assert.equal(buildDoorSeoLandingMetadata(landing, {}, 0, 2).robots.index, false);
    const seo = { title: "Точный WP Title", noindex: true };
    const wpMeta = buildDoorCategoryMetadata({ ...child, seo }, {}, undefined, 2);
    assert.deepEqual(wpMeta.title, { absolute: seo.title });
    assert.equal(wpMeta.robots.index, false);
    assert.equal(buildDoorSeoLandingMetadata({ ...landing, seo }, {}, 31, 2).robots.index, false);
    process.env.SITE_INDEXING_ENABLED = "false";
    assert.equal(buildDoorCategoryMetadata(child, {}, undefined, 2).robots.index, false);
    assert.equal(buildDoorSeoLandingMetadata(landing, {}, 31, 2).robots.index, false);
});

const Link = ({ children, prefetch, ...props }) => React.createElement("a", props, children);
test("SSR-навигация содержит обычные ссылки, фильтры, якорь сетки и только допустимые Назад/Далее", () => {
    const { CatalogPagination } = createTsLoader({ "next/link": { default: Link } })("src/components/storefront/CatalogPagination.tsx");
    const render = (page, totalPages, filters = {}) => renderToStaticMarkup(React.createElement(CatalogPagination, { path: child.path, filters, page, totalPages }));
    assert.equal(render(1, 1), "");
    assert.ok(!render(1, 3).includes('rel="prev"'));
    assert.ok(!render(3, 3).includes('rel="next"'));
    const html = render(2, 4, { "tsvet-dveri": ["white", "black"] });
    assert.match(html, /aria-current="page"/);
    assert.match(html, /rel="prev"/);
    assert.match(html, /rel="next"/);
    assert.match(html, /page=3#catalog-products/);
    assert.match(html, /tsvet-dveri=black&amp;tsvet-dveri=white/);
    assert.ok(!html.includes("page=1"));
});

function routeHarness(kind) {
    const calls = [];
    const Shell = () => null;
    let count = 61;
    const load = createTsLoader({
        "next/navigation": { notFound: () => { throw new Error("NOT_FOUND"); } },
        "@src/lib/woo/products": {
            resolveDoorRoute: async () => kind === "landing" ? { kind: "seoLanding", landing } : { kind: "category", category: child },
            getDoorRootCategoryInfo: async () => root,
            resolvePreferredDoorCatalogRoute: async () => ({ canonicalPath: landing.path }),
            getCatalogProducts: async args => {
                calls.push(args);
                const totalPages = Math.max(1, Math.ceil(count / args.perPage));
                return { total: count, totalPages, page: Math.min(args.page, totalPages), perPage: args.perPage, items: [], filters: { active: args.filters, groups: [] }, currentCategory: kind === "root" ? root : child };
            },
            getDoorCatalogProductIdsForFilters: async () => Array.from({ length: count }, (_, index) => index + 1),
            getDoorSeoLandingLinksForCategory: async () => [], getDoorSeoRoutingDescriptorsForCategory: async () => [], getDoorSeoLandingLinksByIds: async () => [],
        },
        "@src/lib/wp/door-seo-landings": { getDoorCatalogFilterKeys: async () => Object.keys(dictionary) },
        "@src/components/Headers/Header": { default: () => null }, "@src/components/Headers/TopBanner": { default: () => null }, "@src/components/Footer": { default: () => null },
        "@src/components/storefront/KallesCatalog": { KallesCatalogShell: Shell },
        "@src/components/storefront/KallesDoorProductGallery": { default: () => null }, "@src/components/storefront/KallesDoorProductTabs": { default: () => null },
        "./CatalogFilters": { default: () => null }, "../CatalogFilters": { default: () => null }, "./DoorProductConfigurator": { default: () => null },
    });
    const route = load(kind === "root" ? "src/app/mezhkomnatnye-dveri/page.tsx" : "src/app/mezhkomnatnye-dveri/[...segments]/page.tsx");
    async function getShell(node) {
        if (!node) return null;
        if (node.type === Shell) return node.props;
        if (typeof node.type === "function") return getShell(await node.type(node.props));
        for (const child of React.Children.toArray(node.props?.children)) {
            const result = await getShell(child);
            if (result) return result;
        }
        return null;
    }
    const props = query => ({ params: Promise.resolve({ segments: ["skrytye", ...(kind === "landing" ? ["ofisnye"] : [])] }), searchParams: Promise.resolve(query) });
    return { route, calls, props, getShell, setCount: value => { count = value; } };
}

for (const kind of ["root", "category", "landing"]) {
    test(`${kind}: renderer использует 30, сохраняет фильтры/URL, выдаёт 404 вместо clamp`, async () => {
        const { route, calls, props, getShell, setCount } = routeHarness(kind);
        const shell = await getShell(await route.default(props({ page: "2", "tsvet-dveri": "white" })));
        assert.equal(calls[0].page, 2);
        assert.equal(calls[0].perPage, 30);
        assert.equal(shell.pagination.page, 2);
        assert.equal(shell.pagination.totalPages, 3);
        assert.equal(shell.pagination.path, kind === "root" ? root.path : kind === "landing" ? landing.path : child.path);
        assert.deepEqual(shell.pagination.filters, { "tsvet-dveri": ["white"] });
        assert.deepEqual(calls[0].filters, kind === "landing" ? { "tsvet-dveri": ["white"], naznachenie: ["ofisnye"] } : { "tsvet-dveri": ["white"] });
        assert.ok(!Object.hasOwn(calls[0].filters, "page"));
        for (const page of ["0", "abc", ["2", "3"], "4"]) {
            await assert.rejects(async () => getShell(await route.default(props({ page }))), /NOT_FOUND/);
        }
        setCount(0);
        assert.equal((await getShell(await route.default(props({})))).items.length, 0);
        await assert.rejects(async () => getShell(await route.default(props({ page: "2" }))), /NOT_FOUND/);
    });

    test(`${kind}: metadata сохраняет SEO чистой страницы 2 и запрет фильтров`, async () => {
        const { route, props } = routeHarness(kind);
        const base = kind === "root" ? root.path : kind === "landing" ? landing.path : child.path;
        assert.equal((await route.generateMetadata(props({ page: "2" }))).alternates.canonical, `https://storefront.test${base}?page=2`);
        assert.equal((await route.generateMetadata(props({ page: "1" }))).alternates.canonical, `https://storefront.test${base}`);
        const filtered = await route.generateMetadata(props({ page: "2", "tsvet-dveri": "white" }));
        assert.equal(filtered.robots.index, false);
        assert.equal(filtered.alternates.canonical, `https://storefront.test${landing.path}`);
        await assert.rejects(route.generateMetadata(props({ page: ["2", "3"] })), /NOT_FOUND/);
    });
}

test("существующий фильтр строит preferred URL без page; noscript форма также сбрасывает страницу", () => {
    const { default: CatalogFilters } = createTsLoader({ "next/link": { default: Link }, "next/navigation": { useRouter: () => ({ push: () => {} }) } })("src/app/mezhkomnatnye-dveri/CatalogFilters.tsx");
    const filters = { active: {}, groups: [{ key: "naznachenie", label: "Назначение", collapsedVisibleCount: 0, options: [{ value: "ofisnye", label: "Офисные", count: 61, selected: false, termId: 20, taxonomy: "pa_naznachenie" }] }] };
    const descriptor = { id: 877, path: landing.path, slug: "ofisnye", baseCategoryId: 78, navigationPriority: 0, rules: [{ filterKey: "naznachenie", termIds: [20] }] };
    const html = renderToStaticMarkup(React.createElement(CatalogFilters, { filters, categoryId: 78, categoryPath: child.path, landings: [descriptor] }));
    assert.ok(html.includes(`href="${landing.path}"`));
    const form = html.match(/<form\b[^>]*>/)?.[0];
    assert.ok(form?.includes('method="get"'));
    assert.ok(form?.includes(`action="${child.path}"`));
    assert.ok(!html.includes('name="page"'));
    assert.ok(!html.includes("page="));
});
