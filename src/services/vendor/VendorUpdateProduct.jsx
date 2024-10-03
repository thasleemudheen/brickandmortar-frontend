import instance from '@/utils/Axios'

export default async function VendorUpdateProduct(updatedData) {
    try {
        const response=await instance.patch('/vendor/editProuduct',updatedData,{
            withCredentials:true,
            headers: {
                'Content-Type': 'multipart/form-data',
              },
         })
         return response
    } catch (error) {
        console.log(error)
        return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
    }

}
