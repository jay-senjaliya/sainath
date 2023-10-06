import React, { useEffect, useState } from 'react';
import './../styles/AddPackage.css';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { FormHelperText } from '@mui/material';
import { PencilSquare, X } from 'react-bootstrap-icons';
import { isEqual } from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import packageService from '../services/packageService';
import PackageList from './PackageList';
import { usePackageContext } from '../context/PackageContext';

const AddPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const packageContext = usePackageContext();
  const { updatePackageData } = packageContext;
  let imageArray = [];
  const [inclusionItem, setInclusionItem] = useState('');
  const [exclusionItem, setExclusionItem] = useState('');
  const [importantNotesItem, setImportantNotesItem] = useState('');
  const [paymentTermItem, setPaymentTermItem] = useState('');
  const [additionalItem, setAdditionalItem] = useState('');
  const [cancellationPolicyItem, setCancellationPolicyItem] = useState('');
  const [itineraryItem, setItineraryItem] = useState({
    day: 0,
    heading: '',
    description: '',
  });
  const [similarHotelsItem, setSimilarHotelsItem] = useState('');
  const [hotelItem, setHotelItem] = useState({
    nights: 0,
    destination: '',
    name: '',
    roomType: '',
    mealPlan: '',
    similarHotels: [],
  });
  const [priceValue, setPriceValue] = useState('');
  const [priceItem, setPriceItem] = useState({ heading: '', value: [] });
  const initialValues = {
    name: '',
    packageType: '',
    code: '',
    startingPrice: 0,
    image: [],
    hotels: [],
    itinerary: [],
    price: [],
    inclusion: [],
    exclusion: [],
    importantNotes: [],
    additional: [],
    paymentTerm: [],
    cancellationPolicy: [],
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name must required!'),
    packageType: Yup.string().required('package type required'),
    code: Yup.string().required('Booking code required!'),
    startingPrice: Yup.number()
      .min(0, 'Price must be positive')
      .required('starting price required'),
    image: Yup.array().of(Yup.string()).max(3, 'Maximum of 3 images allowed'),
    hotels: Yup.array().of(Yup.object().required('Hotels is required')).min(1),
    price: Yup.array().of(Yup.object().required('price required')).min(1),
    inclusion: Yup.array()
      .of(Yup.string().required('Inclusion required!'))
      .min(1),
    exclusion: Yup.array()
      .of(Yup.string().required('Exclusion required!'))
      .min(1),
    importantNotes: Yup.array()
      .of(Yup.string().required('Important Notes required!'))
      .min(1),
    additional: Yup.array().of(Yup.string()),
    itinerary: Yup.array()
      .of(Yup.object().required('Itinerary required!'))
      .min(1),
    paymentTerm: Yup.array()
      .of(Yup.string().required('PaymentTerm required!'))
      .min(1),
    cancellationPolicy: Yup.array()
      .of(Yup.string().required('Cancellation Policy required!'))
      .min(1),
  });

  useEffect(() => {
    if (id) {
      GetPackageFromId();
    }
  }, [id]);

  const GetPackageFromId = () => {
    packageService.GetPackage(id).then((res) => {
      const editPackage = res.data.data;
      setInitialValuesState({
        name: editPackage.name,
        packageType: editPackage.packageType,
        code: editPackage.code,
        startingPrice: editPackage.startingPrice,
        image: editPackage.image,
        hotels: editPackage.hotels,
        itinerary: editPackage.itinerary,
        price: editPackage.price,
        inclusion: editPackage.inclusion,
        exclusion: editPackage.exclusion,
        importantNotes: editPackage.importantNotes,
        additional: editPackage.additional,
        paymentTerm: editPackage.paymentTerm,
        cancellationPolicy: editPackage.cancellationPolicy,
      });
    });
  };

  const handleSave = (values) => {
    // console.log('object', values);
    packageService
      .CreatePackage(values)
      .then((res) => {
        toast.success('package added successfully!', {
          position: 'bottom-right',
        });
        updatePackageData();
        console.log(res.data.data);
        setInitialValuesState(initialValues);
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  const handleUpdate = (values) => {
    packageService
      .UpdatePackage(values, id)
      .then((res) => {
        toast.success('package updated successfully!', {
          position: 'bottom-right',
        });
        updatePackageData();
        navigate('/package-list');
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  const handleUpload = (e, setFieldValue, setFieldError) => {
    imageArray = [];
    const files = e.target.files;
    console.log(imageArray);
    console.log(files.length);
    if (files?.length) {
      if (files.length > 3) {
        setFieldError('image', 'images must be less than or equal to 3');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const selectedFile = files[i];
        const fileNameArray = selectedFile.name.split('.');
        const extension = fileNameArray.pop();
        if (['png', 'jpg', 'jpeg'].includes(extension?.toLowerCase())) {
          if (selectedFile.size > 1000000) {
            setFieldError('image', 'File size must be less than 1MB!!');
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => {
            // console.log('reader load');
            imageArray.push(reader.result);
            setFieldValue('image', imageArray);
          };
          reader.onerror = (err) => {
            throw err;
          };
        } else {
          setFieldError('image', 'only jpg, png and jpeg files are allowed!');
          return;
        }
      }
    } else {
      setFieldValue('image', []);
      setFieldError('image', 'select image');
    }
  };

  return (
    <>
      <section>
        <div className="heading pt-3">
          <h1 className="text-center">{id ? 'Edit' : 'Add'} Package</h1>
        </div>
        <div className="container">
          <Formik
            initialValues={initialValuesState}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
              if (id) {
                handleUpdate(values);
              } else {
                handleSave(values);
              }
            }}
          >
            {({ values, handleBlur, errors, setFieldValue, setFieldError }) => {
              return (
                <Form>
                  <div className="row">
                    {/* Name */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        error={errors.name}
                        onBlur={handleBlur}
                        value={values.name}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="name"></ErrorMessage>
                      </FormHelperText>
                    </div>
                    {/* Package Type */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                      <label htmlFor="packageType" className="form-label">
                        Package Type
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        id="packageType"
                        name="packageType"
                        value={values.packageType}
                        error={errors.packageType}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('packageType', e.target.value);
                        }}
                      >
                        <option value="none" hidden>
                          Select Package Type
                        </option>
                        <option value="deluxe">Deluxe</option>
                        <option value="super deluxe">Super Deluxe</option>
                        <option value="premium">Premium</option>
                      </select>
                      <FormHelperText error>
                        <ErrorMessage name="packageType"></ErrorMessage>
                      </FormHelperText>
                    </div>
                  </div>
                  <div className="row">
                    {/* code */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                      <label htmlFor="code" className="form-label">
                        Booking Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="code"
                        id="code"
                        error={errors.code}
                        onBlur={handleBlur}
                        value={values.code}
                        onChange={(e) => setFieldValue('code', e.target.value)}
                      />
                      <FormHelperText error>
                        <ErrorMessage name="code"></ErrorMessage>
                      </FormHelperText>
                    </div>
                    {/* starting price */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                      <label htmlFor="startingPrice" className="form-label">
                        Starting Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="startingPrice"
                        id="startingPrice"
                        error={errors.startingPrice}
                        onBlur={handleBlur}
                        value={values.startingPrice}
                        onChange={(e) =>
                          setFieldValue('startingPrice', e.target.value)
                        }
                      />
                      <FormHelperText error>
                        <ErrorMessage name="startingPrice"></ErrorMessage>
                      </FormHelperText>
                    </div>
                  </div>
                  {/* Images */}
                  <div className="col-12 mb-3">
                    <label
                      htmlFor="image"
                      className="form-label form-label-file"
                    >
                      Select Image<sup>*</sup>
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="form-control"
                        id="image"
                        name="image"
                        aria-describedby="inputGroupFileAddon04"
                        aria-label="Upload"
                        // error={errors.base64image}
                        onBlur={handleBlur}
                        // value={imageArray}
                        onChange={(e) =>
                          handleUpload(e, setFieldValue, setFieldError, values)
                        }
                      />
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="image"></ErrorMessage>
                    </FormHelperText>

                    {values.image.map((img, index) => {
                      return (
                        <>
                          <div className="uploaded-img">
                            <em>
                              <img
                                src={img}
                                alt=""
                                style={{ height: 35 }}
                              ></img>
                            </em>{' '}
                            Image{' '}
                            <div
                              className="btn"
                              onClick={() => {
                                const newArray = values.image.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('image', newArray);
                              }}
                            >
                              X
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  {/* hotels */}
                  <div className="hotels-form">
                    <h5>Hotels</h5>
                    <FormHelperText error>
                      <ErrorMessage name="hotels"></ErrorMessage>
                    </FormHelperText>
                    <div className="row">
                      {/* No of nights */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label htmlFor="hotels-night" className="form-label">
                          No. of Night
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="hotels-night"
                          id="hotels-night"
                          min={0}
                          error={errors.hotels}
                          onBlur={handleBlur}
                          value={hotelItem.nights}
                          onChange={(e) =>
                            setHotelItem({
                              ...hotelItem,
                              nights: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="hotels"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* destination */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label
                          htmlFor="hotels-destination"
                          className="form-label"
                        >
                          Destination
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="hotels-destination"
                          id="hotels-destination"
                          error={errors.hotels}
                          onBlur={handleBlur}
                          value={hotelItem.destination}
                          onChange={(e) =>
                            setHotelItem({
                              ...hotelItem,
                              destination: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="hotels"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* Name */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label htmlFor="hotels-name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="hotels-name"
                          id="hotels-name"
                          error={errors.hotels}
                          onBlur={handleBlur}
                          value={hotelItem.name}
                          onChange={(e) =>
                            setHotelItem({
                              ...hotelItem,
                              name: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="hotels"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* roomType */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label htmlFor="hotels-roomType" className="form-label">
                          Room Type
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="hotels-roomType"
                          id="hotels-roomType"
                          error={errors.hotels}
                          onBlur={handleBlur}
                          value={hotelItem.roomType}
                          onChange={(e) =>
                            setHotelItem({
                              ...hotelItem,
                              roomType: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="hotels"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* mealPlan */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label htmlFor="hotels-mealPlan" className="form-label">
                          Meal Plan
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="hotels-mealPlan"
                          id="hotels-mealPlan"
                          error={errors.hotels}
                          onBlur={handleBlur}
                          value={hotelItem.mealPlan}
                          onChange={(e) =>
                            setHotelItem({
                              ...hotelItem,
                              mealPlan: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="hotels"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* similarHotels */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label
                          htmlFor="hotels-similarHotels"
                          className="form-label"
                        >
                          Similar Hotels
                        </label>
                        <div className="d-flex">
                          <input
                            type="text"
                            className="w-60 form-control"
                            name="hotels-similarHotels"
                            id="hotels-similarHotels"
                            error={errors.hotels}
                            onBlur={handleBlur}
                            value={similarHotelsItem}
                            onChange={(e) => {
                              setSimilarHotelsItem(e.target.value);
                              // setHotelItem({
                              //   ...hotelItem,
                              //   similarHotels: e.target.value,
                              // });
                            }}
                          />
                          <div
                            className="w-40 btn add-btn"
                            onClick={() => {
                              // console.log(attractions.length);
                              if (similarHotelsItem.length !== 0) {
                                hotelItem.similarHotels.push(similarHotelsItem);
                                setSimilarHotelsItem('');
                              } else {
                                setFieldError(
                                  'hotels',
                                  'please enter something!'
                                );
                              }
                            }}
                          >
                            Add
                          </div>
                        </div>
                        {/* <FormHelperText error>
                          <ErrorMessage name="hotels"></ErrorMessage>
                        </FormHelperText> */}
                        {hotelItem.similarHotels.map((el, index) => {
                          return (
                            <div key={index}>
                              <p>
                                {el}
                                {''}{' '}
                                <span
                                  className="mx-2"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setSimilarHotelsItem(el);
                                    const newArray =
                                      hotelItem.similarHotels.filter(
                                        (element, i) => i !== index
                                      );
                                    setHotelItem({
                                      ...hotelItem,
                                      similarHotels: newArray,
                                    });
                                  }}
                                >
                                  <PencilSquare />
                                </span>
                                <span
                                  className="mx-2"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    console.log(index);
                                    const newArray =
                                      hotelItem.similarHotels.filter(
                                        (element, i) => i !== index
                                      );
                                    setHotelItem({
                                      ...hotelItem,
                                      similarHotels: newArray,
                                    });
                                  }}
                                >
                                  <X />
                                </span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {values.hotels.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el.name}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                setHotelItem(el);
                                const newArray = values.hotels.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('hotels', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.hotels.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('hotels', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                    <div
                      className="w-40 btn add-btn mb-3"
                      onClick={() => {
                        if (
                          isEqual(hotelItem, {
                            nights: 0,
                            destination: '',
                            name: '',
                            roomType: '',
                            mealPlan: '',
                            similarHotels: [],
                          })
                        ) {
                          setFieldError('hotels', 'please fill above fields');
                        } else {
                          values.hotels.push(hotelItem);
                          console.log(values);
                          setHotelItem({
                            nights: 0,
                            destination: '',
                            name: '',
                            roomType: '',
                            mealPlan: '',
                            similarHotels: [],
                          });
                        }
                      }}
                    >
                      ADD HOTEL
                    </div>
                  </div>
                  {/* Itinerary */}
                  <div className="itinerary-form">
                    <h5>Itinerary</h5>
                    <FormHelperText error>
                      <ErrorMessage name="itinerary"></ErrorMessage>
                    </FormHelperText>
                    <div className="row">
                      {/*Day */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label htmlFor="itinerary-day" className="form-label">
                          Day
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="itinerary-day"
                          id="itinerary-day"
                          min={0}
                          error={errors.itinerary}
                          onBlur={handleBlur}
                          value={itineraryItem.day}
                          onChange={(e) =>
                            setItineraryItem({
                              ...itineraryItem,
                              day: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="itinerary"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* heading */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label
                          htmlFor="itinerary-heading"
                          className="form-label"
                        >
                          Heading
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="itinerary-heading"
                          id="itinerary-heading"
                          error={errors.itinerary}
                          onBlur={handleBlur}
                          value={itineraryItem.heading}
                          onChange={(e) =>
                            setItineraryItem({
                              ...itineraryItem,
                              heading: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="itinerary"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* Description */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label
                          htmlFor="itinerary-description"
                          className="form-label"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="itinerary-description"
                          id="itinerary-description"
                          error={errors.itinerary}
                          onBlur={handleBlur}
                          value={itineraryItem.description}
                          onChange={(e) =>
                            setItineraryItem({
                              ...itineraryItem,
                              description: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="itinerary"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                    </div>
                    {values.itinerary.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el.day}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                setItineraryItem(el);
                                const newArray = values.itinerary.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('itinerary', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.itinerary.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('itinerary', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                    <div
                      className="w-40 btn add-btn mb-3"
                      onClick={() => {
                        console.log(itineraryItem);
                        if (
                          isEqual(itineraryItem, {
                            day: 0,
                            description: '',
                            heading: '',
                          })
                        ) {
                          console.log('object');
                          setFieldError(
                            'itinerary',
                            'please fill above fields..'
                          );
                        } else {
                          values.itinerary.push(itineraryItem);
                          console.log(values);
                          setItineraryItem({
                            day: 0,
                            heading: '',
                            description: '',
                          });
                        }
                      }}
                    >
                      ADD ITINERARY
                    </div>
                  </div>
                  {/* Price */}
                  <div className="itinerary-form">
                    <h5>Price</h5>
                    <FormHelperText error>
                      <ErrorMessage name="price"></ErrorMessage>
                    </FormHelperText>
                    <div className="row">
                      {/*Heading */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label htmlFor="price-heading" className="form-label">
                          Heading
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="price-heading"
                          id="price-heading"
                          error={errors.price}
                          onBlur={handleBlur}
                          value={priceItem.heading}
                          onChange={(e) =>
                            setPriceItem({
                              ...priceItem,
                              heading: e.target.value,
                            })
                          }
                        />
                        {/* <FormHelperText error>
                          <ErrorMessage name="price"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                      {/* value */}
                      <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <label htmlFor="price-value" className="form-label">
                          Value
                        </label>
                        <div className="d-flex">
                          <input
                            className="w-60 form-control"
                            type="text"
                            name="price-value"
                            id="price-value"
                            error={errors.price}
                            onBlur={handleBlur}
                            value={priceValue}
                            onChange={(e) => setPriceValue(e.target.value)}
                          />
                          <div
                            className="w-40 btn add-btn"
                            onClick={() => {
                              // console.log(attractions.length);
                              if (priceValue.length !== 0) {
                                console.log(priceItem.value);
                                console.log(priceValue);
                                priceItem.value.push(priceValue);
                                setPriceValue('');
                              } else {
                                setFieldError(
                                  'price',
                                  'please enter something!'
                                );
                              }
                            }}
                          >
                            Add
                          </div>
                        </div>
                        {priceItem.value.map((el, index) => {
                          return (
                            <div key={index}>
                              <p>
                                {el}
                                {''}{' '}
                                <span
                                  className="mx-2"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setPriceValue(el);
                                    const newArray = priceItem.value.filter(
                                      (element, i) => i !== index
                                    );
                                    setPriceItem({
                                      ...priceItem,
                                      value: newArray,
                                    });
                                  }}
                                >
                                  <PencilSquare />
                                </span>
                                <span
                                  className="mx-2"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    console.log(index);
                                    const newArray = priceItem.value.filter(
                                      (element, i) => i !== index
                                    );
                                    setPriceItem({
                                      ...priceItem,
                                      value: newArray,
                                    });
                                  }}
                                >
                                  <X />
                                </span>
                              </p>
                            </div>
                          );
                        })}
                        {/* <input
                          type="text"
                          className="form-control"
                          name="price-value"
                          id="price-value"
                          error={errors.price}
                          onBlur={handleBlur}
                          value={priceItem.value}
                          onChange={(e) =>
                            setPriceItem({
                              ...priceItem,
                              value: e.target.value,
                            })
                          }
                        /> */}
                        {/* <FormHelperText error>
                          <ErrorMessage name="price"></ErrorMessage>
                        </FormHelperText> */}
                      </div>
                    </div>
                    {values.price.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el.heading} : {el.value}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setPriceItem(el);
                                const newArray = values.price.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('price', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.price.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('price', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                    <div
                      className="w-40 btn add-btn mb-3"
                      onClick={() => {
                        if (
                          isEqual(priceItem, {
                            heading: '',
                            value: [],
                          })
                        ) {
                          setFieldError('price', 'plee fill above fields');
                        } else {
                          values.price.push(priceItem);
                          console.log(values);
                          setPriceItem({
                            heading: '',
                            value: [],
                          });
                        }
                      }}
                    >
                      ADD PRICE
                    </div>
                  </div>
                  {/* Inclusion */}
                  <div className="col-12 mb-3">
                    <label htmlFor="inclusion" className="form-label">
                      Inclusion
                    </label>
                    <div className="d-flex">
                      <input
                        className="w-60 form-control"
                        type="text"
                        name="inclusion"
                        id="inclusion"
                        error={errors.inclusion}
                        onBlur={handleBlur}
                        value={inclusionItem}
                        onChange={(e) => {
                          setInclusionItem(e.target.value);
                        }}
                      />
                      <div
                        className="w-40 btn add-btn"
                        onClick={() => {
                          // console.log(attractions.length);
                          if (inclusionItem.length !== 0) {
                            values.inclusion.push(inclusionItem);
                            setInclusionItem('');
                          } else {
                            setFieldError(
                              'inclusion',
                              'please enter something!'
                            );
                          }
                        }}
                      >
                        Add
                      </div>
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="inclusion"></ErrorMessage>
                    </FormHelperText>

                    {values.inclusion.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setInclusionItem(el);
                                const newArray = values.inclusion.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('inclusion', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.inclusion.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('inclusion', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Exclusion */}
                  <div className="col-12 mb-3">
                    <label htmlFor="exclusion" className="form-label">
                      Exclusion
                    </label>
                    <div className="d-flex">
                      <input
                        className="w-60 form-control"
                        type="text"
                        name="exclusion"
                        id="exclusion"
                        error={errors.exclusion}
                        onBlur={handleBlur}
                        value={exclusionItem}
                        onChange={(e) => {
                          setExclusionItem(e.target.value);
                        }}
                      />
                      <div
                        className="w-40 btn add-btn"
                        onClick={() => {
                          // console.log(attractions.length);
                          if (exclusionItem.length !== 0) {
                            values.exclusion.push(exclusionItem);
                            setExclusionItem('');
                          } else {
                            setFieldError(
                              'exclusion',
                              'please enter something!'
                            );
                          }
                        }}
                      >
                        Add
                      </div>
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="exclusion"></ErrorMessage>
                    </FormHelperText>

                    {values.exclusion.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setExclusionItem(el);
                                const newArray = values.exclusion.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('exclusion', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.exclusion.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('exclusion', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Important Notes */}
                  <div className="col-12 mb-3">
                    <label htmlFor="importantNotes" className="form-label">
                      Important Notes
                    </label>
                    <div className="d-flex">
                      <input
                        className="w-60 form-control"
                        type="text"
                        name="importantNotes"
                        id="importantNotes"
                        error={errors.importantNotes}
                        onBlur={handleBlur}
                        value={importantNotesItem}
                        onChange={(e) => {
                          setImportantNotesItem(e.target.value);
                        }}
                      />
                      <div
                        className="w-40 btn add-btn"
                        onClick={() => {
                          // console.log(attractions.length);
                          if (importantNotesItem.length !== 0) {
                            values.importantNotes.push(importantNotesItem);
                            setImportantNotesItem('');
                          } else {
                            setFieldError(
                              'importantNotes',
                              'please enter something!'
                            );
                          }
                        }}
                      >
                        Add
                      </div>
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="importantNotes"></ErrorMessage>
                    </FormHelperText>

                    {values.importantNotes.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setImportantNotesItem(el);
                                const newArray = values.importantNotes.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('importantNotes', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.importantNotes.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('importantNotes', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Additionals */}
                  <div className="col-12 mb-3">
                    <label htmlFor="additional" className="form-label">
                      Additional
                    </label>
                    <div className="d-flex">
                      <input
                        className="w-60 form-control"
                        type="text"
                        name="additional"
                        id="additional"
                        error={errors.additional}
                        onBlur={handleBlur}
                        value={additionalItem}
                        onChange={(e) => {
                          setAdditionalItem(e.target.value);
                        }}
                      />
                      <div
                        className="w-40 btn add-btn"
                        onClick={() => {
                          // console.log(attractions.length);
                          if (additionalItem.length !== 0) {
                            values.additional.push(additionalItem);
                            setAdditionalItem('');
                          } else {
                            setFieldError(
                              'additional',
                              'please enter something!'
                            );
                          }
                        }}
                      >
                        Add
                      </div>
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="additional"></ErrorMessage>
                    </FormHelperText>

                    {values.additional.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setAdditionalItem(el);
                                const newArray = values.additional.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('additional', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.additional.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('additional', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Payment Terms */}
                  <div className="col-12 mb-3">
                    <label htmlFor="paymentTerm" className="form-label">
                      Payment Term
                    </label>
                    <div className="d-flex">
                      <input
                        className="w-60 form-control"
                        type="text"
                        name="paymentTerm"
                        id="paymentTerm"
                        error={errors.paymentTerm}
                        onBlur={handleBlur}
                        value={paymentTermItem}
                        onChange={(e) => {
                          setPaymentTermItem(e.target.value);
                        }}
                      />
                      <div
                        className="w-40 btn add-btn"
                        onClick={() => {
                          // console.log(attractions.length);
                          if (paymentTermItem.length !== 0) {
                            values.paymentTerm.push(paymentTermItem);
                            setPaymentTermItem('');
                          } else {
                            setFieldError(
                              'paymentTerm',
                              'please enter something!'
                            );
                          }
                        }}
                      >
                        Add
                      </div>
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="paymentTerm"></ErrorMessage>
                    </FormHelperText>

                    {values.paymentTerm.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setPaymentTermItem(el);
                                const newArray = values.paymentTerm.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('paymentTerm', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.paymentTerm.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('paymentTerm', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Cancellation Policy */}
                  <div className="col-12 mb-3">
                    <label htmlFor="cancellationPolicy" className="form-label">
                      Cancellation Policy
                    </label>
                    <div className="d-flex">
                      <input
                        className="w-60 form-control"
                        type="text"
                        name="cancellationPolicy"
                        id="cancellationPolicy"
                        error={errors.cancellationPolicy}
                        onBlur={handleBlur}
                        value={cancellationPolicyItem}
                        onChange={(e) => {
                          setCancellationPolicyItem(e.target.value);
                        }}
                      />
                      <div
                        className="w-40 btn add-btn"
                        onClick={() => {
                          // console.log(attractions.length);
                          if (cancellationPolicyItem.length !== 0) {
                            values.cancellationPolicy.push(
                              cancellationPolicyItem
                            );
                            setCancellationPolicyItem('');
                          } else {
                            setFieldError(
                              'cancellationPolicy',
                              'please enter something!'
                            );
                          }
                        }}
                      >
                        Add
                      </div>
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="cancellationPolicy"></ErrorMessage>
                    </FormHelperText>

                    {values.cancellationPolicy.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el}
                            {''}{' '}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setCancellationPolicyItem(el);
                                const newArray =
                                  values.cancellationPolicy.filter(
                                    (element, i) => i !== index
                                  );
                                setFieldValue('cancellationPolicy ', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray =
                                  values.cancellationPolicy.filter(
                                    (element, i) => i !== index
                                  );
                                setFieldValue('cancellationPolicy ', newArray);
                              }}
                            >
                              <X />
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* SUBMIT */}
                  <div>
                    <button className="btn btn-danger submit-btn" type="submit">
                      SUBMIT
                    </button>
                    <button
                      className="btn btn-danger submit-btn mx-3"
                      onClick={() => navigate('/package-list')}
                    >
                      ALL PACKAGES
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default AddPackage;
