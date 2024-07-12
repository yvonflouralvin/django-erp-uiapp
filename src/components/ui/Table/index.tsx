import React from 'react';

interface TableColumm {
    label: string
    index: string
    width?: number
}
interface TableProps {


    columns: TableColumm[]

}
export default function Table(props: TableProps) {
    return <div>
        {/* Columns */}
        <div className="flex items-center">
            {
                props.columns.map((column, index) => {
                    const style = `
                        ${column.width === undefined ? "flex-1" : `w-[${column.width}px]`}
                    `;
                    return <div key={column.index} className={`${style}`}>
                        <p>{column.label}</p>
                    </div>
                })
            }
        </div>
    </div>
}