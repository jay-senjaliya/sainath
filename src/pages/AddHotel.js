import React, { useEffect, useState } from 'react';
import './../styles/AddPackage.css';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { FormHelperText } from '@mui/material';
import { PencilSquare, X } from 'react-bootstrap-icons';
import { isEqual } from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import destinationService from '../services/destinationService';
import packageService from '../services/packageService';
import { usePackageContext } from '../context/PackageContext';
import hotelService from '../services/hotelService';

const AddHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let imageArray = [];
  const context = usePackageContext();
  const { hotelData, updateHotelData } = context;
  const [imageItem, setImageItem] = useState([]);
  const [hotelsItem, setHotelsItem] = useState({
    name: '',
    address: '',
    image: [],
  });
  const initialValues = {
    hotelGroup: '',
    image: [],
    hotels: [],
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    hotelGroup: Yup.string().required('hotelGroup must required!'),
    image: Yup.array()
      .of(Yup.string().required('Image is required'))
      .min(1)
      .max(3, 'Maximum of 3 images allowed'),
    hotels: Yup.array().of(Yup.object()),
  });

  useEffect(() => {
    if (id) {
      GetHotelFromId();
    }
  }, [id]);

  const GetHotelFromId = () => {
    hotelService.GetHotel(id).then((res) => {
      const editHotel = res.data.data;
      setInitialValuesState({
        hotelGroup: editHotel.hotelGroup,
        image: editHotel.image,
        hotels: editHotel.hotels,
      });
    });
  };

  const handleSave = (values) => {
    console.log(values);
    hotelService
      .CreateHotel(values)
      .then((res) => {
        updateHotelData();
        setInitialValuesState(initialValues);
        toast.success('Hotel added successfully!', {
          position: 'bottom-right',
        });
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  const handleUpdate = (values) => {
    hotelService
      .UpdateHotel(values, id)
      .then((res) => {
        toast.success('Hotel updated successfully!', {
          position: 'bottom-right',
        });
        navigate('/hotel-list');
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  const handleUpload = (e, setFieldValue, setFieldError) => {
    imageArray = [];
    const files = e.target.files;
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

  const handleHotelImages = (e, setFieldError) => {
    imageArray = [];
    const files = e.target.files;
    if (files?.length) {
      if (files.length > 3) {
        setFieldError('hotels', 'images must be less than or equal to 3');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const selectedFile = files[i];
        const fileNameArray = selectedFile.name.split('.');
        const extension = fileNameArray.pop();
        if (['png', 'jpg', 'jpeg'].includes(extension?.toLowerCase())) {
          if (selectedFile.size > 1000000) {
            setFieldError('hotels', 'File size must be less than 1MB!!');
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = () => {
            // console.log('reader load');
            imageArray.push(reader.result);
            setHotelsItem({ ...hotelsItem, image: imageArray });
            // setFieldValue('image', imageArray);
          };
          reader.onerror = (err) => {
            throw err;
          };
        } else {
          setFieldError('hotel', 'only jpg, png and jpeg files are allowed!');
          return;
        }
      }
    } else {
      imageArray = [];
      setHotelsItem({ ...hotelsItem, image: imageArray });
      // setFieldError('image', 'select image');
    }
  };

  return (
    <>
      <section>
        <div className="heading pt-3">
          <h1 className="text-center">{id ? 'Edit' : 'Add'} Hotel</h1>
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
                  {/* hotelGroup */}
                  <div className="col-12 mb-3">
                    <label htmlFor="hotelGroup" className="form-label">
                      Hotel Group
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="hotelGroup"
                      id="hotelGroup"
                      error={errors.hotelGroup}
                      onBlur={handleBlur}
                      value={values.hotelGroup}
                      onChange={(e) => {
                        setFieldValue('hotelGroup', e.target.value);
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="hotelGroup"></ErrorMessage>
                    </FormHelperText>
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
                  {/* Hotels */}
                  <div className="hotels-form">
                    <h5>Hotels</h5>
                    <FormHelperText error>
                      <ErrorMessage name="hotels"></ErrorMessage>
                    </FormHelperText>
                    <div className="row">
                      {/* name */}
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                        <label htmlFor="hotels-name" className="form-label">
                          Name
                        </label>
                        <input
                          type="string"
                          className=" form-control"
                          name="hotels-name"
                          id="hotels-name"
                          error={errors.hotels}
                          onBlur={handleBlur}
                          value={hotelsItem.name}
                          onChange={(e) => {
                            setHotelsItem({
                              ...hotelsItem,
                              name: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* Night */}
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                        <label htmlFor="hotels-address" className="form-label">
                          Address
                        </label>
                        <input
                          type="string"
                          className="form-control"
                          name="hotels-address"
                          id="hotels-address"
                          error={errors.hotels}
                          onBlur={handleBlur}
                          value={hotelsItem.address}
                          onChange={(e) => {
                            setHotelsItem({
                              ...hotelsItem,
                              address: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* Images */}
                      <div className="col-12 mb-3">
                        <label htmlFor="hotel-image" className="form-label">
                          Select Images
                        </label>
                        <div className="input-group">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="form-control"
                            id="hotel-image"
                            name="hotel-image"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            // error={errors.base64image}
                            onBlur={handleBlur}
                            // value={imageArray}
                            onChange={(e) =>
                              handleHotelImages(e, setFieldError)
                            }
                          />
                        </div>
                      </div>
                      {hotelsItem.image.map((img, index) => {
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
                                  const newArray = hotelsItem.image.filter(
                                    (element, i) => i !== index
                                  );
                                  setHotelsItem({
                                    ...hotelsItem,
                                    image: newArray,
                                  });
                                }}
                              >
                                X
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    {values.hotels.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el.name}
                            {''} {el.address.slice(0, 40)}...
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                setHotelsItem(el);
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
                          isEqual(hotelsItem, {
                            name: '',
                            address: '',
                            image: [],
                          })
                        ) {
                          setFieldError('hotels', 'please fill above fields');
                        } else {
                          values.hotels.push(hotelsItem);
                          // console.log(values);
                          setHotelsItem({
                            name: '',
                            address: '',
                            image: [],
                          });
                        }
                      }}
                    >
                      ADD Hotel
                    </div>
                  </div>
                  {/* SUBMIT */}
                  <div>
                    <button className="btn btn-danger submit-btn" type="submit">
                      SUBMIT
                    </button>
                    <button
                      className="btn btn-danger submit-btn mx-3"
                      onClick={() => navigate('/hotel-list')}
                    >
                      ALL HOTEL
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

export default AddHotel;
