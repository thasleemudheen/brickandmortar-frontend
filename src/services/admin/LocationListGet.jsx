import instance from '@/utils/Axios'

export default async function LocationListGet() {
   try {
      const response= await instance.get('/admin/location',{
        withCredentials:true
      })
      console.log('response',response)
      return response 
      
   } catch (error) {
     console.log(error)
   }
}
