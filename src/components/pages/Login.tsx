'use client'

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useAuthentification from '@/lib/middleware/authentification';
import { useRouter } from 'next/navigation'; 

const Login = () => {

    const { login } = useAuthentification();
    const router = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const handleLogin = () => {
        setIsLogin(true)
        if (username === "") return;
        if (password === "") return;

        login({ username, password })
            .then(result => {
                window.location.href = "/dashboard";
            })
        .catch(reason => {

        })
    }


    return <div className='h-screen w-screen flex'>
        <div className='md:w-[50%] w-[300px] hidden sm:flex bg-black'></div>
        <div className='md:w-[50%] w-full bg-white flex flex-col justify-center items-center'>
            <div className='w-full md:w-[350px] px-[10%] md:px-[0px]'>
                <div className='mb-[10px]'>
                    <p className='font-bold text-2xl'>Se connecter</p>
                </div>
                <div className='flex flex-col gap-[10px]'>
                    <Input placeholder='yatingzang0213@mail.com' onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder='*****' type='password' onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleLogin}>{isLogin  ? "Connexion en cours..." : "Connexion"}</Button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;
