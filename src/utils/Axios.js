import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL  
console.log('baser url',BASE_URL);


const instance = axios.create({
   baseURL:BASE_URL ,

});

export default instance;
