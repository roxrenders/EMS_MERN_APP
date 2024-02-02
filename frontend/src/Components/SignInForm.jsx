 import React from 'react';
  import { Formik, Form, Field, ErrorMessage } from 'formik';
  import * as Yup from 'yup';
  import axios from '../axios';
  import { Link, useNavigate } from 'react-router-dom';
  import { useAuth } from '../ContextApi/AuthContext';

  const SignInForm = () => {
    const { setToken, setUser,fetchUserData } = useAuth(); 

      const navigate = useNavigate();
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    });

    const initialValues = {
      email: '',
      password: '',
    };

    const onSubmit = async (values, { setSubmitting }) => {
      try {
          const response = await axios.post('/api/signin', values);
          console.log('SignIn successful:', response.data);
        
          setToken(response.data.token);
          setUser(response.data.user)
          
        localStorage.setItem('token', response.data.token);
          navigate('/home');
      } catch (error) {
        console.error('SignIn failed:', error.response.data.error);
      } finally {
        setSubmitting(false);
      }
    };

    return (
    <>
    
      <div className='text-center text-primary mt-5'><h1>Welcome To EMS</h1>
      <h6>Employee Management System</h6></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="mx-auto w-50 mt-4"> 
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

          <button type="submit" className="btn btn-primary">Sign In</button>
          <div className="mt-3">
        
            <Link to="/signup">Donnot have an account? SignUp Here</Link>
          </div>
        </Form>
      </Formik>
      
      </>
    );
  };

  export default SignInForm;
