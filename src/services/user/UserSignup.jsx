import instance from '@/utils/Axios'
import React from 'react'

export default async function UserSignup(data) {
   try {
       const response=await instance.post('/signup',data,
        {
            withCredentials:true
        }
       )
       return response
   } catch (error) {
    return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
    console.log(error)
   }
}
