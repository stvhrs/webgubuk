import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ModalVideo from "react-modal-video";

const WhyChooseUsOne = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {/* wcu-area start */}
      <div
        className="wcu-area bg-overlay"
        style={{ background: 'url("/assets/img/wcu/bg-2.png")' }}
      >
        <img className="img-1" src="/assets/img/wcu/1.png" alt="Gubuk Pustaka Harmoni" />
        <img className="img-2" src="/assets/img/wcu/2.png" alt="Gubuk Pustaka Harmoni" />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-6 order-lg-2">
              <div className="video-thumb-wrap">
                <img src="/assets/img/wcu/video.png" alt="Gubuk Pustaka Harmoni" />
                <span
                  className="video-play-btn cursor-pointer"
                  data-effect="mfp-zoom-in"
                  onClick={() => setOpen(true)}
                  aria-label="Putar video profil"
                  title="Putar video"
                >
                  <FaPlay />
                </span>
              </div>
            </div>

            <div className="col-xl-5 col-lg-6 order-lg-1">
              <div className="section-title style-white mb-0">
                <h4 className="subtitle style-2">MENGAPA MEMILIH KAMI</h4>
                <h2 className="title">Alasan Terbaik Memilih Gubuk Pustaka Harmoni</h2>
                <p className="content">
                  Kami menghadirkan solusi percetakan yang cepat,
                  presisi. Tim berpengalaman, serta kontrol kualitas berlapis untuk memastikan setiap pesanan selesai
                  tepat waktu dengan hasil maksimal.
                </p>
              </div>

          <div className="single-wcu-wrap">
                <div className="icon">
                  <img src="/assets/img/wcu/icon-1.png" alt="Pengiriman Cepat" />
                </div>
                <div className="details">
                  <h6>PENGIRIMAN CEPAT</h6>
                  <p>
                    Proses produksi efisien dan jaringan logistik yang andal memastikan
                    pesanan Anda sampai tepat waktu ke lokasi tujuan.
                  </p>
                </div>
              </div>

              <div className="single-wcu-wrap">
                <div className="icon">
                  <img src="/assets/img/wcu/icon-2.png" alt="Dukungan 24/7" />
                </div>
                <div className="details">
                  <h6>DUKUNGAN ONLINE 24/7</h6>
                  <p>
                    Tim layanan pelanggan siap membantu kapan pun dibutuhkan—mulai dari
                    konsultasi spesifikasi hingga pemantauan status pesanan.
                  </p>
                </div>
              </div>

              <div className="single-wcu-wrap">
                <div className="icon">
                  <img src="/assets/img/wcu/icon-3.png" alt="Keamanan dan Keandalan" />
                </div>
                <div className="details">
                  <h6>KEAMANAN & KEANDALAN</h6>
                  <p>
                    Standar mutu yang ketat, material terpilih, dan prosedur QA memastikan
                    hasil cetak konsisten, aman, dan dapat diandalkan setiap saat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      {/* wcu-area end */}

      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="WGMaMzd2oRo"
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default WhyChooseUsOne;
