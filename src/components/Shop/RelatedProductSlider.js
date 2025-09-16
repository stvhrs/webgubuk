import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import ProductGridSingle from "./ProductGridSingle";

// Styles for the main wrapper and a consistent container
const wrapStyle = {
  position: "relative",
};

const containerStyle = {
  padding: "0 15px", // Consistent padding for content
};

const headingStyle = {
  margin: "0 0 14px 0",
  fontSize: 24,
  fontWeight: 500,
};

// Styles for the grid layout
const gridContainerStyle = {
  display: "grid",
  gap: "30px", // A gap between grid items
  // Default desktop layout with responsive columns
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
};

// Styles for mobile-specific layout
const mobileGridStyle = {
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px", // You might want a smaller gap on mobile
};

const SameSubjectProductSlider = ({
  spaceBottomClass,
  currentProductMapel,
  currentProductId,
  title = "Produk serupa",
}) => {
  // State & store
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);


  // Filter produk dengan mapel/tag sama
  const relatedProducts = useMemo(() => {
    if (!products || !currentProductMapel) return [];
    return products
      .filter((p) => Array.isArray(p.tag) && p.tag.includes(currentProductMapel) && p.id !== currentProductId)
      .slice(0, 12);
  }, [products, currentProductMapel, currentProductId]);

  if (!relatedProducts.length) return null;

  // Combine styles with a media query approach
  const combinedGridStyle = { ...gridContainerStyle };

  // This is a simple way to apply the mobile styles.
  // A more robust solution might use a custom hook for screen size.
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    Object.assign(combinedGridStyle, mobileGridStyle);
  }

  return (
    <div className={clsx("related-product-area", spaceBottomClass)} style={wrapStyle} role="region" aria-label="Produk serupa">
      <div className="container" style={containerStyle}>
        <h3 style={headingStyle}>{title}</h3>

        {/* Product grid with 2 rows for mobile */}
        <div style={combinedGridStyle}>
          {relatedProducts.map((product) => (
            <ProductGridSingle
              key={product.id}
              product={product}
              currency={currency}
         
            />
          ))}
        </div>
      </div>
    </div>
  );
};

SameSubjectProductSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  currentProductMapel: PropTypes.string.isRequired,
  currentProductId: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default SameSubjectProductSlider;