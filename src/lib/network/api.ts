import axios from "axios";
import cookies from "../shared/cookies";

const refreshAccess = async () => {
    
    try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/apps/auth/token/refresh/`, {
            refresh: cookies.get("Refresh")
        });
        cookies.set("Authorization", result.data.access);
        return Promise.resolve(result.data.access);
    } catch (e: any) {
        if (e?.response?.status === 401) {  
            location.href = "/logout"
            
        }
        return Promise.reject(e);
    }
}

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/apps`
})

api.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${cookies.get("Authorization")}`
    return config
}, error => {

})


api.interceptors.response.use(config => {
    return config;
}, async error => {
    if (error.response.status === 401) {
        console.log(error.config.headers)
        const access = await refreshAccess();
        const config = error.config;
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${access}`
        }
        const result =  await axios.request(config);
        return Promise.resolve(result);
    }
    return error;
})



export default api;