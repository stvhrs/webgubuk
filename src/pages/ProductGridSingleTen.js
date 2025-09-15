import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "../components/Shop/func/product";

const ProductGridSingleTen = ({
  product,
  currency,
  spaceBottomClass,
  colorClass,
  productGridStyleClass
}) => {
  // Pastikan product dan currency ada sebelum diakses untuk menghindari error
  if (!product || !currency) {
    return null; 
  }

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  return (
    <Fragment>
      <div className={clsx("product-wrap-10", spaceBottomClass, colorClass, productGridStyleClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/katalog/" + product.id}>
            <img
              className="default-img"
              src={process.env.PUBLIC_URL + product.image[0]}
              alt={product.name}
            />
            {/* === PERUBAHAN DI SINI === */}
            {product.image.length > 1 ? (
              <img
                className="hover-img"
                // Gunakan gambar kedua (indeks 1) untuk hover
                src={process.env.PUBLIC_URL + product.image[1]} 
                alt={product.name}
              />
            ) : null}
          </Link>
          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? <span>-{product.discount}%</span> : ""}
              {product.new ? <span>New</span> : ""}
            </div>
          ) : null}
        </div>
        <div className="product-content-2">
          <Link 
            style={{ 
              fontWeight: '600', 
              textDecoration: 'none' 
            }} 
            to={process.env.PUBLIC_URL + "/katalog/" + product.id}
          >
            {product.name}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridSingleTen.propTypes = {
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  productGridStyleClass: PropTypes.string,
};

export default ProductGridSingleTen;