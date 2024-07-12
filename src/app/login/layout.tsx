

import AppProviders from '@/components/AppProviders';
import React from 'react';
interface LayoutProps {
    children: React.ReactNode;
}
const Layout = (props: LayoutProps) => {
    return <AppProviders>{props.children}</AppProviders>
}

export default Layout;
