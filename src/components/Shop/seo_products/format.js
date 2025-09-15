import { FaStar } from "react-icons/fa";

// src/utils/format.js
export const formatIDR = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(n);

// src/components/StarRating.jsx
export default function StarRating({ value = 5, count = 45, size = 18 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div aria-label={`Rating ${value} dari 5`} role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} size={size} style={{ verticalAlign: "middle" }} />
        ))}
      </div>
      <span>({count})</span>
    </div>
  );
}
