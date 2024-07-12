import GoHomeBtn from "@/components/settings/GoHomeBtn"
import SettingMenuItem from "@/components/settings/SettingMenuItem"
import { Users2Icon } from "lucide-react"

interface LayoutProps {
    children: React.ReactNode
}
export default function Layout(props: LayoutProps) {
    return <div className="p-[20px] h-screen w-screen flex flex-col">
        <div>
            <GoHomeBtn />
            <hr />
        </div>
        <div className="flex flex-1 pt-[10px]">
            <div className="border-r border-inherent w-[200px] h-full">
                <SettingMenuItem label="Rôles & Utilisateurs" icon={<Users2Icon size={14} />} target="roles-users"/>
            </div>
            <div className="flex-1 h-full px-[10px]">
                {props.children}
            </div>
        </div>
    </div>
}