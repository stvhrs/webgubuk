import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Data layanan Anda
const serviceList = [
  {
    title: "PENERBITAN & PERCETAKAN BUKU",
    des: "Percetakaan buku hvs maupun buram, jaminan harga kompetitif dengan kualitas terbaik, serta layanan penerbitan dari naskah hingga distribusi.",
    img: "assets/img/service/1.png",
    icon: "assets/img/service/service-icon-1.png",
  },
  {
    title: "PELATIHAN PENGAJAR GURU",
    des: "Meningkatkan kompetensi pendidik dengan materi relevan (Kurikulum Merdeka), metode praktis & interaktif, serta narasumber ahli.",
    img: "assets/img/service/2.png",
    icon: "assets/img/service/service-icon-2.png",
  },
  {
    title: "PENULISAN & DESAIN BUKU",
    des: "Layanan penulisan buku, layouting, editorial, dan desain yang memikat, hingga publikasi isbn dan penilaian Kemendikbud maupun Kemenag.",
    img: "assets/img/service/3.png",
    icon: "assets/img/service/service-icon-3.png",
  },
  {
    title: "DISTRIBUTOR BUKU NASIONAL",
    des: "Menyediakan semua buku dari seluruh penerbit di Indonesia dengan jaminan harga termurah. Kami adalah mitra distribusi terpercaya Anda untuk Sekolah",
    img: "assets/img/service/4.png",
    icon: "assets/img/service/service-icon-4.png",
  },
];

const ServiceOne = () => {
  return (
    <>
      {/* service area start */}
      <div
        className="service-area"
        style={{ padding: "25px", background: "url(assets/img/service/bg.png)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title text-center" style={{ paddingBottom: "25px", paddingTop: "25px" }}>
                <h2 className="title">LAYANAN TERBAIK KAMI</h2>
                <p>
                  Kami menyediakan solusi lengkap dari naskah hingga distribusi, serta pengembangan kompetensi bagi para pendidik untuk mencetak generasi inspiratif.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {/* Mapping data service */}
            {serviceList.map((service, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className="single-service-wrap">
                  <div className="thumb">
                    <img src={service.img} alt={service.title} />
                    <div className="icon">
                      <img
                        src={service.icon}
                        alt={`${service.title} icon`}
                      />
                    </div>
                  </div>
                  <div className="details">
                    <h5>{service.title}</h5>
                    <p>{service.des}</p>
                    <div className="btn-wrap">
                      <Link className="read-more-text" to="/service-details">
                        SELENGKAPNYA <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* service area end */}
    </>
  );
};

export default ServiceOne;