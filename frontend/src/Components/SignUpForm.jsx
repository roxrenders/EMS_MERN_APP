
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextApi/AuthContext';

const SignUpForm = () => {
  const navigate =useNavigate()
 
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    location: Yup.string().required('Location is required'),
    jobTitle: Yup.string().required('JobTitle is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    location:'',
    jobTitle:'',
    email: '',
    password: '',
    
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/api/signup', values);
      console.log('SignUp successful:', response.data);
      alert("Kudos You are successfully SignedUp")
      navigate('/')
    
    } catch (error) {
      console.error('SignUp failed:', error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="mx-auto mt-5 p-4 bg-light rounded w-75">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <Field type="text" id="firstName" name="firstName" className="form-control" />
          <ErrorMessage name="firstName" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <Field type="text" id="lastName" name="lastName" className="form-control" />
          <ErrorMessage name="lastName" component="div" className="text-danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location:</label>
          <Field type="location" id="location" name="location" className="form-control" />
          <ErrorMessage name="location" component="div" className="text-danger" />
        </div>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">JobTitle:</label>
          <Field type="jobTitle" id="jobTitle" name="jobTitle" className="form-control" />
          <ErrorMessage name="jobTitle" component="div" className="text-danger" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <Field type="email" id="email" name="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <Field type="password" id="password" name="password" className="form-control" />
          <ErrorMessage name="password" component="div" className="text-danger" />
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
        <div className="mt-3">
        
          <Link to="/">Already have an account? Sign In</Link>
        </div>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
