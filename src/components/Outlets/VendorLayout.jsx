import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import VendorDashBoard from '../layout/VendorDashBoard'

export default function VendorLayout() {
 
  return (
    <div className="flex h-[calc(100vh-2rem)]">
        <VendorDashBoard/>
       
      <div className="flex h-[calc(100vh-2rem)]">
        <Outlet/>
      </div>
    </div>
  )
  
}
