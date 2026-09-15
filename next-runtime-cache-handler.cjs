"use strict";

const rawFileSystemCache = require(
  "next/dist/server/lib/incremental-cache/file-system-cache"
);

const FileSystemCache =
  rawFileSystemCache?.default?.default ??
  rawFileSystemCache?.default ??
  rawFileSystemCache;

if (typeof FileSystemCache !== "function") {
  throw new TypeError(
    "Unsupported Next.js FileSystemCache export. Revalidate the immutable-release cache handler when upgrading Next.js."
  );
}

const IMMUTABLE_RUNTIME_FLAG = "NEXT_IMMUTABLE_RELEASE_RUNTIME";

/**
 * Keep Next.js build-time caching unchanged. In an immutable standalone
 * runtime, keep ISR/Data Cache writes in Next.js' native in-memory cache and
 * prevent writes to .next/server/app inside the read-only release.
 *
 * With flushToDisk=false Next.js still reads APP_PAGE/PAGES prerendered seed
 * artifacts from the build output, while FETCH entries start clean in memory.
 * The runtime flag is injected only after `next build` completes.
 */
module.exports = class ImmutableReleaseCacheHandler extends FileSystemCache {
  constructor(options) {
    const immutableRuntime =
      process.env[IMMUTABLE_RUNTIME_FLAG] === "true";

    super({
      ...options,
      flushToDisk: immutableRuntime ? false : options?.flushToDisk,
    });
  }
};
