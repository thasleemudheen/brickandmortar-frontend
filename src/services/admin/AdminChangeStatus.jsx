import instance from "@/utils/Axios"

export default async function AdminChangeStatus(id) {
    console.log(`Sending request to change status of vendor with ID: ${id}`);
     try {
         const response=await instance.patch(`/admin/changeStatus/${id}`,{},{
            withCredentials:true
         })
         return response
     } catch (error) {
        console.log(error)
     }
}
