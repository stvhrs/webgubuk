import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title, useKatalog = false, parentLabel, parentTo }) => {
  // Logika untuk parent custom masih bisa digunakan jika diperlukan
  const hasParent = parentLabel && parentTo;

  return (
    <>
      <nav
        className={`breadcrumb-area bg-overlay-2 ${
          useKatalog ? "katalog-mode" : ""
        }`}
        style={{
          backgroundImage: 'url("/assets/img/banner/breadcrumb.png")',
          paddingTop: useKatalog ? "20px" : undefined,
          paddingBottom: useKatalog ? "20px" : undefined,
        }}
        aria-label="Breadcrumb"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-inner">
                <div className="section-title mb-0 mr-0">
                  {/* Judul Halaman tetap sama */}
                  <h2 className="page-title">{useKatalog ? "Katalog Buku" : title}</h2>
                  
                  <ul className="page-list">
                    {/* --- BAGIAN YANG DIUBAH --- */}
                    {/* Gunakan conditional rendering untuk memilih tampilan breadcrumb */}
                    {useKatalog ? (
                      // 1. Tampilan jika 'useKatalog' adalah true
                      <>
                        <li><Link to="/">HOME </Link></li> / 
                        <Link to="/katalog"> KATALOG</Link>
                      </>
                    ) : (
                      // 2. Tampilan default jika 'useKatalog' adalah false
                      <>
                        <li><Link to="/">HOME</Link></li>
                        {/* Tambahkan parent link jika ada */}
                        {hasParent && (
                            <li><Link to={parentTo}>{parentLabel}</Link></li>
                        )}
                        {/* Judul halaman aktif */}
                        <li className="ps-0">{title}</li>
                      </>
                    )}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- CSS DIPERBAIKI --- */}
      <style>{`
        .page-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .page-list li {
          display: inline; /* Membuat list item berjajar */
        }
        .page-list li + li::before {
          content: "/"; /* Hapus semua spasi, hanya sisakan garis miring */
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default Breadcrumb;