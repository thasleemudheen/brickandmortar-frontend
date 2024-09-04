import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import VendorSignup from '../../services/vendor/VendorSignup';

import { OtpWriter } from '@/components/common/OtpWriter';
import ShowToast from '@/helpers/ShowToast';
import { ToastContainer } from 'react-toastify';
const VendorSignUpPage = () => {
  const [showModal,setShowModal]=useState(false)
  const [data,setData]=useState(null)
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className='w-full lg:w-1/3 md:w-3/4 shadow-2xl '>
        <h1 className='w-full text-center font-extrabold h-12 mt-12 text-orange-400 text-3xl mb-8 '>SIGNUP AS SELLER</h1>
        <Formik
          initialValues={{ vendorName: '', vendorEmail: '', password: '', confirmPassword: '', vendorPhone: '', file: null }}
          validate={values => {
            const errors = {};
            if (!values.vendorEmail) {
              errors.vendorEmail = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.vendorEmail)) {
              errors.vendorEmail = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            } else if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
              errors.password = 'Invalid password';
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = 'Confirm password is required';
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = 'Password does not match';
            }
            if (!values.vendorName) {
              errors.vendorName = 'Name is required';
            } else if (!/^[a-zA-Z\s]{2,50}$/.test(values.vendorName)) {
              errors.vendorName = 'Name is not valid';
            }
            if (!values.vendorPhone) {
              errors.vendorPhone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(values.vendorPhone)) {
              errors.vendorPhone = 'Phone number is not valid';
            }
            if (!values.file) {
              errors.file = 'Document is required';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setData(values)
            
            const formData = new FormData();
            formData.append('vendorName', values.vendorName);
            formData.append('vendorEmail', values.vendorEmail);
            formData.append('password', values.password);
            formData.append('confirmPassword', values.confirmPassword);
            formData.append('vendorPhone', values.vendorPhone);
            formData.append('file', values.file);
            try {
              const response = await VendorSignup(formData);
              if(response.status==200){
                setShowModal(true)
                
              }else if(response.status==409){
                ShowToast('error',response.data.message)
              }
              console.log('this is the response',response)
            } catch (error) {
              console.log(error);
              ShowToast('error', 'An unexpected error occurred.');
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="w-full flex flex-col items-center">
              <div className="w-96">
                <Field
                  type="text"
                  name="vendorName"
                  placeholder="Enter your name"
                  className="h-12 w-full border border-gray-300 rounded-md p-2"
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                />
                <ErrorMessage name="vendorName" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mt-5 w-96">
                <Field
                  type="email"
                  name="vendorEmail"
                  placeholder="Enter your email"
                  className="h-12 w-full border border-gray-300 rounded-md p-2"
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                />
                <ErrorMessage name="vendorEmail" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mt-5 w-96">
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="h-12 w-full border border-gray-300 rounded-md p-2"
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mt-5 w-96">
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="h-12 w-full border border-gray-300 rounded-md p-2"
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mt-5 w-96">
                <Field
                  type="number"
                  name="vendorPhone"
                  placeholder="Enter your phone number"
                  className="h-12 w-full border border-gray-300 rounded-md p-2"
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                />
                <ErrorMessage name="vendorPhone" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mt-5 w-96">
                <input
                  type="file"
                  name="file"
                  className="h-12 w-full border border-gray-300 rounded-md p-2"
                  style={{ border: 'solid 1px grey', borderRadius: '5px' }}
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="file" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mt-5">
              <ToastContainer />
                <button
                // onClick={handleOtpModal}
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 bg-orange-400 text-white w-36 text-lg font-bold rounded-md mb-14"
                  style={{ borderRadius: '8px' }}
                >
                  Signup
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {showModal&&<OtpWriter data={data} />}
       
      </div>
    </div>
  );
};

export default VendorSignUpPage;
