'use client'
import React from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

interface AppMenuProps {
    label: string
    path: string
}
export default function AppMenu(props: AppMenuProps) {
    const pathname = usePathname() 
    const router = useRouter()
    return <p className={`duration-300 cursor-pointer font-regular p-[10px] px-[20px] ${pathname === props.path ? "bg-[rgba(0,0,0,0.03)] border-r-[2px] border-gray-300" : "hover:bg-[rgba(0,0,0,0.03)]"}  `} onClick={() => router.push(props.path)} >{props.label}</p>
}