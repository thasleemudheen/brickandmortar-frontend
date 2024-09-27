import React from 'react'
import VendorLoginPage from '../../../pages/vendorPage/VendorLoginPage'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import VendorSignUpPage from '../../../pages/vendorPage/VendorSignUpPage'
import VendorLayout from '@/components/Outlets/VendorLayout'
import VendorDashBoard from '@/pages/vendorPage/VendorDashBoard'
import VendorPropertyPage from '@/pages/vendorPage/VendorPropertyListPage'
import VendorRouteProtected from '@/components/AuthCheck/vendorAuth/VendorRouteProtected'
export default function VendorRoute() {
  return (
        <Router>
            <Routes>
              
                <Route path='/vendor/login' element={<VendorLoginPage/>}/>
                <Route path='/vendor/signup' element={<VendorSignUpPage/>}/>

                <Route element ={<VendorRouteProtected/>}>
                <Route element={<VendorLayout/>}>
                <Route path='/vendor/dashboard' element={<VendorDashBoard/>}/>
                <Route path='/vendor/property' element={<VendorPropertyPage/>}/>
              </Route>
                </Route>  

                </Routes>
        </Router>
  )
}
