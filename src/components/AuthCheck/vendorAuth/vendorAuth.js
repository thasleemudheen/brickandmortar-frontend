export const isAuthenticated = () => {
  const token = localStorage.getItem('vendorToken')
  
    if(!token){
        return false
    }
    return true
};
