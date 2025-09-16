import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaStar, FaRegStar } from "react-icons/fa"; // BARU: Import ikon bintang

// BARU: Komponen kecil (helper) untuk menampilkan bintang
const StarRating = ({ ratingValue }) => {
  const totalStars = 5;
  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= ratingValue) {
      // Bintang terisi
      stars.push(<FaStar key={i} />);
    } else {
      // Bintang kosong
      stars.push(<FaRegStar key={i} />);
    }
  }
  return <Fragment>{stars}</Fragment>;
};


const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  wishlistItem,
  compareItem,
}) => {
  // ====== KONFIGURASI WHATSAPP ======
  const WA_NUMBER = "6285174484832";
  const waText = encodeURIComponent(
    `Halo Gubuk Pustaka Harmoni, saya tertarik dengan produk: ${product?.name}. Apakah masih tersedia?`
  );
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>

      <div className="product-details-price">
        {product.discount > 0 ? (
          <Fragment>
            <span>{currency.currencySymbol + product.salePrice.toLocaleString('id-ID')}</span>{" "}
            <span className="old">{currency.currencySymbol + product.price.toLocaleString('id-ID')}</span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + product.price.toLocaleString('id-ID')} </span>
        )}
      </div>

      {/* DIUBAH: Bagian Rating dan Review Count sekarang aktif */}
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap" style={{ marginBottom: '20px' }}>
          <div className="pro-details-rating" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ color: '#f5b223' }}> {/* Warna emas untuk bintang */}
              <StarRating ratingValue={product.rating} />
            </div>
            <span style={{ color: '#555', fontSize: '14px' }}>
              ({3} ulasan)
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      
      <div className="pro-details-list">
        {/* ... sisa kode untuk daftar spesifikasi (sudah benar) ... */}
        <p style={{ marginBottom: '20px', fontStyle: 'italic', color: '#555', lineHeight: '1.5' }}>
          {product.shortDescription}
        </p>
       <ul style={{ 
    listStyleType: 'none', 
    padding: 0, 
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
  }}>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Penulis</span>
      : {product.author}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Penerbit</span>
      : {product.publisher}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>ISBN</span>
      : {product.specifications.isbn}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Tahun Terbit</span>
      : {product.specifications.publishYear}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Jumlah Halaman</span>
      : {product.specifications.pageCount} Halaman
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Berat Buku</span>
      : {product.specifications.weight}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Ukuran</span>
      : {product.specifications.size}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Kertas Isi</span>
      : {product.specifications.paperTypeContent}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Kertas Sampul</span>
      : {product.specifications.paperTypeCover}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Jenis Huruf</span>
      : {product.specifications.font}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Cetakan</span>
      : {product.specifications.printing}
    </li>
    <li style={{ marginBottom: '8px' }}>
      <span style={{ fontWeight: 'bold', minWidth: '130px', display: 'inline-block' }}>Jilid</span>
      : {product.specifications.binding}
    </li>
  </ul>
      </div>

      {/* TOMBOL CHAT WHATSAPP */}
      <div className="pro-details-quality">
        <div className="pro-details-cart ml-0">
          <a href={waHref} rel="noopener noreferrer" target="_blank" className="btn-wa" aria-label="Chat via WhatsApp" title="Chat via WhatsApp">
            <FaWhatsapp style={{ marginRight: 8 }} />
            Chat WhatsApp
          </a>
        </div>
      </div>

      {product.tag ? (
        <div className="pro-details-meta">
          <span>Mapel :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/katalog"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      {/* ... sisa kode Anda ... */}
    </div>
  );
};

// ... propTypes dan export default ...
ProductDescriptionInfo.propTypes = {
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
