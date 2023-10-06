import React, { useEffect, useRef, useState } from 'react';
import { usePackageContext } from '../context/PackageContext';
import './../styles/BookNowForm.css';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { FormHelperText } from '@mui/material';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookNowForm = () => {
  const params = useParams();
  const packageContext = usePackageContext();
  const { bookNow, closeBookNow, openBookNow } = packageContext;

  const initialValues = {
    bookingCode: params.BookingCode,
    guestName: '',
    mobileNo: '',
    email: '',
    totalPerson: '',
    totalRoom: '',
    mealPlan: '',
    travelDate: '',
    vehicleType: '',
    extraBed: '',
    childWithoutBed: '',
    noOfVehicle: '',
    pickUpTime: '',
    dropTime: '',
    additionalInfo: '',
  };

  const [initialValuesState, setInitialValuesState] = useState(initialValues);

  useEffect(() => {
    setInitialValuesState(initialValues);
  }, []);

  const validationSchema = Yup.object().shape({
    bookingCode: Yup.string(),
    guestName: Yup.string().required('Enter name'),
    mobileNo: Yup.number().required('Enter mobile no.'),
    email: Yup.string().email().required('Enter email'),
    totalPerson: Yup.number(),
    totalRoom: Yup.number(),
    mealPlan: Yup.string(),
    travelDate: Yup.string(),
    vehicleType: Yup.string(),
    extraBed: Yup.number(),
    childWithoutBed: Yup.number(),
    noOfVehicle: Yup.number(),
    pickUpTime: Yup.string(),
    dropTime: Yup.string(),
    additionalInfo: Yup.string(),
  });

  // const btnRef = useRef(null);
  const ref = useRef(null);
  if (bookNow) {
    ref.current.click();
  }

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (values) => {
    const templateParams = {
      bookingCode: values.bookingCode,
      guestName: values.guestName,
      mobileNo: values.mobileNo,
      email: values.email,
      totalPerson: values.totalPerson,
      totalRoom: values.totalRoom,
      mealPlan: values.mealPlan,
      travelDate: values.travelDate,
      vehicleType: values.vehicleType,
      extraBed: values.extraBed,
      childWithoutBed: values.childWithoutBed,
      noOfVehicle: values.noOfVehicle,
      pickUpTime: values.pickUpTime,
      dropTime: values.dropTime,
      additionalInfo: values.additionalInfo,
    };

    await emailjs
      .send(
        'service_jdkjgft',
        'template_562k0rr',
        templateParams,
        '1Eyq3DhnmXnJjYgvu'
      )
      .then((res) => {
        toast.success('Email sent successfully', { position: 'bottom-right' });
        console.log(res);
        // setInitialValuesState(initialValues);
        openBookNow();
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        onClick={closeBookNow}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#bookNow"
      >
        BOOK NOW
      </button>
      <div
        className="modal fade"
        id="bookNow"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLongTitle">
                Book Now
              </h5>
              <button
                type="button"
                className="btn close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValuesState}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => handleSubmit(values)}
              >
                {({ values, handleBlur, errors, setFieldValue }) => {
                  return (
                    <Form className="row">
                      {/* Booking Code */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="bookingCode" className="form-label">
                          Booking Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="bookingCode"
                          id="bookingCode"
                          disabled
                          value={values.bookingCode}
                          onBlur={handleBlur}
                          error={errors.bookingCode}
                          onChange={(e) => {
                            setFieldValue('bookingCode', e.target.value);
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="bookingCode"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/*  Name */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="guestName" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="guestName"
                          id="guestName"
                          value={values.guestName}
                          onBlur={handleBlur}
                          error={errors.guestName}
                          onChange={(e) => {
                            setFieldValue('guestName', e.target.value);
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="guestName"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Mobile No */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="mobileNo" className="form-label">
                          Mobile No.
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="mobileNo"
                          id="mobileNo"
                          value={values.mobileNo}
                          onBlur={handleBlur}
                          error={errors.mobileNo}
                          onChange={(e) => {
                            setFieldValue('mobileNo', e.target.value);
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="mobileNo"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Email  */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          value={values.email}
                          onBlur={handleBlur}
                          error={errors.email}
                          onChange={(e) => {
                            setFieldValue('email', e.target.value);
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="email"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* No of Person */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="totalPerson" className="form-label">
                          Total No of Pax
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="totalPerson"
                          name="totalPerson"
                          value={values.totalPerson}
                          onBlur={handleBlur}
                          error={errors.totalPerson}
                          onChange={(e) => {
                            setFieldValue('totalPerson', e.target.value);
                          }}
                        >
                          <option value="none" hidden>
                            Select No of Person
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <FormHelperText error>
                          <ErrorMessage name="totalPerson"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* No of Rooms */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="totalRoom" className="form-label">
                          No of Rooms
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="totalRoom"
                          name="totalRoom"
                          value={values.totalRoom}
                          onBlur={handleBlur}
                          error={errors.totalRoom}
                          onChange={(e) => {
                            setFieldValue('totalRoom', e.target.value);
                          }}
                        >
                          <option value="none" hidden>
                            Select No of Rooms
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <FormHelperText error>
                          <ErrorMessage name="totalRoom"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Meal Plan */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="mealPlan" className="form-label">
                          Meal Plan
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="mealPlan"
                          name="mealPlan"
                          value={values.mealPlan}
                          onBlur={handleBlur}
                          error={errors.mealPlan}
                          onChange={(e) => {
                            setFieldValue('mealPlan', e.target.value);
                          }}
                        >
                          <option value="none" hidden>
                            Select Meal Plan
                          </option>
                          <option value="ep">[ EP ] Room With No Meal</option>
                          <option value="cp">[ CP ] Breakfast</option>
                          <option value="map">
                            [ MAP ] Breakfast And Dinner
                          </option>
                          <option value="ap">
                            [ AP ] Breakfast, Lunch And Dinner
                          </option>
                        </select>
                        <FormHelperText error>
                          <ErrorMessage name="mealPlan"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Travel Date */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="travelDate" className="form-label">
                          Travel Date
                        </label>
                        <input
                          type="date"
                          min={today}
                          className="form-control"
                          name="travelDate"
                          id="travelDate"
                          value={values.travelDate}
                          onBlur={handleBlur}
                          error={errors.travelDate}
                          onChange={(e) => {
                            setFieldValue('travelDate', e.target.value);
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="travelDate"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Vehicle Type */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="vehicleType" className="form-label">
                          Vehicle Type
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="vehicleType"
                          name="vehicleType"
                          value={values.vehicleType}
                          onBlur={handleBlur}
                          error={errors.vehicleType}
                          onChange={(e) => {
                            setFieldValue('vehicleType', e.target.value);
                          }}
                        >
                          <option value="none" hidden>
                            Select Vehicle
                          </option>
                          <option value="noVehicle">No Vehicle</option>
                          <option value="nac-sedan">Nac Sedan</option>
                          <option value="ac-sedan">Ac Sedan</option>
                          <option value="nac-innova">Nac Innova</option>
                          <option value="ac-innova">Ac Innova</option>
                          <option value="nac-ertiga">Nac Ertiga</option>
                          <option value="ac-ertiga">Ac Ertiga</option>
                          <option value="ac-20-traveller">
                            Ac 20 Seater Traveller
                          </option>
                          <option value="nac-34-bus">Nac 34 Seat Bus</option>
                          <option value="nac-56-bus">Nac 56 Seat Bus</option>
                        </select>
                        <FormHelperText error>
                          <ErrorMessage name="vehicleType"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* No of Etra Bed */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="extraBed" className="form-label">
                          No of Extra Bed
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="extraBed"
                          name="extraBed"
                          value={values.extraBed}
                          onBlur={handleBlur}
                          error={errors.extraBed}
                          onChange={(e) => {
                            setFieldValue('extraBed', e.target.value);
                          }}
                        >
                          <option value="none" hidden>
                            Select No of Extra Bed
                          </option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <FormHelperText error>
                          <ErrorMessage name="extraBed"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* No of Child Without Bed */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="childWithoutBed" className="form-label">
                          Child Without Bed
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="childWithoutBed"
                          name="childWithoutBed"
                          value={values.childWithoutBed}
                          onBlur={handleBlur}
                          error={errors.childWithoutBed}
                          onChange={(e) => {
                            setFieldValue('childWithoutBed', e.target.value);
                          }}
                        >
                          <option value="none" hidden>
                            Select No of Child Without Bed
                          </option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <FormHelperText error>
                          <ErrorMessage name="childWithoutBed"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* No of Vehicle*/}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="noOfVehicle" className="form-label">
                          No of Vehicle
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id="noOfVehicle"
                          name="noOfVehicle"
                          value={values.noOfVehicle}
                          onBlur={handleBlur}
                          error={errors.noOfVehicle}
                          onChange={(e) => {
                            setFieldValue('noOfVehicle', e.target.value);
                          }}
                        >
                          <option value="none" hidden>
                            Select No of Vehicle
                          </option>
                          <option value="noVehicle">No Vehicle</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        <FormHelperText error>
                          <ErrorMessage name="noOfVehicle"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Pickup time */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="pickUpTime" className="form-label">
                          Pick Up Time
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          name="pickUpTime"
                          id="pickUpTime"
                          value={values.pickUpTime}
                          onBlur={handleBlur}
                          error={errors.pickUpTime}
                          onChange={(e) => {
                            setFieldValue('pickUpTime', e.target.value);
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="pickUpTime"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Drop time */}
                      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                        <label htmlFor="dropTime" className="form-label">
                          Drop Time
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          name="dropTime"
                          id="dropTime"
                          value={values.dropTime}
                          onBlur={handleBlur}
                          error={errors.dropTime}
                          onChange={(e) => {
                            setFieldValue('dropTime', e.target.value);
                          }}
                        />
                        <FormHelperText error>
                          <ErrorMessage name="dropTime"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      {/* Additional information */}
                      <div className="col-12 mb-1">
                        <label htmlFor="additionalInfo" className="form-label">
                          Additional Information
                        </label>
                        <textarea
                          className="form-control"
                          name="additinoalInfo"
                          id="additionalInfo"
                          rows={3}
                          value={values.additionalInfo}
                          onBlur={handleBlur}
                          error={errors.additionalInfo}
                          onChange={(e) => {
                            setFieldValue('additionalInfo', e.target.value);
                          }}
                        ></textarea>
                        <FormHelperText error>
                          <ErrorMessage name="additionalInfo"></ErrorMessage>
                        </FormHelperText>
                      </div>
                      <p
                        className="mb-0 mt-2  "
                        style={{
                          fontSize: 13,
                          fontWeight: 400,
                          lineHeight: '23px',
                        }}
                      >
                        Call Sainath Holidays: +91 7990610649{' '}
                      </p>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={closeBookNow}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeBookNow}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookNowForm;
