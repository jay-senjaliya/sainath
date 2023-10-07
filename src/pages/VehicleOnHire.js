import React, { useEffect, useState } from 'react';
import './../styles/VehicleOnHire.css';
import Breadcrumb from '../components/Breadcrumb';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { usePackageContext } from '../context/PackageContext';

const VehicleOnHire = () => {
  const context = usePackageContext();
  const { vehicleData, updateVehicleData } = context;
  const [category, setCategory] = useState([]);

  useEffect(() => {
    updateVehicleData();
    // const categoryVehicle = [
    //   ...new Set(vehicleData.map((item) => item.category)),
    // ];
    // setCategory(categoryVehicle);
    // console.log(category);
  }, []);

  const handleScroll = (id) => {
    let element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 120;
      window.scrollTo({
        top: offset,
        behavior: 'smooth', // You can use 'auto' instead of 'smooth' for instant scrolling
      });
    }
  };
  return (
    <div className="vehicle-on-hire-page">
      <div className="vehicle-on-hire-page-header">
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
            VEHICLE <span>ON HIRE</span>
          </h1>
        </div>
      </div>
      <Breadcrumb
        list={[{ key: 'Home', value: '/' }]}
        last="Vehicle On Hire "
      />
      <div className="vehicle-hire-main-content my-4">
        <div className="d-flex mx-4 row">
          <div className="left  col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
            <div className="vehicle-category-left">
              <h3>vehicle category</h3>
              <ul>
                <li className="text-capitalize">
                  <Link onClick={() => handleScroll('bus')}>Bus</Link>
                </li>
                <li className="text-capitalize">
                  <Link onClick={() => handleScroll('traveller')}>
                    Traveller
                  </Link>
                </li>
                <li className="text-capitalize">
                  <Link onClick={() => handleScroll('cab')}>Cab</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="right col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
            {category.map((el, index) => {
              {
                vehicleData.map((vehicle, index) => {
                  {
                    if (el === vehicle.category) {
                    }
                  }
                });
              }
            })}
            <div id="bus" className="">
              <div
                className="text-center wow fadeInUp mt-4"
                data-wow-delay="0.1s"
              >
                <SectionTitle
                  mainTitle="Buses"
                  description="33 seater, 45 seater and 56 seater"
                />
              </div>
              {/* <div className="row"> */}
              <div className="row g-3 p-3">
                {vehicleData?.map((vehicle, i) => {
                  if (vehicle.category === 'bus') {
                    return (
                      <div className="col-lg-4 col-sm-6">
                        <div className="vehicle-card-vehicleonhire-page ">
                          <div className="card-header-vehicle">
                            <img src={vehicle.image[0]} alt="cab-1" />
                            <h4>Buses</h4>
                          </div>
                          <div className="card-content">
                            <p className="text-center px-2 pt-3">
                              {vehicle.name}
                            </p>
                            <h4>Starting Price</h4>
                            <h2>{vehicle.price}/-*</h2>
                            <h3>Per Km</h3>
                            <div className="card-button mx-auto pt-2">
                              Book Now
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div id="traveller">
              <div
                className="text-center wow fadeInUp mt-4"
                data-wow-delay="0.1s"
              >
                <SectionTitle
                  mainTitle="Traveller"
                  description="11 seater, 18 seater and 25 seater"
                />
              </div>
              <div className="row g-3 p-3">
                {vehicleData?.map((vehicle, i) => {
                  if (vehicle.category === 'traveller') {
                    return (
                      <div className="col-lg-4 col-sm-6">
                        <div className="vehicle-card-vehicleonhire-page">
                          <div className="card-header-vehicle">
                            <img src={vehicle.image[0]} alt="cab-1" />
                            <h4>Buses</h4>
                          </div>
                          <div className="card-content">
                            <p className="text-center px-2 pt-3">
                              {vehicle.name}
                            </p>
                            <h4>Starting Price</h4>
                            <h2>{vehicle.price}/-*</h2>
                            <h3>Per Km</h3>
                            <div className="card-button mx-auto pt-2">
                              Book Now
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div id="cab">
              <div
                className="text-center wow fadeInUp mt-4"
                data-wow-delay="0.1s"
              >
                <SectionTitle
                  mainTitle="Cab"
                  description="5 seater and 7 seater"
                />
              </div>
              <div className="row g-3 p-3">
                {vehicleData?.map((vehicle, i) => {
                  if (vehicle.category === 'cab') {
                    return (
                      <div className="col-lg-4 col-sm-6">
                        <div className="vehicle-card-vehicleonhire-page">
                          <div className="card-header-vehicle">
                            <img src={vehicle.image[0]} alt="cab-1" />
                            <h4>Buses</h4>
                          </div>
                          <div className="card-content">
                            <p className="text-center px-2 pt-3">
                              {vehicle.name}
                            </p>
                            <h4>Starting Price</h4>
                            <h2>{vehicle.price}/-*</h2>
                            <h3>Per Km</h3>
                            <div className="card-button mx-auto pt-2">
                              Book Now
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleOnHire;
