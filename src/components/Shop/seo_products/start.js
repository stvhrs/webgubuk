// src/components/ProductSummary.jsx
import { formatIDR } from "./format";
import StarRating from "./format";

export default function ProductSummary({ product }) {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: 0 }}>{product.name}</h1>

      {/* Harga Rp tebal */}
      <div style={{ fontSize: 20 }}>
        <strong>{formatIDR(product.price)}</strong>
      </div>

      {/* Rating 5 bintang + (45) */}
      <StarRating value={5} count={45} />

      {/* Deskripsi (strip <br/> untuk tampilan ringkas) */}
      <p style={{ marginTop: 8 }}>
        {(product.shortDescription || "").replace(/<br\s*\/?>/gi, " ")}
      </p>
    </section>
  );
}
