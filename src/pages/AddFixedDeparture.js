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
import fixedDepartureService from '../services/fixedDepartureService';

const AddFixedDeparture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = usePackageContext();
  const { packageData, fixedDepartureData, updateFixedDepartureData } = context;
  const initialValues = {
    package: '',
    price: '',
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    package: Yup.string(),
    price: Yup.number()
      .min(0, 'price must be positive')
      .required('price required!'),
  });

  useEffect(() => {
    if (id) {
      getFixedDeparture(id);
    }
  }, [id]);

  const getFixedDeparture = (id) => {
    fixedDepartureService.GetFixedDeparture(id).then((res) => {
      const edit = res.data.data;
      setInitialValuesState({
        package: edit.package._id,
        price: edit.price,
      });
    });
  };

  const handleSave = (values) => {
    console.log(values);
    fixedDepartureService
      .CreateFixedDeparture(values)
      .then((res) => {
        updateFixedDepartureData();
        setInitialValuesState(initialValues);
        toast.success('Package successfully added Fixed Departure!', {
          position: 'bottom-right',
        });
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  const handleUpdate = (values) => {
    fixedDepartureService
      .UpdateFixedDeparture(values, id)
      .then((res) => {
        toast.success('fixed departure updated successfully!', {
          position: 'bottom-right',
        });
        navigate('/fixed-departure-list');
      })
      .catch((err) => {
        toast.error(err.message, { position: 'bottom-right' });
        console.log(err);
      });
  };

  return (
    <>
      <section>
        <div className="heading pt-3">
          <h1 className="text-center">{id ? 'Edit' : 'Add'} Fixed Departure</h1>
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
                  {/* Package */}
                  <div className="col-12 mb-3">
                    <label htmlFor="packageType" className="form-label">
                      Select Package
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="packageType"
                      name="packageType"
                      value={values.package}
                      error={errors.package}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue('package', e.target.value);
                      }}
                    >
                      <option value="none" hidden>
                        {`Select Package`}
                      </option>
                      {/* {} */}
                      {packageData?.map((el, index) => {
                        return (
                          <option key={index} value={el._id}>
                            {`${el.name} - ${el.packageType} - ${el.code}`}
                          </option>
                        );
                      })}
                    </select>
                    <FormHelperText error>
                      <ErrorMessage name="package"></ErrorMessage>
                    </FormHelperText>
                  </div>
                  {/* Price */}
                  <div className="col-12 mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
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
                  {/* SUBMIT */}
                  <div>
                    <button className="btn btn-danger submit-btn" type="submit">
                      SUBMIT
                    </button>
                    <button
                      className="btn btn-danger submit-btn mx-3"
                      onClick={() => navigate('/fixed-departure-list')}
                    >
                      ALL FIXED DEPARTURE
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

export default AddFixedDeparture;
