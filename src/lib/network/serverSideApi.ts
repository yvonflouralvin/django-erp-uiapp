import axios from "axios";


const serverSideapi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL
})



export default serverSideapi;