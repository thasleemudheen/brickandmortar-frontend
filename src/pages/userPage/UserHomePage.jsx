import instance from '@/utils/Axios'
import React, { useEffect } from 'react'

export default function UserHomePage() {
  useEffect(()=>{
    async function getHome(){
      try {
        const respones=await instance.get('/')
        console.log(respones)
      } catch (error) {
        console.log(error)
      }
    }
    getHome()
  },[])
    
  return (
    <div>
      <h1>this is the home page of the user</h1>
    </div>
  )
}
