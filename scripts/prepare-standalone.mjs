import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const serverFile = path.join(standaloneDir, "server.js");
const staticSource = path.join(root, ".next", "static");
const staticTarget = path.join(standaloneDir, ".next", "static");
const publicSource = path.join(root, "public");
const publicTarget = path.join(standaloneDir, "public");

async function assertExists(target, label) {
  try {
    await access(target);
  } catch {
    throw new Error(`${label} not found: ${target}`);
  }
}

async function replaceDirectory(source, target) {
  await rm(target, { recursive: true, force: true });
  await mkdir(path.dirname(target), { recursive: true });
  await cp(source, target, { recursive: true, force: true });
}

await assertExists(serverFile, "Standalone server");
await assertExists(staticSource, "Next static assets");
await assertExists(publicSource, "Public assets");

await replaceDirectory(staticSource, staticTarget);
await replaceDirectory(publicSource, publicTarget);

console.log(`Standalone runtime prepared: ${standaloneDir}`);
