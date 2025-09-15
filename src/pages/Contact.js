import React, { Fragment, Suspense } from "react";
import SEO, { ldWebsite, ldOrganization, } from "../seo";

import Preloader from "../elements/Preloader";
const Breadcrumb = React.lazy(() => import("../components/Breadcrumb"));
const ContactInner = React.lazy(() => import("../components/ContactInner"));
const FooterBottomOne = React.lazy(() =>
  import("../components/FooterBottomOne")
);
const FooterOne = React.lazy(() => import("../components/FooterOne"));
const NavbarOne = React.lazy(() => import("../components/NavbarOne"));
const SearchPopup = React.lazy(() => import("../elements/SearchPopup"));
const Contact = () => {
    const siteUrl = "https://gubukpustakaharmoni.com/contact";

  return (
    <>

      <Fragment><SEO jsonLd={[
        ldWebsite({
          name: "Hubungi Kami",
          alternateName: "CV Gubuk Pustaka Harmoni Artha Nusantara",
          url: siteUrl,
        }),
        ldOrganization({
          name: "CV Gubuk Pustaka Harmoni Artha Nusantara",
          url: siteUrl,
          logo: `${siteUrl}assets/img/favicon.png` // Ganti dengan path logo Anda
        })
      ]}
        title="Hubungi Kami"
        description="Pilangrejo, Gemolong, Sragen Regency, Central Java 57274"
      />
        <Suspense fallback={<Preloader />}>
          {/* Search Popup */}
          <SearchPopup />

          {/* Navbar One */}
          <NavbarOne />

          {/* Breadcrumb */}
          <Breadcrumb title={"CONTACT US"} />

          {/* Breadcrumb */}
          <ContactInner />

          {/* Footer One */}
          <FooterOne />

          {/* Footer Bottom One */}
          <FooterBottomOne />
        </Suspense>
      </Fragment>
    </>
  );
};

export default Contact;
