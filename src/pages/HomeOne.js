import React, { Fragment, Suspense, useEffect } from "react";
import Preloader from "../elements/Preloader";
import TabProductNineteen from "./TabProductNineteen";

import SEO, { ldWebsite, ldOrganization } from "../seo";
// import "./../assets/index.scss";

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
const ServiceOneAll = React.lazy(() => import("../components/ServiceOneAll"));

const HomeOne = () => {
    const siteUrl = "https://gubukpustakaharmoni.com/";

  //  useEffect(() => {
  //     import("./../assets/index.scss"); // dynamically load CSS
  //   }, []);
  return (
    <>


      <Fragment><SEO  jsonLd={[
          ldWebsite({
            name: "CV Gubuk Pustaka Harmoni",
            alternateName: "CV Gubuk Pustaka Harmoni Artha Nusantara",
            url: siteUrl,
          }),
          ldOrganization({
            name: "CV Gubuk Pustaka Harmoni Artha Nusantara",
            url: siteUrl,
            logo: `${siteUrl}assets/img/favicon.png` // Ganti dengan path logo Anda
          })
        ]}
        titleTemplate="Welcome"
        description="Percetakan & Digital Printing terbaik." title="CV Gubuk Pustaka Harmoni Artha Nusantara"
      />

        <Suspense fallback={<Preloader />}>
          {/* Search Popup */}
          <SearchPopup />

          {/* Navbar One */}
          <NavbarOne />

          {/* Banner One */}
          <BannerOne /><div id="layanan-kami">

          <ServiceOneAll /></div>
<TabProductNineteen/>
          {/* Feature One */}
          {/* <FeatureOne /> */}
          {/* <ServiceOne /> */}

          {/* About One */}
          {/* <AboutOne /> */}

          {/* Service One */}

          {/* Why Choose Us One */}
          <WhyChooseUsOne />

          {/* Counter One */}
<div className="mb-120">          <CounterOne /></div>


          {/* Team One */}
          {/* <TeamOne /> */}

          {/* Contact One */}
          {/* <TeamOne /> */}


          {/* Footer One */}
          <FooterOne />

          {/* Footer Bottom One */}
          <FooterBottomOne />
        </Suspense>
      </Fragment>
    </>
  );
};

export default HomeOne;
