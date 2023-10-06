import React from 'react';
import './../styles/Services.css';
import { Building, Globe2, Person, Gear } from 'react-bootstrap-icons';
import SectionTitle from './SectionTitle';

const Services = () => {
  return (
    // {/* Services start */}
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <SectionTitle mainTitle="Services" description="Our Services" />
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item rounded pt-3">
              <div className="p-4">
                <div className="service-icon" style={{ color: '#F58634' }}>
                  <Globe2 size={40} className="m-3" />
                </div>
                <h5>WorldWide Tours</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="service-item rounded pt-3">
              <div className="p-4">
                <div className="service-icon" style={{ color: '#F58634' }}>
                  <Building size={40} className="m-3" />
                </div>
                <h5>Hotel Reservation</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="service-item rounded pt-3">
              <div className="p-4">
                <div className="service-icon" style={{ color: '#F58634' }}>
                  <Person size={40} className="m-3" />
                </div>
                <h5>Travel Guides</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="service-item rounded pt-3">
              <div className="p-4">
                <div className="service-icon" style={{ color: '#F58634' }}>
                  <Gear size={40} className="m-3" />
                </div>
                <h5>Event Management</h5>
                <p>
                  Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                  amet diam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
