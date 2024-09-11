import instance from '@/utils/Axios'
import React from 'react'

export default async function AdminAddPropertyType(values) {
   try {
       const response=await instance.post('/admin/addProperty',values,{
        withCredentials:true
       })
       return response
   } catch (error) {
    console.log(error)
   }
}
