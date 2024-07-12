import { AppConfig, AppManifest } from '@/lib/shared/types/config';
import React from 'react';
import AppMenu from './AppMenu';
import Header from './Header';
import { LayoutDashboard, Settings2Icon } from 'lucide-react';
import DashboardHome from './DashboardHome';
import BtnGoSettings from './BtnGoSettings';
const manifest: AppManifest = require('/configs/manifest.json');

interface DashboardProps {
    children: React.ReactNode
}
const Dashboard = (
    props: DashboardProps,
) => {

    return (
        <div className='flex h-screen w-screen p-[10px] bg-[rgba(0,0,0,0.03)]'>
            <div className="h-full w-[250px] bg-white border border-inherent rounded-[10px] flex flex-col">
                <DashboardHome />
                <div className='flex-1'>
                    {
                        manifest.addons.map(async (addon, index) => {
                            const addon_index: AppConfig = (await import(`/addons/${addon.name}/ui/`)).default;
                            if (addon_index.showInMainMenu === true) {
                                return <AppMenu key={index + 1} label={addon_index.label} path={`/dashboard/${addon.name}`} />
                            }
                            return <></>
                        })
                    }
                </div>
                <BtnGoSettings />
            </div>
            <div className='flex flex-col flex-1 h-full gap-[10px]'>
                <Header />
                <div className='flex-1'>
                    {props.children}
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
