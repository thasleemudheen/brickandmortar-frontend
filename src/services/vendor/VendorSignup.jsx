import instance from '../../utils/Axios'

export default async function VendorSignup(formData) {
  try {
    const response=await instance.post('/vendor/signup',formData,{
      headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials:true
    })
    return response
  } catch (error) {
    return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
  }
}
