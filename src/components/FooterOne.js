import React from "react";
import {
  FaArrowRight,
  FaFacebookF,
  FaLinkedinIn,
  FaPaperPlane,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterOne = () => {
  const serviceData = [
    {
      slug: "percetakan-penerbitan",
      title: "Percetakan & Penerbitan Buku",
      des: "Solusi lengkap untuk mewujudkan naskah Anda menjadi buku berkualitas, dari proses editorial, desain, ISBN, hingga cetak.",
      img: "assets/img/service/details-1.png", // Ganti dengan gambar detail yang sesuai
      fullDescription: "Kami menyediakan layanan percetakan dan penerbitan buku secara terpadu. Proses kami dimulai dari konsultasi naskah, penyuntingan profesional, desain tata letak yang menarik, pengurusan ISBN, hingga pencetakan dengan kualitas terbaik. Kami memastikan setiap buku yang kami hasilkan tidak hanya berkualitas secara fisik tetapi juga siap untuk menginspirasi pembaca."
    },
    {
      slug: "penulisan-desain-buku",
      title: "Penulisan & Desain Buku Profesional",
      des: "Ubah ide cemerlang Anda menjadi karya tulis profesional dengan layanan penulisan fleksibel dan desain sampul yang memikat.",
      img: "assets/img/service/details-2.png", // Ganti dengan gambar detail yang sesuai
      fullDescription: "Apakah Anda punya ide tapi tidak punya waktu untuk menulis? Tim penulis dan desainer kami siap membantu. Kami menawarkan jasa penulisan buku (ghostwriting), pengembangan naskah (co-writing), serta desain sampul dan tata letak yang dirancang khusus untuk menarik target pasar Anda."
    },
    {
      slug: "produksi-video-pembelajaran",
      title: "Produksi Video Pembelajaran",
      des: "Hadirkan materi ajar yang lebih menarik dan interaktif dengan video pembelajaran berkualitas yang kami produksi di studio sendiri.",
      img: "assets/img/service/details-3.png", // Ganti dengan gambar detail yang sesuai
      fullDescription: "Di era digital, media pembelajaran visual sangatlah efektif. Kami memiliki studio produksi sendiri untuk membuat video pembelajaran berkualitas tinggi, lengkap dengan animasi dan grafis pendukung. Jadikan materi ajar Anda lebih menarik, mudah dipahami, dan interaktif bagi para siswa."
    },
    {
      slug: "pelatihan-profesional-guru",
      title: "Pelatihan Profesional Guru",
      des: "Tingkatkan kompetensi mengajar melalui program pelatihan inovatif yang dirancang untuk dampak nyata di ruang kelas.",
      img: "assets/img/service/details-4.png", // Ganti dengan gambar detail yang sesuai
      fullDescription: "Kami berkomitmen untuk mendukung kemajuan pendidikan di Indonesia dengan menyelenggarakan pelatihan bagi para guru. Materi kami relevan dengan kurikulum terbaru, fokus pada metode pengajaran yang praktis dan aplikatif, serta dibawakan oleh para ahli pendidikan berpengalaman."
    },
    {
      slug: "bimbingan-belajar",
      title: "Bimbingan Belajar (SD-SMA)",
      des: "Raih prestasi akademik terbaik bersama 'Gubuk Belajar', bimbingan belajar efektif untuk jenjang SD hingga SMA.",
      img: "assets/img/service/details-5.png", // Ganti dengan gambar detail yang sesuai
      fullDescription: "Melalui 'Gubuk Belajar', kami menyediakan program bimbingan belajar untuk siswa dari tingkat SD, SMP, hingga SMA. Dengan metode pengajaran yang personal dan menyenangkan, kami membantu siswa memahami materi pelajaran, mengerjakan tugas, dan mempersiapkan diri untuk ujian dengan lebih percaya diri."
    },
    {
      slug: "distributor-grosir-buku",
      title: "Distributor & Grosir Buku Nasional",
      des: "Jangkau pembaca di seluruh Indonesia. Kami menyediakan semua judul buku, termasuk terbitan kami, dengan harga terbaik.",
      img: "assets/img/service/details-6.png", // Ganti dengan gambar detail yang sesuai
      fullDescription: "Sebagai distributor dan pusat grosir buku, kami memiliki jaringan yang luas ke seluruh toko buku di Indonesia, baik modern maupun independen, serta platform online. Tidak hanya mendistribusikan buku terbitan kami, kami juga menyediakan akses ke semua buku dari berbagai penerbit di Indonesia dengan jaminan harga terbaik."
    }
  ];
  // util: Title Case
  const formatTitle = (title) =>
    title.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  // Data kontak
  const email = "gubukpustakaharmoni@gmail.com";
  const phoneLocal = "085174484832";
  const phoneIntl = "6285174484832"; // ganti 0 -> 62 untuk WhatsApp
  const waText = encodeURIComponent("Halo Gubuk Pustaka Harmoni, saya ingin bertanya.");
  const mapsHref =
    "https://www.google.com/maps/place/Jl.+Tulusari,+Plupuh,+Kabupaten+Sragen,+Jawa+Tengah/";

  return (
    <>
      {/* footer area start */}
      <footer className='footer-area'>
        <div
          className='footer-top'
          style={{ backgroundImage: 'url("./assets/img/footer/bg.png")' }}
        >
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-4 col-md-6'>
                <div className='single-footer-top'>
                  <div className='icon'>
                    <img src='assets/img/icon/map-marker.png' alt='Gubuk Pustaka Harmoni' />
                  </div>
                  <div className='details'>
                    <h6>OFFICE ADDRESS:</h6>
                    <a
                      href={mapsHref}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white d-inline-block'
                      aria-label='Lihat lokasi di Google Maps'
                      title='Buka di Google Maps'
                      style={{  }}
                    >
                      Jl. Tulusari, Kecamatan Plupuh<br />
                      Kabupaten Sragen, Jawa Tengah
                    </a>
                  </div>
                </div>
              </div>

              <div className='col-lg-4 col-md-6'>
                <div className='single-footer-top'>
                  <div className='icon'>
                    <img src='assets/img/icon/phone.png' alt='Gubuk Pustaka Harmoni' />
                  </div>
                  <div className='details'>
                    <h6>CONTACT US:</h6>
                    <p>
                      <a
                        href={`mailto:${email}`}
                        className='text-white'
                        style={{  }}
                      >
                        {email}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`https://wa.me/${phoneIntl}?text=${waText}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-white d-inline-flex align-items-center'
                        aria-label='Chat via WhatsApp'
                        title='Chat via WhatsApp'
                        style={{  }}
                      >
                        <FaWhatsapp style={{ marginRight: 8 }} />
                        {phoneLocal}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className='col-lg-4 col-md-6'>
                <div className='single-footer-top after-none'>
                  <div className='icon'>
                    <img src='assets/img/icon/clock.png' alt='Gubuk Pustaka Harmoni' />
                  </div>
                  <div className='details'>
                    <h6>WORKING HOURS:</h6>
                    <p>Senin - Minggu : 24 Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-xl-4 col-md-6'>
              <div className='widget widget_about'>
                <div className='thumb'>
                  <img src='assets/img/logo-white.png' alt='Gubuk Pustaka Harmoni' />
                </div>
                <div className='details'>
                  <p>
                    Dari dunia literasi hingga pengembangan pendidikan, kami menyediakan layanan
                    terintegrasi untuk mencetak dan menginspirasi generasi masa depan.
                  </p>
                  <ul className='social-media style-border'>
                    <li><a href='#'><FaFacebookF /></a></li>
                    <li><a href='#'><FaTwitter /></a></li>
                    <li><a href={`https://wa.me/${phoneIntl}`} target='_blank' rel='noopener noreferrer'><FaWhatsapp /></a></li>
                    <li><a href='#'><FaLinkedinIn /></a></li>
                  </ul>
                </div>
              </div>
            </div>

         <div className='col-xl-3 col-md-6'>
              <div className='widget widget_nav_menu'>
                <h4 className='widget-title'>LAYANAN KAMI</h4>
                <ul>
                  {serviceData.map(service => (
                    <li key={service.slug}>
                      <Link to={process.env.PUBLIC_URL + "/service/" + service.slug}>
                        <FaArrowRight /> {formatTitle(service.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='col-xl-5 col-md-6'>
              <div className='widget widget_nav_menu'>
                <h4 className='widget-title'>LOKASI KAMI</h4>
                <div className='contact-g-map'>
                  <iframe 
                    style={{ width: "100%", height: "230px", border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.687024804484!2d110.8416094!3d-7.3917363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a0f78ec018fc9%3A0x53552b3c0c044246!2sDusun%202%2C%20Pilangrejo%2C%20Gemolong%2C%20Sragen%20Regency%2C%20Central%20Java%2057274!5e0!3m2!1sen!2sid!4v1726059300000!5m2!1sen!2sid"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen=""
                    title="Peta Lokasi Gubuk Pustaka Harmoni"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* footer area end */}
    </>
  );
};

export default FooterOne;
