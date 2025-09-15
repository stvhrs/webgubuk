import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { getProducts } from "../components/Shop/func/product";
import ProductGridSingleTen from "./ProductGridSingleTen";

const ProductGridTen = ({
  spaceBottomClass,
  colorClass,
  productGridStyleClass,
  category,
  type,
  limit
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);

  const prods = getProducts(products, category, type, limit);
  
  return (
    <Fragment>
      {prods?.map((product) => {
        return (
          <div className="col-6 col-md-6 col-lg-4 col-sm-6" key={product.id}>
            <ProductGridSingleTen
              spaceBottomClass={spaceBottomClass}
              colorClass={colorClass}
              productGridStyleClass={productGridStyleClass}
              product={product}
              currency={currency}
            
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGridTen.propTypes = {
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  productGridStyleClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number
};


export default ProductGridTen;
