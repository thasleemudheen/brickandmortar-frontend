import instance from '@/utils/Axios'
import React from 'react'

export default async function AdminBlockUser(id) {
    try {
        const response=await instance.patch(`/admin/blockUser/${id}`,{},{
            withCredentials:true
        })
        return response
    } catch (error) {
        console.log(error)
    }
   
}
