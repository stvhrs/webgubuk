import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Data layanan Anda, sekarang dengan 6 item
const serviceList = [
  {
    slug: "percetakan-penerbitan", // <-- Tambahkan slug
    title: "PERCETAKAN & PENERBITAN",
    des: "Solusi lengkap untuk mewujudkan naskah Anda menjadi buku berkualitas, dari proses editorial hingga cetak.",
    img: "./assets/img/cetak.png", // 
    icon: "assets/img/service/service-icon-1.png",
  },
   {
    slug: "penulisan-desain-buku",
    title: "PENULISAN & DESAIN BUKU",
    des: "Layanan kreatif mulai dari penulisan naskah, layout profesional, hingga desain sampul yang memikat pembaca.",
    img: "./assets/img/penulis.jpg", // Diperbarui (sesuai data yang Anda berikan)
    icon: "assets/img/service/service-icon-2.png",
  },
  {
    slug: "produksi-video-pembelajaran",
    title: "PRODUKSI VIDEO PEMBELAJARAN",
    des: "Produksi video pembelajaran berkualitas studio untuk materi ajar yang lebih menarik dan interaktif.",
    img: "./assets/img/video-belajar.jpeg", // Diperbarui
    icon: "assets/img/service/service-icon-3.png",
  },
  {
    slug: "pelatihan-profesional-guru",
    title: "PELATIHAN PROFESIONAL GURU",
    des: "Meningkatkan kompetensi dan metode mengajar para pendidik melalui program pelatihan yang inovatif.",
    img: "./assets/img/pelatihan.jpeg", // Diperbarui
    icon: "assets/img/service/service-icon-4.png",
  },
  {
    slug: "bimbingan-belajar",
    title: "BIMBINGAN BELAJAR (SD-SMA)",
    des: "Bimbingan belajar 'Gubuk Belajar' untuk semua jenjang (SD, SMP, SMA) dengan metode yang efektif.",
    img: "./assets/img/bimbel.jpeg", // Diperbarui
    icon: "assets/img/service/service-icon-5.png",
  },
  {
    slug: "distributor-grosir-buku",
    title: "DISTRIBUTOR & GROSIR BUKU",
    des: "Menyediakan semua buku dari seluruh penerbit di Indonesia dengan jaminan harga terbaik.",
    img: "./assets/img/distribusi.png", // Diperbarui
    icon: "assets/img/service/service-icon-6.png",
  },
];

const ServiceOneAll = () => {
  return (
    <>
      {/* service area start */}
      <div className='service-area style-2 pd-top-115 pd-bottom-80' style={{ padding: "0px", background: "url(assets/img/service/bg.png)" }}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-7'>
              <div className='section-title text-center'>
                <h4 className='subtitle'>LAYANAN KAMI</h4>
                <h2 className='title'>SOLUSI LENGKAP UNTUK ANDA</h2>
                <p>
                  Dari dunia literasi hingga pengembangan pendidikan, kami menyediakan layanan terintegrasi untuk mencetak dan menginspirasi generasi masa depan.
                </p>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            {serviceList.map((service, index) => (
              <div className='col-lg-4' key={index}>
                <div className='single-service-wrap'>
                  <div className='thumb'>
                    <img src={service.img} alt={service.title} />
                    <div className='icon'>
                      <img
                        src={service.icon}
                        alt={`${service.title} icon`}
                      />
                    </div>
                  </div>
                  <div className='details'>
                    <h5>{service.title}</h5>
                    <p>{service.des}</p>
                    <div className='btn-wrap'>
                      <Link className='read-more-text'  to={process.env.PUBLIC_URL + "/service/" + service.slug}>
                        SELENGKAPNYA{" "}
                        <span>
                          <FaArrowRight />
                        </span>
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

export default ServiceOneAll;