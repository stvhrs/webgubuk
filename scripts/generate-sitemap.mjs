import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** ===== CONFIG ===== */
const BASE_URL = "https://gubukpustakaharmoni.com";
const PRODUCTS_JSON = path.resolve(__dirname, "../public/assets/products.json"); // Sesuaikan path jika perlu
const OUT_DIR = path.resolve(__dirname, "../public");
const PRODUCT_PREFIX = "/katalog/";

const STATIC_PATHS = [
  { loc: "/", priority: 1.0, changefreq: "weekly" },
  { loc: "/katalog/", priority: 0.9, changefreq: "weekly" },
  { loc: "/contact/", priority: 0.9, changefreq: "weekly" },
  { loc: "/service/percetakan-penerbitan", priority: 0.9, changefreq: "weekly" },
  { loc: "/service/distributor-grosir-buku", priority: 0.9, changefreq: "weekly" },
  { loc: "/service/penulisan-desain-buku", priority: 0.9, changefreq: "weekly" },
  { loc: "/service/produksi-video-pembelajaran", priority: 0.8, changefreq: "weekly" },
  { loc: "/service/pelatihan-profesional-guru", priority: 0.8, changefreq: "weekly" },
  { loc: "/service/bimbingan-belajar", priority: 0.8, changefreq: "weekly" }
];

/** ===== UTIL ===== */
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function absolutizeAsset(p) {
  const clean = p.startsWith("/") ? p : `/${p}`;
  const parts = clean.split("/").map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg)));
  return `${BASE_URL}${parts.join("/")}`;
}

async function getLastmodFromFile(file) {
  try {
    const st = await stat(file);
    return new Date(st.mtime).toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

async function run() {
  const lastmod = await getLastmodFromFile(PRODUCTS_JSON);
  const raw = await readFile(PRODUCTS_JSON, "utf8");
  const products = JSON.parse(raw);

  const productUrls = products.map((p) => {
    // ===== PERUBAHAN DI SINI =====
    // Langsung gunakan ID produk sebagai slug
    const slug = p.id;
    // =============================

    const pagePath = `${PRODUCT_PREFIX}${slug}/`;
    const firstImage = Array.isArray(p.image) && p.image.length > 0 ? p.image[0] : null;
    const absImage = firstImage ? absolutizeAsset(firstImage) : null;

    return {
      loc: pagePath,
      lastmod,
      changefreq: "weekly",
      priority: 0.8,
      image: absImage,
    };
  });

  const urls = [...STATIC_PATHS.map((u) => ({ ...u, lastmod })), ...productUrls];

  const urlset = urls
    .map((u) => {
      const locAbs = `${BASE_URL}${u.loc}`;
      const imageTag = u.image
        ? `
    <image:image>
      <image:loc>${esc(u.image)}</image:loc>
    </image:image>`
        : "";
      return `
  <url>
    <loc>${esc(locAbs)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${imageTag}
  </url>`;
    })
    .join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlset}
</urlset>`;

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemapXml, "utf8");

  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
}

run().catch((e) => {
  console.error("❌ Failed generating sitemap:", e);
  process.exit(1);
});