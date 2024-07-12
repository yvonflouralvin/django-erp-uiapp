'use client'
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { Bell, LogOutIcon } from 'lucide-react';
import useAuthentification from '@/lib/middleware/authentification';
import { useRouter } from 'next/navigation';
 
const Header = () => {
     
    const authentification = useAuthentification();
    const router = useRouter();

    return (
        
        <div className='w-full flex items-center gap-[10px]'>
            <div className='flex-1'>

            </div>
            <div>
                <Input type="text" placeholder="Recherche" className='w-[400px]' />
            </div>
            <Bell size={20} className='cursor-pointer' />
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <Avatar className='cursor-pointer w-[40px] h-[40px]'>
                        <AvatarImage src="https://github.com/shadcn.png" className=''/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px] mr-[10px]">
                    <div className='p-[10px] text-[12px]'>
                        <p className='text-sm'>Yvon Flour Alvin</p>
                        <p>me@yvonflour.com</p>
                    </div>
                    <DropdownMenuSeparator />
                    <div className='duration-300 cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)] text-[14px]'>
                        <p>Profil</p>
                    </div>
                    <div onClick={()=> authentification.logout()}  className='duration-300 cursor-pointer p-[10px] hover:bg-[rgba(0,0,0,0.05)] text-[14px] flex items-center gap-[10px]'>
                        <LogOutIcon size={14}/>
                        <p>Déconnexion</p>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default Header;
