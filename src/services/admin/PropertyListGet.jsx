import instance from '@/utils/Axios'
import React from 'react'

export default async function PropertyListGet() {
  try {
     const response=await instance.get('/admin/property')
     return response
  } catch (error) {
    console.log(error)
  }
}
