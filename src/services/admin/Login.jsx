import instance from "../../utils/Axios"
const Login = async(values) => {
    try {
        const response = await instance.post('admin/login',values,{
            withCredentials:true
        })
        console.log('the response send',response)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export default Login