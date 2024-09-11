import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminDashboard from '../layout/AdminDashboard'
import { MenuOutlined,CloseOutlined } from '@ant-design/icons'

export default function AdminLayout() {
  const [showMenu,setShowMenu]=useState(false)
  return (
    <div className="flex h-[calc(100vh-2rem)] lg:w-full md:px-10 ">
      <div className={` ${
          showMenu ? ' fixed inset-y-0 left-0 w-64 z-20 translate-x-0' : '-translate-x-full lg:block hidden'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <AdminDashboard/>


      </div>
      <div className="flex h-[calc(100vh-2rem)] ml-0 w-full">
        <div className='lg:hidden '>
          <button className='fixed ml-0 z-30 ' onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <CloseOutlined className='text-2xl ml-3 mt-2' /> : <MenuOutlined className='text-2xl ml-3 mt-2'/>}
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
