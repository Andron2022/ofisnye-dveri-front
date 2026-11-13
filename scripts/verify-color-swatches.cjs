const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { execFileSync } = require("node:child_process");
const test = require("node:test");
const ts = require("typescript");

// Exercise the actual adapters without starting Next or introducing a test framework.
let transport;
const warnings = [];
function load(relativePath) {
    const source = readFileSync(resolve(__dirname, "..", relativePath), "utf8");
    const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const module = { exports: {} };
    new Function("require", "module", "exports", "console", "process", code)(
        (name) => {
            assert.equal(name, "@src/lib/woo/client");
            return { wpNamespaceGet: (...args) => transport(...args) };
        }, module, module.exports, { warn: (...args) => warnings.push(args) }, process,
    );
    return module.exports;
}
const { normalizeAttributeTermSwatches: normalize, mapDoorPdpColorSwatches: map, getDoorPdpColorSwatches: get } = load("src/lib/wp/attribute-term-swatches.ts");
const { sortDoorColorValues: sort, getDoorColorSwatch: lookup } = load("src/lib/woo/color-swatch-presentation.ts");
const taxonomy = "pa_tsvet-dveri";
const wp = "https://ofisnye-dveri.test";
const term = (id, name, extra = {}) => ({ term_id: id, taxonomy, name, slug: `term-${id}`, type: "color", color: "#abcdef", order: 0, ...extra });
const payload = (items, products = []) => ({ schema_version: 1, taxonomy, items, products });
const product = (id, name) => ({ id, attributes: { [taxonomy]: [name] } });

test("canonical term assignment controls visuals; matching labels cannot invent assignments", () => {
    const data = normalize(payload([term(10, "Дуб"), term(20, "Бетон")], [{ product_id: 1, term_ids: [20] }]), taxonomy, wp);
    assert.equal(map([product(1, "Бетон")], data, taxonomy)["Бетон"].termId, 20);
    assert.equal(Object.getPrototypeOf(map([product(1, "Бетон")], data, taxonomy)), Object.prototype);
    assert.equal(lookup({}, "constructor"), null);
    assert.equal(map([product(2, "Дуб")], data, taxonomy)["Дуб"], undefined);
    assert.equal(map([product(1, "Дуб")], data, taxonomy)["Дуб"], undefined);
});

test("invalid colors, image URLs, types and orders degrade without losing term identity", () => {
    const cases = ["javascript:alert(1)", "https://evil.example/wp-content/uploads/a.jpg", `${wp}/wp-admin/a.jpg`, `https://user:secret@ofisnye-dveri.test/wp-content/uploads/a.jpg`];
    for (const url of cases) {
        const data = normalize(payload([term(1, "Бетон", { type: "image", thumbnail_url: url, preview_url: `${wp}/wp-content/uploads/preview.jpg` })]), taxonomy, wp);
        assert.equal(data.byTermId.get(1).thumbnailUrl, null);
        assert.equal(data.byTermId.get(1).type, "image");
        assert.ok(data.diagnostics.length);
    }
    const data = normalize(payload([term(1, "Белый", { color: "red; background:url(x)", order: -5 }), term(2, "Дуб", { type: "unknown" })]), taxonomy, wp);
    assert.equal(data.byTermId.get(1).color, null);
    assert.equal(data.byTermId.get(1).order, 0);
    assert.equal(data.byTermId.get(2).type, "color");
});

test("mismatched taxonomy, duplicates and ambiguous assignments cannot produce a swatch", () => {
    assert.throws(() => normalize({ ...payload([]), taxonomy: "pa_other" }, taxonomy, wp));
    assert.throws(() => normalize(payload([term(1, "Дуб"), term(1, "Дуб")]), taxonomy, wp));
    const data = normalize(payload([term(1, "Дуб"), term(2, "Бетон")], [{ product_id: 1, term_ids: [1, 2] }, { product_id: 2, term_ids: [999] }]), taxonomy, wp);
    assert.deepEqual(Object.keys(map([product(1, "Дуб"), product(2, "Бетон")], data, taxonomy)), []);
});

test("PDP sorting uses order, name and term ID with a stable final tie break", () => {
    const swatches = { Б: { order: 0, name: "Б", termId: 1 }, А: { order: 1, name: "А", termId: 2 }, В: { order: 0, name: "Б", termId: 3 } };
    assert.deepEqual(sort(["А", "В", "Б"], swatches), ["Б", "В", "А"]);
    assert.deepEqual(sort(["В", "А", "Б"], swatches), ["Б", "В", "А"]);
    assert.deepEqual(sort(["Цвет 10", "Цвет 2"], {}), ["Цвет 2", "Цвет 10"]);
});

test("server adapter makes one public batch call and preserves PDP on REST failure", async () => {
    const calls = [];
    transport = async (...args) => { calls.push(args); return payload([term(10, "Дуб")], [{ product_id: 1, term_ids: [10] }]); };
    const result = await get([product(1, "Дуб"), product(1, "Дуб"), product(2, "Другой")]);
    assert.equal(result["Дуб"].color, "#abcdef");
    assert.deepEqual(calls, [["od/v1/attribute-term-swatches", { taxonomy, product_ids: "1,2" }, 60]]);
    transport = async () => { throw new Error("HTTP 503"); };
    assert.deepEqual(await get([product(1, "Дуб")]), {});
    transport = async () => ({ invalid: true });
    assert.deepEqual(await get([product(1, "Дуб")]), {});
});

test("LocalWP real HEX, texture sizes, canonical assignments and taxonomy allowlist", { skip: !process.argv.includes("--live") }, () => {
    const request = (path) => execFileSync("curl.exe", ["--noproxy", "*", "-k", "--silent", "--show-error", "--max-time", "20", `${wp}/wp-json/${path}`], { encoding: "utf8" });
    const raw = JSON.parse(request(`od/v1/attribute-term-swatches?taxonomy=${taxonomy}&product_ids=241,261`));
    const data = normalize(raw, taxonomy, wp);
    assert.equal(data.byTermId.get(58).color, "#dd9933");
    const texture = [...data.byTermId.values()].find((item) => item.slug === "beton-chikago-svetlo-seryy-f186-st9");
    assert.equal(texture.type, "image");
    assert.match(texture.thumbnailUrl, /-150x150\.jpg$/);
    assert.match(texture.previewUrl, /-300x200\.jpg$/);
    assert.deepEqual(data.productTerms.get(241), [texture.termId]);
    assert.equal(JSON.parse(request("od/v1/attribute-term-swatches?taxonomy=product_cat")).data.status, 400);
    assert.equal(JSON.parse(request("od/v1/attribute-term-swatches?taxonomy=pa_tsvet-dveri&product_ids=1,bad")).data.status, 400);
    const panels = JSON.parse(request("od/v1/attribute-term-swatches?taxonomy=pa_tsvet-paneli"));
    assert.equal(panels.taxonomy, "pa_tsvet-paneli");
    assert.ok(panels.items.some((item) => item.color));
    for (const url of [texture.thumbnailUrl, texture.previewUrl]) {
        const status = execFileSync("curl.exe", ["--noproxy", "*", "-k", "--silent", "--show-error", "--max-time", "20", "--output", process.platform === "win32" ? "NUL" : "/dev/null", "--write-out", "%{http_code}", url], { encoding: "utf8" });
        assert.equal(status, "200");
    }
});
