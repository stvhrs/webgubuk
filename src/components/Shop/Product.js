import React, { Fragment, Suspense } from "react";
import { useParams } from "react-router-dom";
import allProducts from "../../data/products.json";

import Preloader from "../../elements/Preloader";
import ProductImageDescription from "./ProductImageDescription";

// Masih boleh pakai Helmet untuk OG/Title/Canonical, tapi JSON-LD kita sematkan manual
import SEO, { ldProduct, ldBreadcrumb } from "../seo";
import SameSubjectProductSlider from "./RelatedProductSlider";
import JsonLd from "../JsonLd";

const Breadcrumb = React.lazy(() => import("../Breadcrumb"));
const ORIGIN = "https://gubukpustakaharmoni.com";

// Helpers
const abs = (rel) => (rel?.startsWith("http") ? rel : `${ORIGIN}${rel}`);

const parseWeight = (weightString = "") => {
  const match = weightString.match(/(\d+)\s*gram/i);
  return match ? { value: parseInt(match[1], 10), unit: "GRM" } : undefined;
};

// Kembalikan "Paperback" (tanpa prefix). Builder ldProduct yang menambahkan prefix schema
const getBookFormat = (bindingString = "") => {
  const s = bindingString.toLowerCase();
  if (s.includes("lem panas") || s.includes("perfect binding")) return "Paperback";
  return undefined;
};

const Product = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === id);


  // 404 fallback — jangan akses product.* di sini
  if (!product) {
    const notFoundUrl = `${ORIGIN}/katalog/${id || ""}/`;
    return (
      <Fragment>
        <SEO
          title="Produk Tidak Ditemukan"
          description="Halaman produk yang Anda cari tidak tersedia."
          canonical={notFoundUrl}
          url={notFoundUrl}
        />
        <div style={{ textAlign: "center", padding: "100px" }}>
          <h2>404 - Produk Tidak Ditemukan</h2>
          <p>Maaf, produk yang Anda cari tidak ada.</p>
        </div>
      </Fragment>
    );
  }

  // Aman digunakan karena product sudah ada
  const canonicalUrl = `${ORIGIN}/katalog/${product.id}/`;
  const images = (product.image || []).map(abs);
  const bookWeight = parseWeight(product?.specifications?.weight || "");
  const bookFormat = getBookFormat(product?.specifications?.binding || "");
  const productMapel = product?.tag?.length ? product.tag[0] : null;

  // Siapkan JSON-LD (Breadcrumb + Product/Book) — ini yang akan DISEMATKAN LANGSUNG
  const breadcrumbJsonLd = ldBreadcrumb([
    { name: "Beranda", url: `${ORIGIN}/` },
    { name: "Katalog", url: `${ORIGIN}/katalog/` },
    { name: product.name, url: canonicalUrl },
  ]);

  const productJsonLd = ldProduct({
    // Umum
    name: product.name,
    description: product.fullDescription,
    images,
    sku: product.sku,
    brand: product.brand,
    url: canonicalUrl,

    // Harga
    price: product.price,

    // Rating (harus sama dengan UI)
    ratingValue: product.rating,
    reviewCount: product.reviewCount,

    // Stok
    availability:
      product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

    // Spesifik buku
    authorName: product.author,
    priceValidUntil: "2030-12-31",

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
    publisherName: product.publisher,
    isbn: product?.specifications?.isbn,
    numberOfPages: product?.specifications?.pageCount,
    weight: bookWeight,        // { value, unit: "GRM" } → builder mengubah ke QuantitativeValue
    bookFormat: bookFormat,    // "Paperback" → builder menambahkan prefix
  });

  return (
    <Fragment>
      {/* === JSON-LD DISISIPKAN LANGSUNG (di luar Helmet & sebelum Suspense) === */}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={productJsonLd} />

      {/* OG/Title/Canonical via Helmet (aman kalau telat pun) */}
      <SEO
        title={product.name}
        description={product.shortDescription}
        image={images[0]}
        canonical={canonicalUrl}
        url={canonicalUrl}
      />

      {/* Konten halaman — boleh lazy/Suspense */}
      <Suspense fallback={<Preloader />}>
        <Breadcrumb title={product.name} useKatalog={true} />
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />
        <SameSubjectProductSlider
          spaceBottomClass="pb-95"
          currentProductMapel={productMapel}
          currentProductId={product.id}
          allProducts={allProducts}
        />
      </Suspense>
    </Fragment>
  );
};

export default Product;
