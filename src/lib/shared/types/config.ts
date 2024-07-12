import React from "react"



export interface AppConfig {
    showInMainMenu: boolean
    icon?: string
    label: string
    render: (app:string[])=> React.ReactNode
}

export interface Addon {
    name: string
}

export interface AppManifest {
    addons: Addon[]
}