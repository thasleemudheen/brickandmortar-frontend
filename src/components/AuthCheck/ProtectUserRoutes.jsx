import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
    const isAuthenticated = () => {
        const token = localStorage.getItem('accessToken');
        if(!token){
            return false
        }
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    };
    
    // Wrapper to protect multiple routes
    const UserProtectedRoutes = () => {
        if (!isAuthenticated()) {
            return <Navigate to="/login" />;
        }
        
        return <Outlet />;  
    };
export default UserProtectedRoutes
