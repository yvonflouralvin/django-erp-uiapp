import api from "../../network/api"
import { AuthentificationTokens, LoginForm } from "../../shared/types";


async function login(arg: LoginForm): Promise<AuthentificationTokens> {
   
    try {
        const result: AuthentificationTokens = (await api.post(`/auth/login/`, arg)).data;
        
        return Promise.resolve(result)
    } catch (e) {
        return Promise.reject(e)
    }
}


export default {
    login
}