'use client'
import React from 'react'

interface DrawerProps {
    open: boolean
    children: React.ReactNode
    onClose: () => any
}
export default function Drawer(props: DrawerProps) {
    return <div className={`
        ${props.open === true ? `flex` : `hidden`}
        fixed
        top-0
        left-0
        h-screen
        w-screen
        overflow-hidden
        backdrop-blur-[1px]
    `}>
        <div className='duration-300 h-screen overflow-y-scroll p-[20px] bg-white shadow'>
            {props.children}
        </div>
        <div className='bg-white p-[10px] w-[50px] h-[50px] flex items-center justify-center cursor-pointer -ml-[50px]' onClick={props.onClose}>
            <p className='font-semibold text-[20px]'>x</p>
        </div>
    </div>
}