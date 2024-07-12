'use client'
import { HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
export default function GoHomeBtn() {
    const router = useRouter()
    return < div className="flex items-center gap-[20px]" >
        <HomeIcon size={15} onClick={() => router.push("/dashboard")} className="cursor-pointer" />
        <p className="text-[20px] font-semibold">Paramettres</p>
    </div>
}