import Navbar from '@/components/layout/Navbar'
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
    <div className="h-screen"> 
      <Navbar />
      <section className="h-full"> 
        <div className="w-full flex justify-center h-5/6 relative"> 
          <img
            style={{ borderRadius: '20px' }}
            className="w-11/12 h-full object-cover" 
            src="src/assets/home icon.png"
            alt=""
          />
        </div>
        <div className='absolute inset-0 flex justify-center items-center  '>
        <h1 className="text-white text-6xl font-bold">Find a home that suits your lifestyle.</h1>
        </div>
      </section>
    </div>
  )
}
