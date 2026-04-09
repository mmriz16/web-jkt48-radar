import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { removeBackground } from "@imgly/background-removal-node";

const CACHE_DIR = path.join(process.cwd(), ".cache", "member-cutouts");
const ALLOWED_HOSTNAMES = new Set([
  "jkt48.com",
  "www.jkt48.com",
  "static.showroom-live.com",
  "cdn.idn.media",
]);
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

function isAllowedImageUrl(src: string): boolean {
  try {
    const parsed = new URL(src);
    return parsed.protocol === "https:" && ALLOWED_HOSTNAMES.has(parsed.hostname);
  } catch {
    return false;
  }
}

function getCachePath(src: string): string {
  const hash = createHash("sha256").update(src).digest("hex");
  return path.join(CACHE_DIR, `${hash}.png`);
}

async function readCachedCutout(src: string): Promise<Buffer | null> {
  const cachePath = getCachePath(src);

  try {
    const info = await stat(cachePath);
    const ageMs = Date.now() - info.mtimeMs;
    if (ageMs > ONE_DAY_IN_SECONDS * 1000) {
      return null;
    }

    return readFile(cachePath);
  } catch {
    return null;
  }
}

async function writeCachedCutout(src: string, buffer: Buffer): Promise<void> {
  const cachePath = getCachePath(src);
  await mkdir(path.dirname(cachePath), { recursive: true });
  await writeFile(cachePath, buffer);
}

async function generateCutout(src: string): Promise<Buffer> {
  const cached = await readCachedCutout(src);
  if (cached) {
    return cached;
  }

  const blob = await removeBackground(src, {
    model: "medium",
    output: {
      format: "image/png",
    },
  });

  const arrayBuffer = await blob.arrayBuffer();
  const result = Buffer.from(arrayBuffer);
  await writeCachedCutout(src, result);
  return result;
}

export async function getMemberCutout(src: string): Promise<Buffer | null> {
  if (!isAllowedImageUrl(src)) {
    return null;
  }

  try {
    return await generateCutout(src);
  } catch {
    return null;
  }
}

export function buildMemberCutoutUrl(src: string | undefined): string | undefined {
  if (!src || !isAllowedImageUrl(src)) {
    return src;
  }

  return `/api/member-cutout?src=${encodeURIComponent(src)}`;
}

export function getMemberCutoutCacheControl(): string {
  return `public, max-age=${ONE_DAY_IN_SECONDS}, s-maxage=${ONE_DAY_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`;
}
