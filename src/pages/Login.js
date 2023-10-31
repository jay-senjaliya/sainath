import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormHelperText } from '@mui/material';
import { usePackageContext } from '../context/PackageContext';

const Login = () => {
  const context = usePackageContext();
  const { logged, setLogged } = context;
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: '',
  };
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name must required!'),
    password: Yup.string()
      .required('Password must required!')
      .min(8, 'min 8 character required!'),
  });

  const handleSubmit = (values) => {
    if (values.username !== 'dev_123') {
      toast.error('Invalid Username', { position: 'bottom-right' });
      return;
    }

    if (values.password !== 'Dev@1234') {
      toast.error('Incorrect Password', { position: 'bottom-right' });
      return;
    }

    if (values.username === 'dev_123' && values.password === 'Dev@1234') {
      toast.success('Logged in successfully!', { position: 'bottom-right' });
      setLogged(true);
      navigate('/admin');
    }
  };
  return (
    <>
      <div className="login-page-admin container-xxl">
        <div className="text-center pt-5">
          <SectionTitle
            mainTitle="Admin"
            description="login for accessing admin"
          />
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <img
              className="img-fluid p-5"
              src={require('./../img/sainath-logo-removebg-preview.png')}
            />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div className="p-5 ">
              <Formik
                initialValues={initialValuesState}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={(values) => handleSubmit(values)}
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
                      <div className="row">
                        <div className="col-12 mb-3">
                          <label htmlFor="username" className="form-label">
                            User Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            error={errors.username}
                            onBlur={handleBlur}
                            value={values.username}
                            onChange={(e) => {
                              setFieldValue('username', e.target.value);
                            }}
                          />
                          <FormHelperText error>
                            <ErrorMessage name="username"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="password" className="form-label">
                            Password:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            error={errors.password}
                            onBlur={handleBlur}
                            value={values.password}
                            onChange={(e) => {
                              setFieldValue('password', e.target.value);
                            }}
                          />
                          <FormHelperText error>
                            <ErrorMessage name="password"></ErrorMessage>
                          </FormHelperText>
                        </div>
                        <div>
                          <button
                            className="btn btn-danger submit-btn"
                            type="submit"
                          >
                            SUBMIT
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
    </>
  );
};

export default Login;
