'use server'
import React from 'react';
import { cookies } from "next/headers"




interface LayoutProps {
    children: React.ReactNode,
    request: any
}


const Layout = async (props: LayoutProps) => {
    return <>{props.children}</>;
}

export default Layout;
