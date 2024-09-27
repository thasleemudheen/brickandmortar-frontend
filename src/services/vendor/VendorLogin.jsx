import instance from '@/utils/Axios'

export default async function VendorLogin(values) {
     try {
        const response=await instance.post('/vendor/login',values,{
            withCredentials:true
        })
        return response
     } catch (error) {
        return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
        // console.log(error)
     }
}
