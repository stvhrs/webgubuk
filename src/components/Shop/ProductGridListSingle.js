import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "./func/product";

import ProductModal from "./ProductModal";


const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * 1).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * 1
  ).toFixed(2);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/katalog/" + product.id}>
            <img
              className="default-img"
              src={process.env.PUBLIC_URL + product.image[0]}
              alt=""
            />
            {product.image.length > 1 ? (
              <img
                className="hover-img"
                src={process.env.PUBLIC_URL + product.image[1]}
                alt=""
              />
            ) : (
              ""
            )}
          </Link>
          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}

       
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/katalog/" + product.id}>
              {product.name}
            </Link>
          </h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">

            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{"Rp " + finalDiscountedPrice}</span>{" "}
                <span className="old">
                  {"Rp " + finalProductPrice}
                </span>
              </Fragment>
            ) : (
              <span>{"Rp " + finalProductPrice} </span>
            )}
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/katalog/" + product.id}>
                  <img
                    className="default-img img-fluid"
                    src={process.env.PUBLIC_URL + product.image[0]}
                    alt=""
                  />
                  {product.image.length > 1 ? (
                    <img
                      className="hover-img img-fluid"
                      src={process.env.PUBLIC_URL + product.image[1]}
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                </Link>
                {product.discount || product.new ? (
                  <div className="product-img-badges">
                    {product.discount ? (
                      <span className="pink">-{product.discount}%</span>
                    ) : (
                      ""
                    )}
                    {product.new ? <span className="purple">New</span> : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/katalog/" + product.id}>
                  {product.name}
                </Link>
              </h3>
              <div className="product-list-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {"Rp " + finalDiscountedPrice}
                    </span>{" "}
                    <span className="old">
                      {"Rp " + finalProductPrice}
                    </span>
                  </Fragment>
                ) : (
                  <span>{"Rp " + finalProductPrice} </span>
                )}
              </div>

              {product.shortDescription ? (
                <p>{product.shortDescription}</p>
              ) : (
                ""
              )}


            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({})
};

export default ProductGridListSingle;
