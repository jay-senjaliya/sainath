import React from 'react';
import './../styles/Team.css';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons';
import SectionTitle from './SectionTitle';

const Team = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <SectionTitle mainTitle="Travel Guide" description="Meet Our Guide" />
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img
                  className="img-fluid"
                  src={require('./../img/guide-1.jpg')}
                  alt=""
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: '-19px' }}
              >
                <Link className="btn btn-square mx-1" to="">
                  <Facebook size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Twitter size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Instagram size={22} />
                </Link>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img
                  className="img-fluid"
                  src={require('./../img/guide-2.jpg')}
                  alt=""
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: '-19px' }}
              >
                <Link className="btn btn-square mx-1" to="">
                  <Facebook size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Twitter size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Instagram size={22} />
                </Link>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img
                  className="img-fluid"
                  src={require('./../img/guide-3.jpg')}
                  alt=""
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: '-19px' }}
              >
                <Link className="btn btn-square mx-1" to="">
                  <Facebook size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Twitter size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Instagram size={22} />
                </Link>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="team-item">
              <div className="overflow-hidden">
                <img
                  className="img-fluid"
                  src={require('./../img/guide-4.jpg')}
                  alt=""
                />
              </div>
              <div
                className="position-relative d-flex justify-content-center"
                style={{ marginTop: '-19px' }}
              >
                <Link className="btn btn-square mx-1" to="">
                  <Facebook size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Twitter size={22} />
                </Link>
                <Link className="btn btn-square mx-1" to="">
                  <Instagram size={22} />
                </Link>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Full Name</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
