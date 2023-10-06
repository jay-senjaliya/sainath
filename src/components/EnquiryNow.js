import React, { useEffect, useRef, useState } from 'react';
import { usePackageContext } from '../context/PackageContext';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { FormHelperText } from '@mui/material';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormikContext } from 'formik';

const EnquiryNow = () => {
  const packageContext = usePackageContext();
  const { enquiryNow, closeEnquiryNow, openEnquiryNow } = packageContext;
  const initialValues = {
    name: '',
    email: '',
    destination: '',
    noOfNight: '',
    hotelCategory: '',
    totalRoom: '',
    checkInDate: '',
    checkOutDate: '',
    visaType: '',
    insurance: '',
    extraBed: '',
    mealPlan: '',
    childWithoutBed: '',
    transfer: '',
    mobileNo: '',
    additionalInfo: '',
  };

  const [initialValuesState, setInitialValuesState] = useState(initialValues);

  useEffect(() => {
    // setInitialValuesState(initialValues);
    console.log(initialValuesState);
  }, [initialValuesState]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Enter name'),
    email: Yup.string().email().required('Enter email'),
    destination: Yup.string().required('Enter Destination name'),
    noOfNight: Yup.number(),
    hotelCategory: Yup.string(),
    totalRoom: Yup.number(),
    checkInDate: Yup.string(),
    checkOutDate: Yup.string(),
    visaType: Yup.string(),
    insurance: Yup.string(),
    extraBed: Yup.number(),
    mealPlan: Yup.string(),
    childWithoutBed: Yup.number(),
    transfer: Yup.string(),
    mobileNo: Yup.number().required('Enter mobile no.'),
    additionalInfo: Yup.string(),
  });

  // const btnRef = useRef(null);
  const ref = useRef(null);
  if (enquiryNow) {
    ref.current.click();
  }

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (
    values,
    resetForm,
    setErrors,
    errors,
    setFieldError
  ) => {
    // console.log(initialValuesState);
    setInitialValuesState(initialValues);
    // resetForm();
    // setFieldError('name', '');
    console.log(values);

    const templateParams = {
      name: values.name,
      email: values.email,
      destination: values.destination,
      noOfNight: values.noOfNight,
      hotelCategory: values.hotelCategory,
      totalRoom: values.totalRoom,
      checkInDate: values.checkInDate,
      checkOutDate: values.checkOutDate,
      visaType: values.visaType,
      insurance: values.insurance,
      extraBed: values.extraBed,
      mealPlan: values.mealPlan,
      childWithoutBed: values.childWithoutBed,
      transfer: values.transfer,
      mobileNo: values.mobileNo,
      additionalInfo: values.additionalInfo,
    };

    // await emailjs
    //   .send(
    //     'service_jdkjgft',
    //     'template_1rry34w',
    //     templateParams,
    //     '1Eyq3DhnmXnJjYgvu'
    //   )
    //   .then((res) => {
    //     toast.success('Enquiry submitted successfully', {
    //       position: 'bottom-right',
    //     });

    //     console.log(res);
    //     console.log(initialValuesState);
    //     // openEnquiryNow();
    //   })
    //   .catch((err) => {
    //     toast.error(err.message, { position: 'bottom-right' });
    //     console.log(err);
    //   });
  };
  return (
    <>
      <>
        <button
          type="button"
          ref={ref}
          onClick={closeEnquiryNow}
          className="btn btn-primary d-none"
          data-toggle="modal"
          data-target="#enquiryNow"
        >
          Enquiry NOW
        </button>
        <div
          className="modal fade"
          id="enquiryNow"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title " id="exampleModalLongTitle">
                  International Query Form
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
                  onSubmit={(values) => console.log('submitted!!')}
                >
                  {({
                    values,
                    handleBlur,
                    errors,
                    setFieldValue,
                    resetForm,
                    setErrors,
                    setFieldError,
                  }) => {
                    return (
                      <Form className="row">
                        {/* Name */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={values.name}
                            onBlur={handleBlur}
                            error={errors.name}
                            onChange={(e) => {
                              setFieldValue('name', e.target.value);
                            }}
                          />
                          <FormHelperText error>
                            <ErrorMessage name="name"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        {/* Email */}
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
                        {/* Mobile No */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="mobileNo" className="form-label">
                            Mobile No
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
                        {/* Destination*/}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="destination" className="form-label">
                            Destination
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="destination"
                            name="destination"
                            value={values.destination}
                            onBlur={handleBlur}
                            error={errors.destination}
                            onChange={(e) => {
                              setFieldValue('destination', e.target.value);
                            }}
                          >
                            <option value="none" hidden>
                              Select Destination
                            </option>
                            <option value="dubai">Dubai</option>
                            <option value="thailand">Thailand</option>
                            <option value="bangkok">Bangkok</option>
                            <option value="pattaya">Pattaya</option>
                            <option value="bangkok+pattaya">
                              Bangkok + Pattaya
                            </option>
                            <option value="phuket+karabi">
                              Phuket + Karabi
                            </option>
                            <option value="phuket+karabi+bangkok">
                              Phuket + Karabi + Bangkok
                            </option>
                            <option value="bangkok+pattaya+phuket">
                              Bangkok + Pattaya + Phuket
                            </option>
                            <option value="bangkok+pattaya+phuket+karabi">
                              Bangkok + Pattaya + Phuket + Karabi
                            </option>
                            <option value="bali">Bali</option>
                            <option value="maldives">Maldives</option>
                            <option value="singapore">Singapore</option>
                          </select>
                          <FormHelperText error>
                            <ErrorMessage name="destination"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        {/* No of Night */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="noOfNight" className="form-label">
                            No of Nights
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="noOfNight"
                            name="noOfNight"
                            value={values.noOfNight}
                            onBlur={handleBlur}
                            error={errors.noOfNight}
                            onChange={(e) => {
                              setFieldValue('noOfNight', e.target.value);
                            }}
                          >
                            <option value="none" hidden>
                              Select No of Night
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
                            <ErrorMessage name="noOfNight"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        {/* Hotel Category */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="hotelCategory" className="form-label">
                            Hotel Category
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="hotelCategory"
                            name="hotelCategory"
                            value={values.hotelCategory}
                            onBlur={handleBlur}
                            error={errors.hotelCategory}
                            onChange={(e) => {
                              setFieldValue('hotelCategory', e.target.value);
                            }}
                          >
                            <option value="none" hidden>
                              Select Category
                            </option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Star</option>
                            <option value="3">3 Star</option>
                            <option value="4">4 Star</option>
                            <option value="5">5 Star</option>
                          </select>
                          <FormHelperText error>
                            <ErrorMessage name="hotelCategory"></ErrorMessage>
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
                        {/* Checkin Date */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="checkInDate" className="form-label">
                            Check In Date
                          </label>
                          <input
                            type="date"
                            min={today}
                            className="form-control"
                            name="checkInDate"
                            id="checkInDate"
                            value={values.checkInDate}
                            onBlur={handleBlur}
                            error={errors.checkInDate}
                            onChange={(e) => {
                              setFieldValue('checkInDate', e.target.value);
                            }}
                          />
                          <FormHelperText error>
                            <ErrorMessage name="checkInDate"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        {/* Checkout Date */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="checkOutDate" className="form-label">
                            Check Out Date
                          </label>
                          <input
                            type="date"
                            min={today}
                            className="form-control"
                            name="checkOutDate"
                            id="checkOutDate"
                            value={values.checkOutDate}
                            onBlur={handleBlur}
                            error={errors.checkOutDate}
                            onChange={(e) => {
                              setFieldValue('checkOutDate', e.target.value);
                            }}
                          />
                          <FormHelperText error>
                            <ErrorMessage name="checkOutDate"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        {/* Visa Type */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="visaType" className="form-label">
                            Visa Type
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="visaType"
                            name="visaType"
                            value={values.visaType}
                            onBlur={handleBlur}
                            error={errors.visaType}
                            onChange={(e) => {
                              setFieldValue('visaType', e.target.value);
                            }}
                          >
                            <option value="none" hidden>
                              Select Visa Type
                            </option>
                            <option value="tourist">Tourist Visa</option>
                            <option value="business">Business Visa</option>
                          </select>
                          <FormHelperText error>
                            <ErrorMessage name="visaType"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        {/* Insurance*/}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="insurance" className="form-label">
                            Insurance
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="insurance"
                            name="insurance"
                            value={values.insurance}
                            onBlur={handleBlur}
                            error={errors.insurance}
                            onChange={(e) => {
                              setFieldValue('insurance', e.target.value);
                            }}
                          >
                            <option value="none" hidden>
                              Select
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          <FormHelperText error>
                            <ErrorMessage name="insurance"></ErrorMessage>
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
                        {/* No of Child Without Bed */}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label
                            htmlFor="childWithoutBed"
                            className="form-label"
                          >
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
                        {/* Transfer*/}
                        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                          <label htmlFor="transfer" className="form-label">
                            Transfer
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            id="transfer"
                            name="transfer"
                            value={values.transfer}
                            onBlur={handleBlur}
                            error={errors.transfer}
                            onChange={(e) => {
                              setFieldValue('transfer', e.target.value);
                            }}
                          >
                            <option value="none" hidden>
                              Select
                            </option>
                            <option value="pvt">PVT</option>
                            <option value="sic">SIC</option>
                          </select>
                          <FormHelperText error>
                            <ErrorMessage name="transfer"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        {/* Additional information */}
                        <div className="col-12 mb-1">
                          <label
                            htmlFor="additinoalInfo"
                            className="form-label"
                          >
                            Additional Information
                          </label>
                          <textarea
                            className="form-control"
                            name="additinoalInfo"
                            id="additinoalInfo"
                            rows={3}
                            value={values.additinoalInfo}
                            onBlur={handleBlur}
                            error={errors.additinoalInfo}
                            onChange={(e) => {
                              setFieldValue('additinoalInfo', e.target.value);
                            }}
                          ></textarea>
                          <FormHelperText error>
                            <ErrorMessage name="additinoalInfo"></ErrorMessage>
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
                            onClick={closeEnquiryNow}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() =>
                              handleSubmit(
                                values,
                                resetForm,
                                setErrors,
                                errors,
                                setFieldError
                              )
                            }
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default EnquiryNow;
