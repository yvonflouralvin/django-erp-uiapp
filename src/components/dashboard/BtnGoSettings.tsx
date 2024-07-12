'use client'
import { Settings2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BtnGoSettings() {
    const router = useRouter()
    return <div className='flex items-center gap-[10px] p-[20px] hover:bg-[rgba(0,0,0,0.03)] duration-300 cursor-pointer' onClick={() => router.push("/dashboard/settings")}>
        <Settings2Icon size={14} />
        <p>Paramettres</p>
    </div>
}