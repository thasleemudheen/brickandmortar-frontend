import instance from '@/utils/Axios'
import React from 'react'

export default async function UserVerifyOtpForSignup({otp,data}) {
  try {
      const response=await instance.post('/verifyOtp' ,{otp,data},{
        withCredentials:true
      })
      const accessToken = response.data.accessToken;
     
      // Store the access token in localStorage
      localStorage.setItem('accessToken', accessToken);

      // Set the Authorization header for future requests
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
      return response
  } catch (error) {
    return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
  }
}
