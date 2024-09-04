import instance from '@/utils/Axios'

export default async function VendorVerifyOtpSignup({otp,data}) {
  try {
    const response=await instance.post('/vendor/verifyOtp',{otp,data},{
      withCredentials:true
    })
    return response
  } catch (error) {
    return error.response ? error.response : { status: 500, data: { message: 'An unexpected error occurred' } };
  }
}
