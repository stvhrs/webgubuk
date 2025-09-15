import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "./func/product";
import ProductImageGallery from "../Shop/ProductImageGallery";
import ProductDescriptionInfo from "./ProductDescriptionInfo";
import ProductImageGallerySideThumb from "./ProductImageGallerySideThumb";
import ProductImageFixed from "../Shop/ProductImageFixed";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product
}) => {
  // ✅ aman dari undefined slice
  const currency = useSelector((state) => state?.currency ?? {});


  // ✅ guard nilai product/price/discount
  const price = Number(product?.price ?? 0);
  const hasDiscount = Number.isFinite(price) && product?.discount != null;

  const discountedPrice = hasDiscount
    ? getDiscountPrice(price, product.discount)
    : null;

  const finalProductPrice = Number.isFinite(price)
    ? +(price * 1).toFixed(2)
    : 0;

  const finalDiscountedPrice =
    discountedPrice != null ? +(discountedPrice * 1).toFixed(2) : null;

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
           
              <ProductImageFixed product={product} />
            
          </div>

          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
