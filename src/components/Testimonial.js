import React from 'react';
import './../styles/Testimonial.css';
import SectionTitle from './SectionTitle';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

const Testimonial = () => {
  const responsive = {
    0: {
      items: 1,
    },
    576: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  };
  return (
    <div className=" py-1">
      <div className=" pt-4">
        <div className="text-center">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <SectionTitle
              mainTitle="Testimonial"
              description="What Say Our Customers"
            />
          </div>
        </div>

        <div
          className=" testimonial-carousel px-3 py-5"
          style={{ backgroundColor: '#F3F3F3' }}
        >
          <div className="container ">
            <OwlCarousel
              smartSpeed={1500}
              dots={true}
              center={true}
              margin={30}
              autoplay={true}
              loop={true}
              navigation={false}
              responsive={responsive}
            >
              <div className="text-center mt-5 mb-5">
                <img
                  className="img-fluid mx-auto"
                  src={require('./../img/guide-1.jpg')}
                  style={{
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                />
                <div
                  className="testimonial-text bg-white p-4 mt-n5"
                  style={{ backgroundColor: '#ecf1f3' }}
                >
                  <p className="mt-5">
                    Dolor et eos labore, stet justo sed est sed. Diam sed sed
                    dolor stet amet eirmod eos labore diam
                  </p>
                  <h5 className="text-truncate">Client Name</h5>
                  <span>Profession</span>
                </div>
              </div>
              <div className="text-center mt-5 mb-5">
                <img
                  className="img-fluid mx-auto"
                  src={require('./../img/guide-2.jpg')}
                  style={{
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                />
                <div
                  className="testimonial-text bg-white p-4 mt-n5"
                  style={{ backgroundColor: '#ecf1f3' }}
                >
                  <p className="mt-5">
                    Dolor et eos labore, stet justo sed est sed. Diam sed sed
                    dolor stet amet eirmod eos labore diam
                  </p>
                  <h5 className="text-truncate">Client Name</h5>
                  <span>Profession</span>
                </div>
              </div>
              <div className="text-center mt-5 mb-5">
                <img
                  className="img-fluid mx-auto"
                  src={require('./../img/guide-3.jpg')}
                  style={{
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                />
                <div className="testimonial-text bg-white p-4 mt-n5">
                  <p className="mt-5">
                    Dolor et eos labore, stet justo sed est sed. Diam sed sed
                    dolor stet amet eirmod eos labore diam
                  </p>
                  <h5 className="text-truncate">Client Name</h5>
                  <span>Profession</span>
                </div>
              </div>
              <div className="text-center mt-5 mb-5">
                <img
                  className="img-fluid mx-auto"
                  src={require('./../img/guide-4.jpg')}
                  style={{
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                  }}
                />
                <div className="testimonial-text bg-white p-4 mt-n5">
                  <p className="mt-5">
                    Dolor et eos labore, stet justo sed est sed. Diam sed sed
                    dolor stet amet eirmod eos labore diam
                  </p>
                  <h5 className="text-truncate">Client Name</h5>
                  <span>Profession</span>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
