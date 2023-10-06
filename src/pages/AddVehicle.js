import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import './../styles/AddPackage.css';
import { ErrorMessage, Form, Formik } from 'formik';
import { FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePackageContext } from '../context/PackageContext';

const AddVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let imageArray = [];
  const context = usePackageContext();
  const { vehicleData, updateVehicleData } = context;
  const [imageItem, setImageItem] = useState([]);
  //   const [hotelsItem, setHotelsItem] = useState({
  //     name: '',
  //     address: '',
  //     image: [],
  //   });
  const initialValues = {
    name: '',
    image: [],
    price: '',
    category: '',
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('vehicle name must required!'),
    image: Yup.array()
      .of(Yup.string().required('Image is required'))
      .min(1)
      .max(5, 'Maximum of 5 images allowed'),
    price: Yup.number()
      .min(0, 'price must be positive')
      .required('price per km required!'),
    category: Yup.string().required('please select one category!!'),
  });

  useEffect(() => {
    if (id) {
      GetVehicleFromId();
    }
  }, [id]);

  const GetVehicleFromId = () => {
    vehicleService.GetVehicle(id).then((res) => {
      const editVehicle = res.data.data;
      setInitialValuesState({
        name: editVehicle.name,
        image: editVehicle.image,
        price: editVehicle.price,
        category: editVehicle.category,
      });
    });
  };

  const handleSave = (values) => {
    console.log(values);
    vehicleService
      .CreateVehicle(values)
      .then((res) => {
        updateVehicleData();
        setInitialValuesState(initialValues);
        toast.success('Vehicle added successfully!', {
          position: 'bottom-right',
        });
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  const handleUpdate = (values) => {
    vehicleService
      .UpdateVehicle(values, id)
      .then((res) => {
        toast.success('Vehicle updated successfully!', {
          position: 'bottom-right',
        });
        navigate('/vehicle-list');
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
      if (files.length > 5) {
        setFieldError('image', 'images must be less than or equal to 5');
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
          <h1 className="text-center">{id ? 'Edit' : 'Add'} Vehicle</h1>
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
                  {/* name */}
                  <div className="col-12 mb-3">
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
                      onChange={(e) => {
                        setFieldValue('name', e.target.value);
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="name"></ErrorMessage>
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
                  {/* Price */}
                  <div className="col-12 mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      id="price"
                      error={errors.price}
                      onBlur={handleBlur}
                      value={values.price}
                      onChange={(e) => {
                        setFieldValue('price', e.target.value);
                      }}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="price"></ErrorMessage>
                    </FormHelperText>
                  </div>
                  {/* Category */}
                  <div className="col-12 mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="category"
                      name="category"
                      value={values.category}
                      error={errors.category}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue('category', e.target.value);
                      }}
                    >
                      <option value="none" hidden>
                        Select Vehicle Category
                      </option>
                      <option value="bus">Bus</option>
                      <option value="traveller">Traveller</option>
                      <option value="cab">Cab</option>
                    </select>
                    <FormHelperText error>
                      <ErrorMessage name="category"></ErrorMessage>
                    </FormHelperText>
                  </div>
                  {/* SUBMIT */}
                  <div>
                    <button className="btn btn-danger submit-btn" type="submit">
                      SUBMIT
                    </button>
                    <button
                      className="btn btn-danger submit-btn mx-3"
                      onClick={() => navigate('/vehicle-list')}
                    >
                      ALL VEHICLES
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

export default AddVehicle;
