// src/components/SEOProduct.jsx
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

/**
 * Helper: stringify JSON-LD safely
 */
const toJson = (obj) => JSON.stringify(obj, null, 0);

/**
 * Helper: drop empty/undefined fields (agar JSON-LD bersih)
 */
const prune = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

/**
 * JSON-LD: BreadcrumbList
 * items = [{ name, url }]
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
 * JSON-LD: Product
 * options:
 * - name, description, images[], sku, brand, url
 * - mpn (Manufacturer Part Number)
 * - price (number), priceCurrency, availability, condition, priceValidUntil
 * - ratingValue (1..5), reviewCount (int)
 * - review (object for a single review)
 * - category (array of strings)
 */// Di dalam file seo_p.jsx atau SEOProduct.jsx

export const ldProduct = ({
  name,
  description,
  images = [],
  sku,
  brand,
  url,
  
  // Harga
  price,
  salePrice, // BARU
  priceCurrency = "IDR",
  
  // Rating
  ratingValue,
  reviewCount,
  
  // Ketersediaan
  availability = "https://schema.org/InStock",
  condition = "https://schema.org/NewCondition",
  
  // Properti Buku
  authorName,
  publisherName,
  isbn,
  numberOfPages,
  bookFormat, // BARU: e.g., Paperback, Hardcover
  weight, // BARU: e.g., { value: 200, unit: "GRM" }
}) => {
  const isBook = authorName || publisherName || isbn || numberOfPages;
  const currentPrice = salePrice || price; // Utamakan harga diskon

  return prune({
    "@context": "https://schema.org",
    "@type":"Product",
    name,
    description,
    sku,
    image: images,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    url,
    
    // Properti spesifik buku
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    publisher: publisherName ? { "@type": "Organization", name: publisherName } : undefined,
    isbn,
    numberOfPages,
    bookFormat: bookFormat ? `https://schema.org/${bookFormat}` : undefined,
    weight: weight ? { "@type": "QuantitativeValue", value: weight.value, unitCode: weight.unit } : undefined,

    // Rating
    aggregateRating:
      ratingValue !== undefined && reviewCount !== undefined
        ? {
            "@type": "AggregateRating",
            ratingValue,
            ratingCount: reviewCount,
            bestRating: 5,
          }
        : undefined,
        
    // Penawaran
    offers:
      currentPrice !== undefined
        ? {
            "@type": "Offer",
            url,
            price: Number(currentPrice),
            priceCurrency,
            availability,
            itemCondition: condition,
            sku,
          }
        : undefined,
  });
};
/**
 * Optional JSON-LD helpers (pakai kalau perlu)
 */
export const ldWebsite = ({ name, url, searchUrlPattern } = {}) =>
  prune({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: searchUrlPattern
      ? {
          "@type": "SearchAction",
          target: `${searchUrlPattern}{search_term_string}`,
          "query-input": "required name=search_term_string",
        }
      : undefined,
  });

export const ldOrganization = ({ name, url, logo } = {}) =>
  prune({
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
  });

/**
 * SEOProduct component
 */
const SEOProduct = ({
  // defaults
  title = "CV. Gubuk Pustaka Harmoni ",
  titleTemplate = "Percetakan dan Penerbit",
  description = "Gubuk Pustaka Harmoni — Percetakan dan Penerbit. Layanan cetak buku, Penulisan Naskah, Design Layout Buku, dan Editorial.",
  keywords = "penerbit, percetakan, Gubuk Pustaka Harmoni, buku, poster, kalender,pt,",
  canonical = "https://gubukpustakaharmoni.com/",
  image = "https://gubukpustakaharmoni.com/assets/favicon.png",
  url = "https://gubukpustakaharmoni.com/",
  author = "CV. Gubuk Pustaka Harmoni ",

  // JSON-LD array
  jsonLd = [],
}) => {
  const fullTitle = title ? `${title} | ${titleTemplate}` : titleTemplate;

  return (
    <Helmet>
      {/* Basic */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>

      {/* Meta */}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {titleTemplate && <meta property="og:site_name" content={titleTemplate} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={title || titleTemplate} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD (one <script> per item) */}
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

SEOProduct.propTypes = {
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

export default SEOProduct;