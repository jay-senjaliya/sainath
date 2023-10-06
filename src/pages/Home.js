import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import './../styles/Home.css';
import DestinationCard from '../components/DestinationCard';
import { usePackageContext } from '../context/PackageContext';
import Subscribe from '../components/Subscribe';
import SectionTitle from '../components/SectionTitle';
import Testimonial from '../components/Testimonial';

const Home = () => {
  const context = usePackageContext();
  const { destinationData, hotelData } = context;
  const [domesticDestinations, setDomesticDestinations] = useState([]);
  const [internationalDestinations, setInternationalDestinations] = useState(
    []
  );

  useEffect(() => {
    setDomesticDestinations(
      destinationData.filter((el) => el.category === 'domestic')
    );
  }, [destinationData]);

  useEffect(() => {
    setInternationalDestinations(
      destinationData.filter((el) => el.category === 'international')
    );
  }, [destinationData]);
  return (
    <>
      <div id="main">
        <Carousel />
        <section id="service-home" class="service-home">
          <div className="container">
            <div className="service-home-counter text-center row">
              <div className="col-md-4 col-sm-4">
                <div className="single-service-box">
                  <div className="service-home-img w-10 mx-auto">
                    <img
                      className="img-fluid"
                      src={require('./../img/destination.png')}
                      alt="service-icon"
                    />
                  </div>
                  <div className="service-home-content">
                    <h2>
                      <a href="#">amazing tour packages</a>
                    </h2>
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="single-service-box ">
                  <div className="service-home-img w-10 mx-auto">
                    <img
                      className="img-fluid"
                      src={require('./../img/skyscraper.png')}
                      alt="service-icon"
                    />
                  </div>
                  <div className="service-home-content">
                    <h2>
                      <a href="#">book top class hotel</a>
                    </h2>
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="single-service-box">
                  <div className="service-home-img w-10 mx-auto">
                    <img
                      className="img-fluid mx-auto"
                      src={require('./../img/plane.png')}
                      alt="service-icon"
                    />
                  </div>
                  <div className="service-home-content">
                    <h2>
                      <a href="#">online flight booking</a>
                    </h2>
                    <p>
                      Duis aute irure dolor in velit esse cillum dolore eu
                      fugiat nulla.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="container-xxl"
          style={{
            width: '100%',
          }}
        >
          <div className="domestic-packages-home">
            <div
              className="text-center wow fadeInUp mt-4"
              data-wow-delay="0.1s"
            >
              <SectionTitle
                mainTitle="Destinations"
                description="Domestic packages"
              />
            </div>
            <div className="row  g-3 p-3 ">
              {domesticDestinations?.map((destinationInfo, index) => {
                return (
                  <DestinationCard key={index} destination={destinationInfo} />
                );
              })}
            </div>
          </div>
          <div className="international-packages-home">
            <div
              className="text-center wow fadeInUp mt-4"
              data-wow-delay="0.1s"
            >
              <SectionTitle
                mainTitle="Destinations"
                description="International packages"
              />
            </div>
            <div className="row g-3 p-3 ">
              {internationalDestinations?.map((destinationInfo, index) => {
                return (
                  <DestinationCard key={index} destination={destinationInfo} />
                );
              })}
            </div>
          </div>
          <div className="pan-india-hotels-home">
            <div
              className="text-center wow fadeInUp mt-4"
              data-wow-delay="0.1s"
            >
              <SectionTitle mainTitle="Hotels" description="Pan india hotels" />
            </div>
            <div className="row width-100 g-3 p-3 ">
              {hotelData?.map((hotelInfo, index) => {
                return <DestinationCard key={index} destination={hotelInfo} />;
              })}
            </div>
          </div>
        </div>
        <div className="testimonial-home">
          <Testimonial />
        </div>
        <div className="subscribe-home">
          <Subscribe />
        </div>
      </div>
    </>
  );
};

export default Home;
