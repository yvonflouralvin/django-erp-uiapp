'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
interface SettingMenuItemProps {
    label: string
    icon: React.ReactNode,
    target?: string
}
export default function SettingMenuItem(props: SettingMenuItemProps) {
    const router = useRouter();
    const handleClick = () => {
        if (props.target !== undefined) router.push(`/dashboard/settings/${props.target}`);
    }
    return <div className="duration-300 hover:bg-[rgba(0,0,0,0.05)] flex items-center gap-[10px] py-[5px] cursor-pointer" onClick={handleClick}>
        {props.icon}
        <p className="text-[13px]">{props.label}</p>
    </div>
}