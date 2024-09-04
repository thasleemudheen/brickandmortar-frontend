import UserSignupPage from '@/pages/userPage/UserSignupPage'
import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
export default function UserRoute() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/login' element={<UserSignupPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}
