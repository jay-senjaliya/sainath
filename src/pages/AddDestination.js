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

const AddDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let imageArray = [];
  const context = usePackageContext();
  const { destinationData, updateDestinationData, packageData, setLoading } =
    context;
  const [packageItem, setPackageItem] = useState('');
  const [packagesItem, setPackagesItem] = useState({
    day: 0,
    night: 0,
    package: [],
  });
  const [packagelist, setPackagelist] = useState([]);
  const initialValues = {
    name: '',
    description: '',
    image: [],
    category: '',
    packages: [],
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name must required!'),
    description: Yup.string().max(5000),
    image: Yup.array()
      .of(Yup.string().required('Image is required'))
      .min(1)
      .max(3, 'Maximum of 3 images allowed'),
    category: Yup.string().required('category required'),
    packages: Yup.array().of(Yup.object()),
  });

  useEffect(() => {
    if (id) {
      GetDestinationFromId();
    }
  }, [id]);

  const GetDestinationFromId = () => {
    destinationService.GetDestination(id).then((res) => {
      const editDestination = res.data.data;
      setInitialValuesState({
        name: editDestination.name,
        description: editDestination.description,
        category: editDestination.category,
        image: editDestination.image,
        packages: editDestination.packages,
      });
    });
  };

  const handleSave = (values) => {
    setLoading(true);
    console.log(values);
    destinationService
      .CreateDestination(values)
      .then((res) => {
        setLoading(false);
        updateDestinationData();
        setInitialValuesState(initialValues);
        console.log(initialValuesState);
        toast.success('Destination added successfully!', {
          position: 'bottom-right',
        });
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  const handleUpdate = (values) => {
    setLoading(true);
    destinationService
      .UpdateDestination(values, id)
      .then((res) => {
        setLoading(false);
        toast.success('Destination updated successfully!', {
          position: 'bottom-right',
        });
        navigate('/destination-list');
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

  return (
    <>
      <section>
        <div className="heading pt-3">
          <h1 className="text-center">{id ? 'Edit' : 'Add'} Destination</h1>
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
                  {/* Name */}
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
                  {/* Description */}
                  <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      id="description"
                      error={errors.description}
                      onBlur={handleBlur}
                      value={values.description}
                      onChange={(e) =>
                        setFieldValue('description', e.target.value)
                      }
                    />
                    <FormHelperText error>
                      <ErrorMessage name="description"></ErrorMessage>
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
                        Select Destination Category
                      </option>
                      <option value="domestic">Domestic</option>
                      <option value="international">International</option>
                    </select>
                    <FormHelperText error>
                      <ErrorMessage name="category"></ErrorMessage>
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
                  {/* Packages */}
                  <div className="packages-form">
                    <h5>Packages</h5>
                    <FormHelperText error>
                      <ErrorMessage name="packages"></ErrorMessage>
                    </FormHelperText>
                    <div className="row">
                      {/* Day */}
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                        <label htmlFor="packages-day" className="form-label">
                          Day
                        </label>
                        <input
                          type="number"
                          className=" form-control"
                          name="packages-day"
                          id="packages-day"
                          error={errors.packages}
                          onBlur={handleBlur}
                          value={packagesItem.day}
                          onChange={(e) => {
                            setPackagesItem({
                              ...packagesItem,
                              day: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* Night */}
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                        <label htmlFor="packages-night" className="form-label">
                          Night
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="packages-night"
                          id="packages-night"
                          error={errors.packages}
                          onBlur={handleBlur}
                          value={packagesItem.night}
                          onChange={(e) => {
                            setPackagesItem({
                              ...packagesItem,
                              night: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {/* Package */}
                      <div className="col-12 mb-3">
                        <label htmlFor="packageType" className="form-label">
                          Select Packages
                        </label>
                        <div className="d-flex">
                          <select
                            className="w-60 form-select"
                            aria-label="Default select example"
                            id="packageType"
                            name="packageType"
                            value={packageItem}
                            error={errors.packages}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setPackageItem(e.target.value);
                            }}
                          >
                            <option value="none" hidden>
                              {`Select Packages of ${values.name}`}
                            </option>
                            {/* {} */}
                            {packageData.map((el, index) => {
                              return (
                                <option key={index} value={el._id}>
                                  {`${el.name} - ${el.packageType} - ${el.code}`}
                                </option>
                              );
                            })}
                          </select>
                          <div
                            className="w-40 btn add-btn"
                            onClick={() => {
                              console.log(packageItem.length);
                              if (packageItem.length !== 0) {
                                packagesItem.package.push(packageItem);
                                setPackageItem('');
                              } else {
                                setFieldError(
                                  'packages',
                                  'please select something!'
                                );
                              }
                            }}
                          >
                            Add
                          </div>
                        </div>
                      </div>
                      {packagesItem.package.map((el, index) => {
                        return (
                          <>
                            <div key={index}>
                              <p>
                                {
                                  packageData.filter((el1) => el1._id === el)[0]
                                    ?.code
                                }
                                {''}{' '}
                                <span
                                  className="mx-2"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    setPackageItem(el);
                                    const newArray =
                                      packagesItem.package.filter(
                                        (element, i) => i !== index
                                      );
                                    setPackagesItem({
                                      ...packagesItem,
                                      package: newArray,
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
                                      packagesItem.package.filter(
                                        (element, i) => i !== index
                                      );
                                    setPackagesItem({
                                      ...packagesItem,
                                      package: newArray,
                                    });
                                  }}
                                >
                                  <X />
                                </span>
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    {values.packages.map((el, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {el.day}
                            {''} {el.night}
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                setPackagesItem(el);
                                const newArray = values.packages.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('packages', newArray);
                              }}
                            >
                              <PencilSquare />
                            </span>
                            <span
                              className="mx-2"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                console.log(index);
                                const newArray = values.packages.filter(
                                  (element, i) => i !== index
                                );
                                setFieldValue('packages', newArray);
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
                          isEqual(packagesItem, {
                            day: 0,
                            night: 0,
                            package: [],
                          })
                        ) {
                          setFieldError('packages', 'please fill above fields');
                        } else {
                          values.packages.push(packagesItem);
                          console.log(values);
                          setPackagesItem({
                            day: 0,
                            night: 0,
                            package: [],
                          });
                        }
                      }}
                    >
                      ADD Packages
                    </div>
                  </div>
                  {/* SUBMIT */}
                  <div>
                    <button className="btn btn-danger submit-btn" type="submit">
                      SUBMIT
                    </button>
                    <button
                      className="btn btn-danger submit-btn mx-3"
                      onClick={() => navigate('/destination-list')}
                    >
                      ALL DESTINATION
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

export default AddDestination;
