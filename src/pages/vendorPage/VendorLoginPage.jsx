import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import VendorLogin from '@/services/vendor/VendorLogin';
import ShowToast from '@/helpers/ShowToast';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
export default function VendorLoginPage() {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-screen'>
      <div style={{ borderRadius: '15px' }} className='shadow-2xl md:w-2/3 lg:w-1/3 h-4/6 flex flex-col justify-center items-center'>
        <h3 className='text-2xl text-black font-bold lg:w-4/5 w-full lg:mb-10 lg:ml-16 ml-10 mb-6'>
          If you want to become an authorized seller Login/Signup
        </h3>
        <div className='text-4xl font-extrabold mb-[50px] lg:mb-[60px]'>
          <h1 className='text-orange-400'>LOGIN</h1>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            } else if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
              errors.password = 'Invalid password';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              console.log('request sending ')
              const response = await VendorLogin(values);
              console.log('response from lgoin ',response.data.message)
              if (response.status === 200) {
                navigate('/vendor/dashboard');
                localStorage.setItem('vendorToken',response.data.token)

              } else if(response.status===404) {
                ShowToast('error',response.data.message)
                setFieldError('password',response.data.message);
              }else{
                ShowToast('error','internal server error')
              }
            } catch (error) {
              ShowToast('error','intenal server error')
              setFieldError('email', 'Server error, please try again later');
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='w-full flex flex-col items-center'>
              <div className='w-96'>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className='h-12 lg:w-full w-5/6 lg:ml-0 ml-8 border border-gray-300 rounded-md p-2'
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                />
                <ErrorMessage name="email" component="div" className='text-red-500 mt-1' />
              </div>
              <div className='mt-5 w-96'>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className='h-12 lg:w-full w-5/6 lg:ml-0 ml-8 border border-gray-300 rounded-md p-2'
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                />
                <ErrorMessage name="password" component="div" className='text-red-500 mt-1 text-center' />
              </div>
              <div className='mt-5'>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className='h-12 bg-orange-400 text-white w-36 text-lg font-bold rounded-md'
                  style={{ borderRadius: '8px' }}
                >
                  Login
                </button>
              </div>
              <h1>if you want to signup <Link to='/vendor/signup'>signup</Link></h1>
            </Form>
          )}
        </Formik>
        <ToastContainer/>
      </div>
    </div>
  );
}
