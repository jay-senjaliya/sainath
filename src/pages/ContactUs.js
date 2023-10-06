import React, { useState } from 'react';
import './../styles/ContactUs.css';
import Breadcrumb from '../components/Breadcrumb';
import { EnvelopeOpen, GeoAlt, Telephone } from 'react-bootstrap-icons';
import SectionTitle from '../components/SectionTitle';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormHelperText } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePackageContext } from '../context/PackageContext';
import contactService from '../services/contactService';

export default function ContactUs() {
  const context = usePackageContext();
  const { updateContactData } = context;
  const [initialValuesState, setInitialValuesState] = useState({});
  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name reuired!'),
    email: Yup.string().email().required('Email required'),
    mobile: Yup.number().required('Mobile no required'),
    message: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log(values);
    contactService
      .CreateContact(values)
      .then((res) => {
        console.log('object in');
        updateContactData();
        setInitialValuesState(initialValues);
        toast.success('contact enquiry sent!!', { position: 'bottom-right' });
      })
      .catch((err) => {
        toast.error(err.response.data.errror, { position: 'bottom-right' });
      });
  };
  return (
    <div className="contact-us-page">
      <div className="contact-us-header">
        <img
          className="contact-img"
          src={require('./../img/contact-us-bg.jpg')}
          alt="contact us banner"
        />
        <div className="contact-header-content">
          <h1>Contact Us</h1>
          <p>
            Do you have any questions or inquiries? We're here to help! Get in
            touch with us using the form below:
          </p>
        </div>
      </div>
      <Breadcrumb list={[{ key: 'Home', value: '/' }]} last="Contact Us" />

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <SectionTitle
                mainTitle="Contact Us"
                description="Contact For Any Query"
              />
            </div>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h5>Get In Touch</h5>
              <p className="mb-4">
                Do you have any questions or inquiries? We're here to help! Get
                in touch with us using the details below:
              </p>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#F58634',
                  }}
                >
                  <GeoAlt size={24} color="white" />
                </div>
                <div className="ms-3">
                  <h5 className="" style={{ color: '#5D3830' }}>
                    Office
                  </h5>
                  <p className="mb-0" style={{ color: 'rgb(101 94 94)' }}>
                    219, Silver Square, Nikol
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 "
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#F58634',
                  }}
                >
                  <Telephone size={24} color="white" />
                </div>
                <div className="ms-3">
                  <h5 className="" style={{ color: '#5D3830' }}>
                    Mobile
                  </h5>
                  <p className="mb-0" style={{ color: 'rgb(101 94 94)' }}>
                    +91 9879228646
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 "
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#F58634',
                  }}
                >
                  <EnvelopeOpen size={24} color="white" />
                </div>
                <div className="ms-3">
                  <h5 className="" style={{ color: '#5D3830' }}>
                    Email
                  </h5>
                  <p className="mb-0" style={{ color: 'rgb(101 94 94)' }}>
                    info.sainath@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4166.46492032386!2d72.66449218404985!3d23.04639705427925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e871daa53c647%3A0x8cf0b224cd2e35b3!2sSAINATH%20HOLIDAYS!5e0!3m2!1sen!2sin!4v1689934636007!5m2!1sen!2sin"
                frameborder="0"
                style={{ minHeight: '300px', border: '0' }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
            <div
              className="col-lg-4 col-md-12 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <Formik
                initialValues={initialValuesState}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => handleSubmit(values)}
                // onSubmit={() => setInitialValuesState(initialValues)}
              >
                {({
                  values,
                  handleBlur,
                  errors,
                  setFieldValue,
                  setFieldError,
                }) => {
                  return (
                    <Form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              errors={errors.name}
                              onBlur={handleBlur}
                              value={values.name}
                              onChange={(e) =>
                                setFieldValue('name', e.target.value)
                              }
                              placeholder="Your Name"
                            />
                            <label for="name">Your Name</label>
                            <FormHelperText error>
                              <ErrorMessage name="name"></ErrorMessage>
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              name="email"
                              errors={errors.email}
                              onBlur={handleBlur}
                              value={values.email}
                              onChange={(e) =>
                                setFieldValue('email', e.target.value)
                              }
                              placeholder="Your Email"
                            />
                            <label for="email">Your Email</label>
                            <FormHelperText error>
                              <ErrorMessage name="email"></ErrorMessage>
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input
                              type="number"
                              inputmode="numeric"
                              maxLength={10}
                              minLength={10}
                              className="form-control"
                              id="mobile"
                              name="mobile"
                              errors={errors.mobile}
                              onBlur={handleBlur}
                              value={values.mobile}
                              onChange={(e) =>
                                setFieldValue('mobile', e.target.value)
                              }
                              placeholder="Subject"
                            />
                            <label for="subject">Mobile No.</label>
                            <FormHelperText error>
                              <ErrorMessage name="mobile"></ErrorMessage>
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <textarea
                              className="form-control"
                              placeholder="Leave a message here"
                              id="message"
                              name="message"
                              errors={errors.message}
                              onBlur={handleBlur}
                              value={values.message}
                              onChange={(e) =>
                                setFieldValue('message', e.target.value)
                              }
                              style={{ height: '100px' }}
                            ></textarea>
                            <label for="message">Message</label>
                            <FormHelperText error>
                              <ErrorMessage name="message"></ErrorMessage>
                            </FormHelperText>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn  w-100 py-3"
                            type="submit"
                            style={{
                              backgroundColor: '#F58634',
                              color: '#fff',
                            }}
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
