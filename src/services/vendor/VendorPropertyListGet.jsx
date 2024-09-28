import instance from '@/utils/Axios'
import React from 'react'

export default async function VendorPropertyListGet() {
  try {
    const response=await instance.get('/vendor/properties',{
        withCredentials:true
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
