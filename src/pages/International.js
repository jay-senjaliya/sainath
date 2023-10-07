import React, { useEffect, useState } from 'react';
import { usePackageContext } from '../context/PackageContext';
import DestinationCard from '../components/DestinationCard';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './../styles/International.css';
import Breadcrumb from '../components/Breadcrumb';

const International = () => {
  const context = usePackageContext();
  const { destinationData } = context;
  const [internationalDestinations, setInternationalDestinations] = useState(
    []
  );
  useEffect(() => {
    setInternationalDestinations(
      destinationData.filter((el) => el.category === 'international')
    );
  }, [destinationData]);
  return (
    <div className="international-packages">
      <div className="international-page-header">
        <OwlCarousel
          items={1}
          dots={false}
          autoPlay={true}
          navigation={true}
          autoplay={true}
          autoplayTimeout={4000}
          autoplayHoverPause={true}
        >
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kashmir-2.jpg')}
            />
            <div className="banner-content"></div>
          </div>
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kashmir-1.jpg')}
            />
            <div className="banner-content"></div>
          </div>
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kashmir-3.jpg')}
            />
            <div className="banner-content"></div>
          </div>
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kerala-3.jpg')}
            />
            <div className="banner-content"></div>
          </div>
        </OwlCarousel>
        <div className="header-content">
          <h1 style={{ fontWeight: 900 }}>
            International <span>Packages</span>
          </h1>
        </div>
      </div>
      {/* <div className="contact-us-header">
        <img
          className="contact-img"
          src={require('./../img/kashmir-2.jpg')}
          alt="contact us banner"
        />
        <div className="header-content">
          <h1 style={{ fontWeight: 900 }}>
            International <span>Packages</span>
          </h1>
        </div>
      </div> */}
      <Breadcrumb list={[{ key: 'Home', value: '/' }]} last="International " />
      <div className="container-xxl">
        <div className="row g-3 p-3">
          {internationalDestinations?.map((destinationInfo, index) => {
            return (
              <DestinationCard key={index} destination={destinationInfo} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default International;
