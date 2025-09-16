import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// ======================================================================
// 1. HELPER UTILITAS
// ======================================================================

const toJson = (obj) => JSON.stringify(obj, null, 0);

const prune = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

// ======================================================================
// 2. KUMPULAN FUNGSI PEMBUAT JSON-LD (BISA DI-EXPORT)
// ======================================================================

/**
 * JSON-LD untuk Website
 */
export const ldWebsite = ({ name, url, alternateName }) =>
  prune({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    alternateName,
    url,
  });

/**
 * JSON-LD untuk Organisasi
 */
export const ldOrganization = ({ name, url, logo }) =>
  prune({
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
  });

/**
 * JSON-LD untuk Breadcrumbs (Jejak Navigasi)
 */
export const ldBreadcrumb = (items = []) =>
  prune({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) =>
      prune({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.url,
      })
    ),
  });

/**
 * JSON-LD untuk Produk atau Buku
 */
export const ldProduct = ({
  name,
  description,
  images = [],
  sku,
  brand,
  url,
  price,

  priceCurrency = "IDR",
  ratingValue,
  reviewCount,
  availability = "https://schema.org/InStock",
  condition = "https://schema.org/NewCondition",
  authorName,
  publisherName,
  isbn,
  numberOfPages,
  bookFormat,
  weight,
}) => {
  const isBook = authorName || publisherName || isbn || numberOfPages;
  const currentPrice = price;

  return prune({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    image: images,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    url,
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    publisher: publisherName ? { "@type": "Organization", name: publisherName } : undefined,
    isbn,
    numberOfPages,
    bookFormat: bookFormat ? `https://schema.org/${bookFormat}` : undefined,
    weight: weight ? { "@type": "QuantitativeValue", value: weight.value, unitCode: weight.unit } : undefined,
    aggregateRating:
    {
      "@type": "AggregateRating",
      "ratingValue": 5, // Sesuaikan dengan rata-rata rating dari testimonial yang ditampilkan
      "reviewCount": 3, // Sesuai dengan jumlah testimonial yang ditampilkan
      "bestRating": 5
    }
    , review: [
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
    ], priceValidUntil: "2030-12-31",

    shippingDetails: [
      {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": 0,              // 0 = gratis ongkir; ganti sesuai kebijakan
          "currency": "IDR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "ID"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" },
          "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 5, "unitCode": "DAY" }
        }
      }
    ],

    merchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "ID",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 7, // jendela retur (hari)
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    },
    offers:
    {
      "@type": "Offer",
      url,
      price: Number(currentPrice),
      priceCurrency,
      availability,
      itemCondition: condition,
      sku,
    }
    ,
  });
};

// ======================================================================
// 3. KOMPONEN UTAMA SEO
// ======================================================================

const SEO = ({
  title = "CV. Gubuk Pustaka Harmoni ",
  description = "Gubuk Pustaka Harmoni — Percetakan dan Penerbit. Layanan cetak buku, Penulisan Naskah, Design Layout Buku, dan Editorial.",
  keywords = "penerbit, percetakan, Gubuk Pustaka Harmoni, buku, poster, kalender,pt,",
  canonical = "https://gubukpustakaharmoni.com/",
  image = "https://gubukpustakaharmoni.com/assets/og-cover.jpg",
  url = "https://gubukpustakaharmoni.com/",
  author = "CV. Gubuk Pustaka Harmoni ",
  jsonLd = [], // Menerima array JSON-LD yang akan disuntikkan
}) => {
  const fullTitle = title;
  console.group("🔍 Debugging Data SEO & JSON-LD");
  console.log("Title:", fullTitle);
  console.log("Description:", description);
  console.log("Canonical URL:", canonical);

  if (jsonLd && jsonLd.length > 0) {
    console.log(`✅ Ditemukan ${jsonLd.length} objek JSON-LD:`);
    jsonLd.forEach((ldObject, index) => {
      if (ldObject) {
        console.log(`--- Objek #${index + 1} (${ldObject['@type'] || 'Tipe tidak diketahui'}) ---`);
        console.log("Data Objek:", ldObject);
        console.log("Data dalam format JSON String:", toJson(ldObject));
      } else {
        console.warn(`⚠️ Objek JSON-LD #${index + 1} bernilai null atau undefined.`);
      }
    });
  } else {
    console.log("🟡 Tidak ada data JSON-LD yang diberikan.");
  }

  console.groupEnd();
  return (
    <Helmet>
      {/* Meta tag dasar */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Menyuntikkan semua JSON-LD dari prop */}
      {jsonLd
        .filter(Boolean)
        .map((obj, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toJson(obj) }}
          />
        ))}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  jsonLd: PropTypes.arrayOf(PropTypes.object),
};

export default SEO;