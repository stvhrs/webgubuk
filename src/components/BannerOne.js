import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Data untuk setiap slide banner
const bannerData = [
  {
    title: "Penerbitan & Percetakan Buku",
    content: "Mewujudkan naskah Anda menjadi buku berkualitas yang siap menginspirasi pembaca melalui layanan terpadu dan profesional.",
    img: "./assets/img/cetak.png",
  },
  {
    title: "Pelatihan Pengajar Guru",
    content: "Meningkatkan kompetensi pendidik untuk menciptakan generasi unggul melalui program pelatihan yang relevan, praktis, dan interaktif.",
    img: "./assets/img/pelatihan.jpeg",
  },
  {
    title: "Penulisan & Desain Buku",
    content: "Mengubah ide cemerlang Anda menjadi karya tulis profesional dengan layanan penulisan fleksibel dan desain yang memikat.",
    img: "./assets/img/penulis.jpg", // Anda mungkin perlu menambahkan gambar ini
  }, {
    title: "Produksi Video Pembelajaran",
    content: "Menyebarkan ilmu dan inspirasi dengan menjangkau pembaca di seluruh penjuru Nusantara melalui jaringan distribusi yang luas.",
    img: "./assets/img/video-belajar.jpeg", // Anda mungkin perlu menambahkan gambar ini
  },
  {
    title: "Distributor Buku Nasional",
    content: "Menyebarkan ilmu dan inspirasi dengan menjangkau pembaca di seluruh penjuru Nusantara melalui jaringan distribusi yang luas.",
    img: "./assets/img/distribusi.png", // Anda mungkin perlu menambahkan gambar ini
  },  {
    title: "Bimbel Gubuk Belajar (SD-SMA)",
    content: "Menyebarkan ilmu dan inspirasi dengan menjangkau pembaca di seluruh penjuru Nusantara melalui jaringan distribusi yang luas.",
    img: "./assets/img/bimbel.jpeg", // Anda mungkin perlu menambahkan gambar ini
  },
];


const BannerOne = () => {
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaArrowRight className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaArrowLeft className={className} onClick={onClick} />;
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      {/* banner start */}
      <div className='banner-area banner-area-1'>
        <div className='banner-slider owl-carousel'>
          <Slider {...settings}>
            {bannerData.map((slide, index) => (
              <div key={index}>
                <div
                  className='item'
                  style={{ backgroundImage: `url("${slide.img}")` }}
                >
                  <div className='container'>
                    <div className='row'>
                      <div className='col-lg-7 col-md-8'>
                        <div className='banner-inner style-white'>
                          <h1 className='b-animate-2 title'>
                            {slide.title}
                          </h1>
                          <p className='b-animate-3 content'>
                            {slide.content}
                          </p>
                          <div className='btn-wrap'>
                            <Link
                              className='btn btn-base b-animate-4'
                              to='https://wa.me/6285174484832'
                            >
                              Chat Whatsapp
                            </Link>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* banner end */}
    </>
  );
};

export default BannerOne;