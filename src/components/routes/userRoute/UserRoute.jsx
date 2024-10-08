import UserProtectedRoutes from '@/components/AuthCheck/ProtectUserRoutes'
import UserHomePage from '@/pages/userPage/UserHomePage'
import UserLoginPage from '@/pages/userPage/UserLoginPage'
import UserSignupPage from '@/pages/userPage/UserSignupPage'
import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
export default function UserRoute() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/signup' element={<UserSignupPage/>}/>
            <Route path='/login' element={<UserLoginPage/>}/>
            <Route element={<UserProtectedRoutes/>}>
            <Route path='/' element={<UserHomePage/>}/>
            </Route>
            
        </Routes>
      </Router>
    </div>
  )
}
