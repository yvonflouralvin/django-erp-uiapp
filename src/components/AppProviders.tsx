'use client'

import React from 'react';
import { NextUIProvider } from "@nextui-org/react";

interface AppProvidersProps {
    children: React.ReactNode
}
export default function AppProviders(props: AppProvidersProps) {



    return <NextUIProvider>{props.children}</NextUIProvider>
}