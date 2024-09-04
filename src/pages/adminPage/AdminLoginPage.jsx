import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Login from '../../services/admin/Login';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const AdminLoginPage = () => {
  const navigate=useNavigate()
       return(
  
  <div className='flex justify-center items-center h-screen'>
    <div style={{ borderRadius: '15px' }} className='shadow-2xl md:w-2/3 lg:w-1/3 h-4/6 flex flex-col justify-center items-center'>
      <div className='text-4xl font-extrabold mb-[50px] lg:mb-[90px]'>
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
        onSubmit={ async(values, { setSubmitting }) => {
          try {
            const response=await Login(values)
            if(response && response.token){
              Cookies.set('adminToken', response.token);
              navigate('/admin/dashboard')
            }
            console.log(response)
          } catch (error) {
            console.log(error)
          }
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className='w-full flex flex-col items-center'>
            <div className='w-96'>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className='h-12 w-full border border-gray-300 rounded-md p-2'
                style={{ border: 'solid 1px grey', borderRadius: '5px' }}
              />
              <ErrorMessage name="email" component="div" className='text-red-500 mt-1' />
            </div>
            <div className='mt-5 w-96'>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className='h-12 w-full border border-gray-300 rounded-md p-2'
                style={{ border: 'solid 1px grey', borderRadius: '5px' }}
              />
              <ErrorMessage name="password" component="div" className='text-red-500 mt-1' />
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
          </Form>
        )}
      </Formik>
    </div>
  </div>
);
}
export default AdminLoginPage;


