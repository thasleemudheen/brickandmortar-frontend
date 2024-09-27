import React from 'react'
import { Navigate ,Outlet } from 'react-router-dom';
import { isAuthenticated } from './vendorAuth';
export default function VendorRouteProtected() {
    if (!isAuthenticated()) {
        return <Navigate to="/admin/login" replace />;
      }
      
      return <Outlet />;
}
