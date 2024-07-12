'use client'
import { LayoutDashboard } from 'lucide-react';
import React from 'react'
import { useRouter } from 'next/navigation';


const DashboardHome = () => {
    const router = useRouter()
    return <div onClick={() => router.replace("/dashboard")} className='cursor-pointer flex items-center p-[20px] gap-[20px]'>
        <LayoutDashboard />
        <p className='font-bold'>Dashboard</p>
    </div>
}

export default DashboardHome;
