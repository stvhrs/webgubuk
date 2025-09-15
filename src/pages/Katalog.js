import { Fragment, Suspense, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import Preloader from "../elements/Preloader";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SEO from "../seo";
import ShopSidebar from "../components/Shop/ShopSidebar";
import ShopTopbar from "../components/Shop/ShopTopbar";
import ShopProducts from "../components/Shop/ShopProducts";
import React from "react";

import { getSortedProducts } from "../components/Shop/func/product";
//  import "../assets/scss/style.scss";
import Breadcrumb from "../components/Breadcrumb";
import NavbarFour from "../backup/NavbarFour";
const BannerOne = React.lazy(() => import("../components/BannerOne"));
const AboutOne = React.lazy(() => import("../components/AboutOne"));
const BlogOne = React.lazy(() => import("../components/BlogOne"));
const ContactOne = React.lazy(() => import("../components/ContactOne"));
const CounterOne = React.lazy(() => import("../components/CounterOne"));
const FeatureOne = React.lazy(() => import("../components/FeatureOne"));
const FooterBottomOne = React.lazy(() =>
  import("../components/FooterBottomOne")
);
const FooterOne = React.lazy(() => import("../components/FooterOne"));
const NavbarOne = React.lazy(() => import("../components/NavbarOne"));
const PartnerOne = React.lazy(() => import("../components/PartnerOne"));
const PortfolioOne = React.lazy(() => import("../components/PortfolioOne"));
const ServiceOne = React.lazy(() => import("../components/ServiceOne"));
const TeamOne = React.lazy(() => import("../components/TeamOne"));
const TestimonialOne = React.lazy(() => import("../components/TestimonialOne"));

const WhyChooseUsOne = React.lazy(() => import("../components/WhyChooseUsOne"));
const SearchPopup = React.lazy(() => import("../elements/SearchPopup"));
const Katalog = () => {
  const [layout, setLayout] = useState("grid two-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    import("../assets/scss/style.scss"); // dynamically load CSS
  }, []);
  const pageLimit = 16;
  let { pathname } = useLocation();

  const getLayout = layout => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  return (
    <Fragment>
      <SEO
     title="Katalog Buku"
        description="Jelajahi KATALOG Lengkap Kami - Temukan Berbagai Genre dan Topik " canonical="https://gubukpustakaharmoni.com/katalog"
      />
      {/* breadcrumb */}
      <Suspense fallback={<Preloader />}>
        {/* Search Popup */}
        <SearchPopup />
        <NavbarOne />

        {/* Navbar One */}
        <Breadcrumb title={"KATALOG"}

        />
        <div className="shop-area pt-30 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />
                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />
                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>  </Suspense>
    </Fragment>
  );
};

export default Katalog;
