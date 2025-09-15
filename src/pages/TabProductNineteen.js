import PropTypes from "prop-types";
import clsx from "clsx"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProductGridTen from "./ProductGridTen";
import SectionTitleSeven from "./SectionTitleSeven";

const ProductCollection = ({
  spaceTopClass,
  spaceBottomClass,
  productGridStyleClass
}) => {
  useEffect(() => {
    import("../assets/scss/style.scss"); // dynamically load CSS
  }, []);

  return (
    <div className={clsx("product-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        {/* Section title */}
        <SectionTitleSeven
          titleText="BUKU KAMI"
          subTitleText="Temukan koleksi buku Elkapede terbaru kami yang dirancang untuk mendukung pembelajaran."
          positionClass="text-center"
          borderClass="bottom-border"
          spaceClass="mb-40  mt-50"
        />

        {/* Product grid for "Elkapede" category */}
        <div className="row">
          <ProductGridTen
            category={"Elkapede"}
            type="Elkapede"
            limit={6}
            spaceBottomClass="mb-25"
            productGridStyleClass={productGridStyleClass}
          />
        </div>
        
        <div className="view-more text-center mt-20 toggle-btn6 col-12 mb-60">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/katalog"}
          >
            LIHAT SEMUA PRODUK
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductCollection.propTypes = {
  productGridStyleClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default ProductCollection;