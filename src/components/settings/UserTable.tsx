'use client'
import React from 'react'
import CrudTable from '@/components/ui/CrudTable';

export default function UserTable() {
    return <CrudTable
        idIndex='id'
        pagination={true}
        page_size={3}
        rowClassname='cursor-pointer'
        model='estate_property'
        columns={[
            // {
            //     label: "ID",
            //     index: "id"
            // },
            {
                label: "Nom d'utilisateur",
                index: "name"
            },
        ]}
    />
}