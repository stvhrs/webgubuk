// src/main.jsx atau src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import store from "./redux/store/store";
import { setProducts } from "./redux/stateSlice/product-slice";
import products from "./data/products.json";

// CSS (urutkan sebelum JS jika bisa)
import "animate.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./index.scss";

// JS (perbaiki ekstensi .js)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

store.dispatch(setProducts(products));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
