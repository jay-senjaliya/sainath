import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './../styles/Domestic.css';
import Breadcrumb from '../components/Breadcrumb';
import { usePackageContext } from '../context/PackageContext';
import DestinationCard from '../components/DestinationCard';

const Hotel = () => {
  const context = usePackageContext();
  const { hotelData } = context;

  return (
    <div className="domestic-packages">
      <div className="domestic-page-header">
        <OwlCarousel items={1} dots={false} autoPlay={true} navigation={true}>
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
            PAN INDIA <span>HOTELS</span>
          </h1>
        </div>
      </div>
      <Breadcrumb list={[{ key: 'Home', value: '/' }]} last="hotel " />
      <div className="container-xxl">
        <div className="row g-3 p-3">
          {hotelData?.map((hotelInfo, index) => {
            return <DestinationCard key={index} destination={hotelInfo} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
