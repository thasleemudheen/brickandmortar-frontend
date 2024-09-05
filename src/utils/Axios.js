import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL  
console.log('baser url',BASE_URL);


const instance = axios.create({
   baseURL:BASE_URL ,

});

instance.interceptors.response.use(
   (response) => {
       return response; // If response is successful, just return the response
   },
   async (error) => {
       const originalRequest = error.config;

       // Check if the error is due to an expired access token
       if (error.response && error.response.status === 401 && !originalRequest._retry) {
           originalRequest._retry = true;

           try {
            console.log('its comes to the try');
            
               // Try refreshing the access token
               const refreshTokenResponse = await instance.post('/refresh',{},{
                  withCredentials:true
               });
               console.log('the refresh token is not get from the respons',refreshTokenResponse)
               if (refreshTokenResponse.status === 200) {
                  const newAccessToken = refreshTokenResponse.data.accessToken;
                  localStorage.setItem('accessToken', newAccessToken); // Store only the access token

                  instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                  // Retry the original request with the new access token
                  return instance(originalRequest);
              }
           } catch (refreshError) {
            console.error('Unable to refresh token:', refreshError);
            alert('unable to refresh tokens')
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
           }
       }

       return Promise.reject(error);
   }
);

export default instance;
