import React, { Fragment, Suspense } from "react";
import Preloader from "../elements/Preloader";
import SEO from "../seo";
import { useParams } from 'react-router-dom'; // 1. Import useParams
import { serviceData } from './servicedata'; // 2. Import data layanan Anda

const Breadcrumb = React.lazy(() => import("../components/Breadcrumb"));
const FooterBottomOne = React.lazy(() => import("../components/FooterBottomOne"));
const FooterOne = React.lazy(() => import("../components/FooterOne"));
const NavbarOne = React.lazy(() => import("../components/NavbarOne"));
const ServiceDetailsInner = React.lazy(() => import("../components/ServiceDetailsInner"));
const SearchPopup = React.lazy(() => import("../elements/SearchPopup"));

const ServiceDetails = () => {
    // 3. Ambil 'slug' dari URL
    const { slug } = useParams();

    // 4. Cari data yang sesuai berdasarkan slug
    const service = serviceData.find(item => item.slug === slug);

    // 5. Handle jika data tidak ditemukan (URL salah)
    if (!service) {
        return (
            // Anda bisa membuat komponen 404 khusus
            <div>Halaman tidak ditemukan</div>
        );
    }
    
    // 6. Gunakan data yang ditemukan untuk SEO dan komponen lainnya
    return (
        <Fragment>
            <SEO image={`https://gubukpustakaharmoni.com/${service.img}`}url={`https://gubukpustakaharmoni.com/service/${service.slug}`}
                title={service.title} // <-- DATA DINAMIS
                description={service.des} // <-- DATA DINAMIS
                canonical={`https://gubukpustakaharmoni.com/service/${service.slug}`} // <-- DATA DINAMIS
            />
            <Suspense fallback={<Preloader />}>
                <SearchPopup />
                <NavbarOne />
                
                {/* Judul Breadcrumb sekarang dinamis */}
                <Breadcrumb title={service.title} /> 

                {/* Lewatkan seluruh data 'service' sebagai prop ke komponen inner */}
                <ServiceDetailsInner service={service} /> 

                <FooterOne />
                <FooterBottomOne />
            </Suspense>
        </Fragment>
    );
};

export default ServiceDetails;