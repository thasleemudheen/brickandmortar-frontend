import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';
import { Authenticated } from './AuthCheck';

 const ProtectedRoutes=()=> {
    if (!Authenticated()) {
        return <Navigate to="/admin/login" replace />;
      }
      
      return <Outlet />;
}
export default ProtectedRoutes