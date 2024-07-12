

import Dashboard from '../../../components/dashboard/Dashboard';
import Settings from '../../../components/pages/Settings';
import { AppConfig } from '../../../lib/shared/types/config';
import React from 'react';
interface PageProps {
    params: {
        app: string[]
    }
}
const Page = async (props: PageProps) => {

    if (props.params.app[0] === "settings") return <Settings />

    const render = async () => {
        try {
            const addon_index: AppConfig = (await import(`/addons/${props.params.app[0]}/ui/`)).default;
            return addon_index.render(props.params.app)
        } catch (e) {
            return <div>
                <p>500</p>
            </div>
        }
    }
    return (
        <Dashboard>
            {await render()}
        </Dashboard>
    );
}

export default Page;
