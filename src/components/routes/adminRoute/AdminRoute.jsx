import React from 'react'
import AdminLoginPage from '../../../pages/adminPage/AdminLoginPage'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import ProtectedRoutes from '../../AuthCheck/ProtectedRoutes'
import AdminLayout from '../../Outlets/AdminLayout'
import DashboardPage from '../../../pages/adminPage/DashboardPage'
import LocationListPage from '../../../pages/adminPage/LocationListPage'
import VendorsListPage from '@/pages/adminPage/VendorsListPage'
import UsersListPage from '@/pages/adminPage/UsersListPage'
export default function AdminRoute() {
  return (
    <div>
      <Router>
        <Routes>
         <Route path='/admin/login' element={<AdminLoginPage/>}/>

         <Route element={<ProtectedRoutes />}>
         <Route element ={<AdminLayout/>}>
         <Route path="/admin/dashboard" element={<DashboardPage/>} />
         <Route path="/admin/location" element={<LocationListPage/>}/> 
         <Route path='/admin/vendors' element={<VendorsListPage/>}/> 
         <Route path='/admin/users' element={<UsersListPage/>}/>    
         </Route>
        </Route>

        </Routes>
      </Router>
    </div>
  )
}
