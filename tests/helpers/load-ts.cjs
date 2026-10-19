const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { createRequire } = require("node:module");
const ts = require("typescript");

function createTsLoader(overrides = {}) {
    const root = path.resolve(__dirname, "../..");
    const modules = new Map();
    return function load(relativePath) {
        const filename = path.join(root, relativePath);
        if (modules.has(filename)) return modules.get(filename).exports;
        const module = { exports: {} };
        modules.set(filename, module);
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

module.exports = { createTsLoader };
