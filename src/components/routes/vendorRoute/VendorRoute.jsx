import React from 'react'
import VendorLoginPage from '../../../pages/vendorPage/VendorLoginPage'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import VendorSignUpPage from '../../../pages/vendorPage/VendorSignUpPage'
import VendorLayout from '@/components/Outlets/VendorLayout'
import VendorDashBoard from '@/pages/vendorPage/VendorDashBoard'
export default function VendorRoute() {
  return (
        <Router>
            <Routes>
              
                <Route path='/vendor/login' element={<VendorLoginPage/>}/>
                <Route path='/vendor/signup' element={<VendorSignUpPage/>}/>
                <Route element={<VendorLayout/>}>
                <Route path='/vendor/dashboard' element={<VendorDashBoard/>}/>

              </Route>
            </Routes>
        </Router>
  )
}
