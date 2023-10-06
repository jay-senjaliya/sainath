import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './../styles/Domestic.css';
import './../styles/About.css';
import Breadcrumb from '../components/Breadcrumb';
import {
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import Team from '../components/Team';
import SectionTitle from '../components/SectionTitle';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="domestic-page-header">
        {/* <OwlCarousel items={1} dots={false} autoPlay={true} navigation={true}>
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/aboutus-hero.jpg')}
            />
            <div className="banner-content"></div>
          </div>
        </OwlCarousel>
        <div className="header-content">
          <h1 style={{ fontWeight: 900 }}>
            About <span>us</span>
          </h1>
          <p style={{ textAlign: 'center' }}>
            At Sainath Holidays, we're more than a travel agency; we're your
            trusted companions on the path to discovery. Let's embark on
            incredible adventures together.
          </p>
        </div> */}
        <img
          className="contact-img"
          src={require('./../img/aboutus-hero.jpg')}
          alt="contact us banner"
        />
        <div className="contact-header-content">
          <h1>About Us</h1>
          <p>
            At Sainath Holidays, we're more than a travel agency; we're your
            trusted companions on the path to discovery. Let's embark on
            incredible adventures together.
          </p>
        </div>
      </div>
      <Breadcrumb list={[{ key: 'Home', value: '/' }]} last="about " />

      {/* About start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: '400px' }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src={require('./../img/about-us.jpg')}
                  alt=""
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6
                className="section-title bg-white text-start pe-3"
                style={{
                  color: '#F58634',
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                }}
              >
                About Us
              </h6>
              <h1
                className="mb-4"
                style={{
                  color: '#5D3830',
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                }}
              >
                Welcome to{' '}
                <span
                  className=""
                  style={{
                    color: '#F58634',
                  }}
                >
                  Sainath
                </span>
              </h1>
              <p className="mb-4" style={{ textAlign: 'justify' }}>
                At Sainath Holidays, we're dedicated to transforming your travel
                aspirations into remarkable experiences.
              </p>
              <p className="mb-4" style={{ textAlign: 'justify' }}>
                With a passion for exploration and a wealth of expertise in
                crafting unforgettable journeys, we're your trusted partners in
                discovering the world's most captivating destinations. Our
                commitment to personalized service, attention to detail, and a
                deep love for travel sets us apart. Let's embark on a journey
                together, where every adventure becomes a cherished memory.
              </p>
              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <ArrowRight color="#F58634" /> First Class Flights
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <ArrowRight color="#F58634" /> Handpicked Hotels
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <ArrowRight color="#F58634" /> 5 Star Accommodations
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <ArrowRight color="#F58634" /> Latest Model Vehicles
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <ArrowRight color="#F58634" /> 150 Premium City Tours
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <ArrowRight color="#F58634" /> 24/7 Service
                  </p>
                </div>
              </div>
              {/* <Link
                className="btn  py-3 px-5 mt-2"
                style={{ backgroundColor: '#F58634', color: '#fff' }}
              >
                Read More
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Service */}
      <Services />

      {/* Team start */}
      <Team />
    </div>
  );
};

export default AboutUs;
