import React, { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Preloader from "../../elements/Preloader";
import ProductImageDescription from "./ProductImageDescription";

// 1. Impor yang sudah diperbarui: Hanya dari satu file SEO terpusat.
// Pastikan path-nya sudah sesuai dengan struktur folder Anda.
import SEO, { ldProduct, ldBreadcrumb } from "../seo";
import SameSubjectProductSlider from "./RelatedProductSlider";

const Breadcrumb = React.lazy(() => import("../Breadcrumb"));
const ORIGIN = "https://gubukpustakaharmoni.com";

// Helper untuk URL absolut
const abs = (rel) => (rel?.startsWith("http") ? rel : `${ORIGIN}${rel}`);

// Helper untuk mem-parsing berat buku
const parseWeight = (weightString = "") => {
  const match = weightString.match(/(\d+)\s*gram/i);
  if (match) {
    return { value: parseInt(match[1], 10), unit: "GRM" };
  }
  return null;
};

// Helper untuk memetakan jenis jilid ke tipe schema
const getBookFormat = (bindingString = "") => {
  if (bindingString.toLowerCase().includes("lem panas") || bindingString.toLowerCase().includes("perfect binding")) {
    return "Paperback";
  }
  return null;
};


const Product = () => {
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(p => p.id === id);

  if (!product) {
    return <Preloader />;
  }

  // 2. Data SEO disiapkan secara lengkap
  const canonicalUrl = `${ORIGIN}/katalog/${product.id}/`;
  const images = (product.image || []).map(abs);
  const bookWeight = parseWeight(product.specifications.weight);
  const bookFormat = getBookFormat(product.specifications.binding);
  const productMapel = product.tag && product.tag.length > 0 ? product.tag[0] : null;

  return (
    <Fragment>
      {/* 3. Komponen SEO diterapkan dengan semua data yang relevan */}
      <SEO
        // Meta Tags Dasar & Open Graph
        title={product.name}

        description={product.shortDescription}
        image={images[0]}
        canonical={canonicalUrl}
        url={canonicalUrl}


        // JSON-LD untuk halaman produk ini
        jsonLd={[
          ldBreadcrumb([
            { name: "Beranda", url: `${ORIGIN}/` },
            { name: "Katalog", url: `${ORIGIN}/katalog/` },
            { name: product.name, url: canonicalUrl }
          ]),
          ldProduct({
            // Properti Umum
            name: product.name,
            description: product.fullDescription,
            images: images,
            sku: product.sku,
            brand: product.brand,
            url: canonicalUrl,

            // Properti Harga
            price: product.price,


            // Properti Rating
            ratingValue: product.rating,
            reviewCount: product.reviewCount,

            // Properti Ketersediaan
            availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",

            // Properti Spesifik Buku (dari data `specifications`)
            authorName: product.author,
            publisherName: product.publisher,
            isbn: product.specifications.isbn,
            numberOfPages: product.specifications.pageCount,
            weight: bookWeight,
            bookFormat: bookFormat,
          }),
        ]}
      />

      <Suspense fallback={<Preloader />}>
        <Breadcrumb title={product.name} useKatalog={true} />
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />   <SameSubjectProductSlider
          spaceBottomClass="pb-95"
          currentProductMapel={productMapel}
          currentProductId={product.id}
        />
      {/* Sisa konten halaman Anda */}
      </Suspense>
    </Fragment>
  );
};

export default Product;