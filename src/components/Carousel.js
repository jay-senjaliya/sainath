import React, { useEffect, useRef } from 'react';
import './../styles/Carousel.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

const Carousel = () => {
  const carouselRef = useRef(null);
  // const myElement = useRef(null);

  // useEffect(() => {
  //   // Animate the element using GSAP
  //   gsap.from(myElement.current, { opacity: 0, duration: 1, y: 50 });
  // }, []);
  const goToPrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const goToNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  return (
    <>
      <div className="carousel-container">
        <OwlCarousel
          ref={carouselRef}
          items={1}
          dots={false}
          nav={true}
          mouseDrag={true}
          touchDrag={true}
          // autoplay={true}
          // autoplayTimeout={4000}
          // autoplayHoverPause={true}
        >
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kashmir-2.jpg')}
            />
            <div className="banner-content">
              <h1 style={{ fontWeight: 900 }}>SAINATH HOLIDAYS</h1>
              <p>
                Plan your trip with us and travel around the world with the most
                affordable packages!
              </p>
              {/* <button className="button">Book Now!</button> */}
            </div>
          </div>
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kashmir-1.jpg')}
            />
            <div className="banner-content">
              <h1 style={{ fontWeight: 900 }}>Domestic Packages</h1>
              {/* <button className="button">VIEW PACKAGES</button> */}
            </div>
          </div>
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kashmir-3.jpg')}
            />
            <div className="banner-content">
              <h1 style={{ fontWeight: 900 }}>International Packages</h1>
              {/* <button className="button">VIEW PACKAGES</button> */}
            </div>
          </div>
          <div className="banner">
            <img
              className="banner-img"
              src={require('./../img/kerala-3.jpg')}
            />
            <div className="banner-content">
              <h1 style={{ fontWeight: 900 }}>Pan India Hotels</h1>
              {/* <button className="button">VIEW PACKAGES</button> */}
            </div>
          </div>
        </OwlCarousel>
        {/* <div className="carousel-nav"> */}
        <div className="prev-button" onClick={goToPrevSlide}>
          <ChevronLeft size={40} color="#fff" />
        </div>
        <div className="next-button" onClick={goToNextSlide}>
          <ChevronRight size={40} color="#fff" />
        </div>
        {/* </div> */}
      </div>
      {/* <div className="banner">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
          <SwiperSlide>
            <img
              className="banner-img"
              src={require('./../img/kashmir-1.jpg')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="banner-img"
              src={require('./../img/kashmir-2.jpg')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="banner-img"
              src={require('./../img/kashmir-3.jpg')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="banner-img"
              src={require('./../img/kerala-1.jpg')}
            />
          </SwiperSlide>
        </Swiper>
      </div> */}
      {/* <div className="banner">
        <img className="banner-video" src={require('./../img/kashmir-2.jpg')} />
        <div className="banner-content">
          <h1>SAINATH HOLIDAYS</h1>
          <p>
            Plan your trip with us and travel around the world with the most
            affordable packages!
          </p>
          <button className="button">Book Now!</button>
        </div>
      </div> */}
    </>
  );
};

export default Carousel;
