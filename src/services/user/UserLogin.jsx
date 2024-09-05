import instance from '@/utils/Axios'

export default async function UserLogin(values) {
     try {
        const response=await instance.post('/login',values,{
            withCredentials:true
        })
        console.log('respones getting from the requested',response)
        const accessToken = response.data.accessToken;
     
        // Store the access token in localStorage
        localStorage.setItem('accessToken', accessToken);
  
        // Set the Authorization header for future requests
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        return response
     } catch (error) {
      console.log(error)
      return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
     }
}
