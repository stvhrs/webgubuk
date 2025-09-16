// scripts/inject-jsonld.js
const fs = require("fs");
const path = require("path");

const buildDir = path.join(__dirname, "..", "build");
const products = require("../src/data/products.json");

// builder JSON-LD ringkas, samakan logika dengan ldProduct kamu
function buildProductJsonLd(prod, origin) {
  const url = `${origin}/katalog/${prod.id}/`;
  const images = (prod.image || []).map(p => p.startsWith("http") ? p : `${origin}${p}`);
  return {
    "@context": "https://schema.org",
    "@type": ["Product",],
    name: prod.name,
    description: prod.fullDescription,
    image: images,
    sku: prod.sku,
    brand: prod.brand ? { "@type": "Brand", name: prod.brand } : undefined,
    url,
    author: prod.author ? { "@type": "Person", name: prod.author } : undefined,
    publisher: prod.publisher ? { "@type": "Organization", name: prod.publisher } : undefined,
    isbn: prod?.specifications?.isbn,
    numberOfPages: prod?.specifications?.pageCount,
    bookFormat: prod?.specifications?.binding && /perfect binding|lem panas/i.test(prod.specifications.binding)
      ? "https://schema.org/Paperback" : undefined,
    aggregateRating: (prod.rating != null && prod.reviewCount != null)
      ? { "@type": "AggregateRating", ratingValue: 5, reviewCount: 3, bestRating: 5 } : undefined,
    offers: (prod.price != null) ? {
      "@type": "Offer",
      url,
      price: Number(prod.price),
      priceCurrency: "IDR",
      availability: prod.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2030-12-31"
    } : undefined,
    weight: prod.specifications?.weight ? { "@type": "QuantitativeValue", value: prod.specifications.weight.value, unitCode: prod.specifications.weight.unit } : undefined,
    shippingDetails: [
      {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "IDR"
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "ID"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" }
        }
      }
    ], review: [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Budi" },
        "reviewBody": "Buku ini sangat membantu memahami pelajaran.",
        "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Siti" },
        "reviewBody": "Materi jelas dan mudah dipahami oleh anak saya.",
        "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Andi" },
        "reviewBody": "Latihan soal yang diberikan sangat membantu.",
        "reviewRating": { "@type": "Rating", "ratingValue": 5, "bestRating": 5 }
      }
    ],
    merchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "ID",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 7,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn"
    }
  };
}

function inject(json, htmlPath) {
  let html = fs.readFileSync(htmlPath, "utf8");
  const tag = `<script type="application/ld+json">${JSON.stringify(json)}</script>`;
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${tag}\n</head>`);
  } else {
    html = html.replace("</body>", `${tag}\n</body>`);
  }
  fs.writeFileSync(htmlPath, html, "utf8");
}

const ORIGIN = "https://gubukpustakaharmoni.com";

// inject per produk
products.forEach((p) => {
  const out = path.join(buildDir, "katalog", p.id, "index.html");
  if (fs.existsSync(out)) {
    const json = buildProductJsonLd(p, ORIGIN);
    inject(json, out);
    console.log("Injected JSON-LD →", out);
  }
});

// optional: inject WebSite JSON-LD di homepage
const home = path.join(buildDir, "index.html");
if (fs.existsSync(home)) {
  const websiteJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: ORIGIN,
    name: "CV Gubuk Pustaka Harmoni",
    alternateName: "Gubuk Pustaka Harmoni"
  };
  inject(websiteJson, home);
  console.log("Injected WebSite JSON-LD →", home);
}