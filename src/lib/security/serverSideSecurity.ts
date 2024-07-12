import { cookies } from 'next/headers'



const getAccessToken = ()=>{
    const cookie = cookies().get('access_token');
    if(cookie !== undefined) return cookie.value;
    return undefined;
}
 
export default {
    getAccessToken
}