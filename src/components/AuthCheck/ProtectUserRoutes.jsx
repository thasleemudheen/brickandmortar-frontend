import {jwtDecode} from 'jwt-decode'; // Remove destructuring
import instance from '@/utils/Axios'; // Import your axios instance
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // If the token is expired
        if (decoded.exp <= currentTime) {
            console.log('Token expired, attempting to refresh');

            // Attempt to refresh the token using the refresh token
            const refreshResponse = await instance.post('/refresh', {}, { withCredentials: true });
                
            // If successful, update the access token in localStorage
            if (refreshResponse.status === 200) {
                const newAccessToken = refreshResponse.data.accessToken;
                console.log('New access token received in the frontend:', newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);
                instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return true; // Return true after refreshing the token
            } else {
                return false; // Return false if refresh fails
            }
        }

        return true; // Token is valid and not expired
    } catch (error) {
        console.error('Error decoding or refreshing token', error);
        return false;
    }
};

const UserProtectedRoutes = () => {
    const [authenticated, setAuthenticated] = useState(null); // Initial state as null to signify loading

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setAuthenticated(authStatus); // Update authentication status
        };

        checkAuth();
    }, []);

    // Show a loading indicator while checking authentication
    if (authenticated === null) {
        return <div>Loading...</div>; // Replace with a spinner or other loading indicator if needed
    }

    if (!authenticated) {
        return <Navigate to='/login' />;
    }

    return <Outlet />;
};

export default UserProtectedRoutes;
