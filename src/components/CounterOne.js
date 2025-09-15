import React from "react";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";

const CounterOne = () => {
  return (
    <>
      {/*fact-area start*/}
      <div className='container'>
        <div
          className='fact-counter-area'
          style={{ background: "url(assets/img/fact/bg.png)" }}
        >
          <div className='row justify-content-center'>
            <div className='col-lg-4 col-md-6'>
              <div className='single-fact-wrap'>
                <h2>
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible && (
                        <span className='counter'>
                          <CountUp delay={0} start={0} end={60000} />+
                        </span>
                      )
                    }
                  </TrackVisibility>
                </h2>
                <h5>CUSTOMER</h5>
                <p>Jaringan pelanggan setia kami terus bertumbuh, menjadi bukti kepercayaan pada kualitas layanan Gubuk Pustaka Harmoni.</p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='single-fact-wrap'>
                <h2>
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible && (
                        <span className='counter'>
                          <CountUp delay={0} start={0} end={20} />+
                        </span>
                      )
                    }
                  </TrackVisibility>
                </h2>
                <h5>STAFF PROFESIONAL</h5>
                <p>Didukung oleh tim ahli di bidang penerbitan, percetakan, dan pendidikan yang siap melayani Anda.</p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='single-fact-wrap'>
                <h2>
                  <TrackVisibility once>
                    {({ isVisible }) =>
                      isVisible && (
                        <span className='counter'>
                          <CountUp delay={0} start={0} end={700} />+
                        </span>
                      )
                    }
                  </TrackVisibility>
                </h2>
                <h5>MITRA SEKOLAH</h5>
                <p>Kami bangga bekerja sama dengan ratusan sekolah di seluruh Indonesia untuk mencetak generasi unggul.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*fact-area end*/}
    </>
  );
};

export default CounterOne;