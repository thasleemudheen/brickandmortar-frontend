import React from 'react'
import instance from '../../utils/Axios'

export default async function AdminAddLocation(values) {
 try {
      const response=await instance.post('/admin/addlocation',values,{
        withCredentials:true
      })
      return response
 } catch (error) {
    console.log(error)
    
 }
}