import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from '@/services/user/UserLogin';
import ShowToast from '@/helpers/ShowToast';
import { ToastContainer } from 'react-toastify';
export default function UserLoginPage() {
  const navigate=useNavigate()
  return (
    <div className="w-full h-screen flex justify-center items-center relative ">
      <img className="  w-5/6 h-5/6" src="src/assets/loginpage.jpg" alt="" />
      <div className="absolute right-56 top-36">
        <h1 className="text-6xl font-extrabold mb-10 ml-14 text-white">Login</h1>
        <h3 className='font-bold text-2xl text-white'>Welcome back</h3>
        <h3 className='text-xl font-medium mb-11 text-white'>Enter your credentials to access your account</h3>
        <div className=''> 
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
                   const response=await UserLogin(values)
                   console.log(response)
                   if(response.status===404){
                    ShowToast('error',response.data.message)
                   }else if(response.status===403){
                    setFieldError('password',response.data.message)
                    ShowToast('error',response.data.message)
                   }else if(response.status===200){
                    navigate('/')
                   }
                   
                } catch (error) {
                  console.log(error)
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
                <ErrorMessage name="password" component="div" className='text-red-500 mt-1' />
              </div>
              <div className='mt-5'>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className='h-12 bg-gray-300  w-36 text-2xl font-bold rounded-xl'
                  
                >
                  Login
                </button>
              </div>
              <h1 className='mt-6 text-white font-semibold text-md'>If you are new in here click <Link className='text-blue-400' to='/signup'>signup</Link> </h1>
            </Form>
          )}
        </Formik>
        <ToastContainer/>
        </div>
      </div>
    </div>
  );
}

