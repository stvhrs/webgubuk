import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeOne from "./pages/HomeOne";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Product from "./components/Shop/Product";
import ScrollToTop from "react-scroll-to-top";
// import HomeTwo from "./pages/HomeTwo";
import About from "./pages/About";
import Service from "./pages/Service";
import ServiceDetails from "./pages/ServiceDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import RouteScrollToTop from "./elements/RouteScrollToTop";
import Katalog from "./pages/Katalog";
// import HomeThree from "./pages/HomeThree";
// import HomeFour from "./pages/HomeFour";
// import HomeFive from "./pages/HomeFive";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RouteScrollToTop />
        <Routes>
          <Route
            path={process.env.PUBLIC_URL + "/katalog/:id"}
            element={<Product />}
          />
          <Route path='/service/:slug' element={<ServiceDetails />} />
          <Route
            path={process.env.PUBLIC_URL + "/katalog"}
            element={<Katalog />}
          />
          <Route exact path='/' element={<HomeOne />} />

          <Route exact path='/contact' element={<Contact />} />
        </Routes>
        <ScrollToTop smooth color='#52920a' />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
