import Cookies from "js-cookie";

export const Authenticated = () => {
    const token = Cookies.get('adminToken');
    console.log('authentication router',token)
    return !!token; 
  };