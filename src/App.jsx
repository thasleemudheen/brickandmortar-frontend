import React from "react"
import AdminRoute from "./components/routes/adminRoute/AdminRoute"
import VendorRoute from "./components/routes/vendorRoute/VendorRoute"
import UserRoute from "./components/routes/userRoute/UserRoute"


function App() {

  return (
    <>
    <AdminRoute/>
    <VendorRoute/>
    <UserRoute/>
    
    </>
  )
}

export default App