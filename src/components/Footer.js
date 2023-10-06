import React from 'react';
import './../styles/Footer.css';
import {
  CaretRightFill,
  ChevronBarRight,
  ChevronRight,
  EnvelopeOpen,
  Facebook,
  GeoAlt,
  Instagram,
  Linkedin,
  Telephone,
  Twitter,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import logo from './../img/sainath-logo-removebg-preview.png';

const Footer = () => {
  return (
    <>
      <footer>
        <div id="contact" className="footer mt-0">
          <div className="container ">
            <div className="row pdn-top-30">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul className="location_icon">
                  <li>
                    {' '}
                    <Link to="/">
                      <Facebook color="white" size={20} />
                      {/* <img src={facebook} alt="facebook logo" /> */}
                    </Link>
                  </li>
                  <li>
                    {' '}
                    <Link to="/">
                      <Instagram color="white" size={20} />
                      {/* <img src={instagram} alt="instagram logo" /> */}
                    </Link>
                  </li>
                  <li>
                    {' '}
                    <Link to="/">
                      <Linkedin color="white" size={20} />
                      {/* <img src={linkedin} alt="linkedin logo" /> */}
                    </Link>
                  </li>
                  <li>
                    {' '}
                    <Link to="/">
                      <Twitter color="white" size={20} />
                      {/* <img src={Twitter} alt="twitter logo" /> */}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="Follow">
                  <h3>CONTACT US</h3>

                  <span>
                    <div className="d-flex gap-1">
                      <GeoAlt className="mt-1" />
                      <div>
                        219, Silver Square, <br />
                        Opposite Dipak School,
                        <br />
                        Nikol, Ahmedabad,
                        <br />
                        Gujarat 380049
                        <br />
                        <br />
                      </div>
                    </div>
                    <Telephone /> +91 9879228646
                  </span>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="Follow">
                  <h3>ADDITIONAL LINKS</h3>
                  <ul className="link">
                    <li>
                      <Link to="/about">
                        <ChevronRight color="#fff" size={14} /> About us
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <ChevronRight color="#fff" size={14} /> Terms of
                        services
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">
                        <ChevronRight color="#fff" size={14} /> Privacy policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/faq">
                        <ChevronRight color="#fff" size={14} /> FAQ's
                      </Link>
                    </li>
                    <li>
                      <Link to="/contactUs">
                        <ChevronRight color="#fff" size={14} /> Contact us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="Follow">
                  <h3> Contact</h3>
                  <form>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <input
                          className="Newsletter"
                          name="name"
                          // value={feedback.name}
                          // onChange={(e) =>
                          //   setFeedback({ ...feedback, name: e.target.value })
                          // }
                          placeholder="Name"
                          type="text"
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                        <input
                          className="Newsletter"
                          name="email"
                          // value={feedback.email}
                          // onChange={(e) =>
                          //   setFeedback({ ...feedback, email: e.target.value })
                          // }
                          placeholder="Email"
                          type="text"
                        />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <textarea
                          className="textarea"
                          name="message"
                          // value={feedback.message}
                          // onChange={(e) =>
                          //   setFeedback({
                          //     ...feedback,
                          //     message: e.target.value,
                          //   })
                          // }
                          placeholder="message"
                          type="text"
                        ></textarea>
                      </div>
                      {/* <input type='submit' className="Subscribe">Submit</input> */}
                    </div>
                  </form>
                  <button
                    type="submit"
                    className="Subscribe"
                    //   onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="copyright">
              <div className="container">
                <p>
                  Copyright 2019 All Right Reserved By{' '}
                  <Link to="https://html.design/">Sainath Holidays</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <>
        {/* <div
        className="container-fluid bg-dark text-white-50 py-1 px-sm-3 px-lg-5"
        style={{ marginTop: '90px', backgroundColor: '#5D3830' }}
      >
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 mb-5">
            <Link to="" className="navbar-brand">
              <h1 className="" style={{ color: '#F58634' }}>
                <span className="text-white">SAINA</span>TH
              </h1>
            </Link>
            <p>
              Sed ipsum clita tempor ipsum ipsum amet sit ipsum lorem amet
              labore rebum lorem ipsum dolor. No sed vero lorem dolor dolor
            </p>
            <h6
              className="text-white text-uppercase mt-4 mb-3"
              style={{ letterSpacing: '5px' }}
            >
              Follow Us
            </h6>
            <div className="d-flex justify-content-start gap-2">
              <Link className="btn btn-outline-primary btn-square mr-2" to="#">
                <Twitter />
              </Link>
              <Link className="btn btn-outline-primary btn-square mr-2" to="#">
                <Facebook />
              </Link>
              <Link className="btn btn-outline-primary btn-square mr-2" to="#">
                <Linkedin />
              </Link>
              <Link className="btn btn-outline-primary btn-square" to="#">
                <Instagram />
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h5
              className="text-white text-uppercase mb-4"
              style={{ letterSpacing: '5px' }}
            >
              Our Services
            </h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> About
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Destination
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Services
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Packages
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Guides
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Testimonial
              </Link>
              <Link className="text-white-50" to="#">
                <CaretRightFill /> Blog
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h5
              className="text-white text-uppercase mb-4"
              style={{ letterSpacing: '5px' }}
            >
              Usefull Links
            </h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> About
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Destination
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Services
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Packages
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Guides
              </Link>
              <Link className="text-white-50 mb-2" to="#">
                <CaretRightFill /> Testimonial
              </Link>
              <Link className="text-white-50" to="#">
                <CaretRightFill /> Blog
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h5
              className="text-white text-uppercase mb-4"
              style={{ letterSpacing: '5px' }}
            >
              Contact Us
            </h5>
            <p>
              <GeoAlt /> 123 Street, New York, USA
            </p>
            <p>
              <Telephone /> +012 345 67890
            </p>
            <p>
              <EnvelopeOpen /> info@example.com
            </p>
            <h6
              className="text-white text-uppercase mt-4 mb-3"
              style={{ letterSpacing: '5px' }}
            >
              Newsletter
            </h6>
            <div className="w-100">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-light"
                  style={{ padding: '25px' }}
                  placeholder="Your Email"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary px-3">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5"
        style={{ borderColor: 'rgba(256, 256, 256, .1) !important' }}
      >
        <div className="row">
          <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white-50">
              Copyright &copy; <Link to="#">Domain</Link>. All Rights Reserved.
            </p>
          </div>
          <div className="col-lg-6 text-center text-md-right">
            <p className="m-0 text-white-50">
              Designed by <Link to="">HTML Codex</Link>
            </p>
          </div>
        </div>
      </div> */}
      </>
    </>
  );
};

export default Footer;
