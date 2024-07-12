'use client';
import { AuthentificationTokens, LoginForm } from "@/lib/shared/types";
// import { useCookies } from "next-client-cookies";
import functions from "./functions";
import { useAppSelector } from "@/lib/store"; 
import cookies from "@/lib/shared/cookies";



const useAuthentification = ()=>{

    // const cookies = useCookies();

    const login = async (arg: LoginForm): Promise<AuthentificationTokens>=>{
        try{
            const result = await functions.login(arg);
            cookies.set("Authorization", result.access);
            cookies.set("Refresh", result.refresh);
            return Promise.resolve(result);
        }catch(e){
            return Promise.reject(e);
        }
    }

    const logout = async (callback?: ()=> any)=>{
        try{
            location.href = "/logout"
            if(callback !== undefined)callback()
            return Promise.resolve(true);
        }catch(e){
            return Promise.reject(e);
        }
    }

    return {
        login,
        logout
    }
}

export default useAuthentification;


