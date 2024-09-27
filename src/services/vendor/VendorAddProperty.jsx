import instance from '@/utils/Axios'

export default async function VendorAddProperty(formdata) {
    
  try {
     const response=await instance.post('/vendor/addProperty',formdata,{
        withCredentials:true,
        headers: {
            'Content-Type': 'multipart/form-data',
          },
     })
     console.log('response from the instance',response)
     return response
  } catch (error) {
    console.log(error)
    return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
  }
}
