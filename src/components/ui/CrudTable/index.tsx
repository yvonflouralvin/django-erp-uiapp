'use client'
import React, { useEffect, useState } from 'react';
import useCrudTable from '@/lib/controlers/crud_table/';
import { Pagination, Spinner } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Drawer from '../Drawer';
import { Button } from '../button';
import { Input } from '../input';


export interface CrudTableColumnProps {
    label: string
    index: string
    render?: (column: CrudTableColumnProps) => React.ReactNode
    renderItem?: (item: any) => React.ReactNode
}
export interface CrudTableProps {
    model: string
    columns: CrudTableColumnProps[]
    onItemClick?: (item: any) => any
    rowClassname?: string
    pagination?: boolean
    page_size?: number
    idIndex: string
}
export default function CrudTable(props: CrudTableProps) {
    const {
        load,
        updateItem
    } = useCrudTable()

    const [datas, setDatas] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1);
    const [dataLoading, setDataLoading] = useState<boolean>(false);

    const load_datas = () => {
        setDataLoading(true);
        const arg: any = { model: props.model }
        if (props.pagination === true) {
            load({
                model: props.model,
                pagination: props.pagination,
                page_number: currentPage,
                page_size: props.page_size,
                idIndex: props.idIndex
            })
                .then(result => {
                    if (result.datas === undefined) {
                        setDatas([])
                        return;
                    }
                    setDatas(result.datas)
                    setTotalPage(result.total_pages)
                    setDataLoading(false)
                })
        } else {
            load({
                model: props.model,
                idIndex: props.idIndex
            })
                .then(result => {
                    if (result.datas === undefined) {
                        setDatas([])
                        return;
                    }
                    setDatas(result.datas)
                    setTotalPage(result.total_pages)
                    setDataLoading(false)
                })
        }
    }

    useEffect(() => {
        load_datas()
    }, [currentPage]);

    const getSkeleton = () => {
        const skeletons = [];
        if (props.pagination === true && props.page_size !== undefined) {
            for (let index = 0; index < props.page_size; index++) {
                const tmp: any[] = []
                props.columns.map((column, index) => {
                    tmp.push(<TableCell key={column.index}><Skeleton className="h-[20px] w-full rounded mr-[2px]" /></TableCell>)
                })
                skeletons.push(<TableRow key={index + 1}>{tmp}</TableRow>)
            }
        }
        return skeletons;
    }


    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingValue, setEditingValue] = useState<any>();
    const [isSavingEditing, setIsSavingEditing] = useState<boolean>(false);

    const handleEdit = () => {
        setIsEditing(true)
        const value: any = {}
        props.columns.map((column, index) => {
            value[column.index] = selectedItem[column.index];
        });
        setEditingValue(value);
    }

    const closeEditing = () => {
        setEditingValue({})
        setIsEditing(false)
    }

    const onChange = (index: string, e: any) => {
        const value: any = {};
        props.columns.map((column) => {
            if (index === column.index) value[column.index] = e;
            else value[column.index] = editingValue[column.index];
        });
        setEditingValue(value);

    }

    const handleSaveEditing = () => {
        setIsSavingEditing(true)
        updateItem({
            model: props.model,
            datas: editingValue,
            condition: `${props.idIndex}=${selectedItem[props.idIndex]}`
        })
            .then((result) => {
                setDatas(datas.map((data) => {
                    if (data[props.idIndex] === selectedItem[props.idIndex]) {
                        return editingValue;
                    } else {
                        return data
                    }
                }))
                setSelectedItem({
                    ...editingValue,
                    [props.idIndex]: selectedItem[props.idIndex]
                })
                setIsSavingEditing(false);
                setIsEditing(false);
            })
    }

    const handleClickItem = (data: any) => {
        setSelectedItem(data)
        setIsDetailsOpen(true)

        if (props.onItemClick !== undefined) {
            props.onItemClick(data)
        }
    }

    return <>
        <div className='flex'>
            <div className='duration-300 w-full'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                props.columns.map((column, index) => {
                                    return <TableHead key={column.index}>
                                        {column.label}
                                    </TableHead>
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            dataLoading === true ? <>
                                {
                                    getSkeleton()
                                }
                            </> :
                                datas.map((data: any, index: number) => {
                                    return <TableRow key={index + 1} onClick={() => {
                                        handleClickItem(data);
                                    }} className={`
                                ${props.rowClassname}
                            `}>
                                        {
                                            props.columns.map((column, pndex) => {
                                                return <TableCell key={`${index}-${column.index}`}>{data[column.index]}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                })

                        }
                    </TableBody>
                </Table>

                {props.pagination === true && <>
                    {
                        (datas.length > 0 && totalPage > 1) && <Pagination total={totalPage} initialPage={1} page={currentPage} onChange={setCurrentPage} />
                    }
                </>}

            </div>
        </div>
        <Drawer open={isDetailsOpen} onClose={() => {
            setIsDetailsOpen(false)
            setSelectedItem(undefined)
        }}>
            <div className='w-[400px] h-full'>
                <p>Détails</p>
                <hr />
                {
                    selectedItem !== undefined && <div>
                        {
                            props.columns.map((column, index) => {
                                return <div className='mt-[10px]' key={column.index}>
                                    <p className='text-[12px] font-semibold text-gray-400'>{column.label}</p>
                                    {
                                        isEditing === false ? <p className='font-light'>{selectedItem[column.index]}</p> : <div>
                                            <Input defaultValue={selectedItem[column.index]} placeholder={column.label} onChange={e => onChange(column.index, e.target.value)} />
                                        </div>
                                    }

                                </div>
                            })
                        }
                    </div>
                }
                <div className='mt-[20px]'>
                    {
                        isEditing === false ? <button className='border-[1px] rounded border-primary text-[12px] px-[20px] py-[5px]' onClick={handleEdit}>
                            Modifier
                        </button> : <div className='flex gap-[10px]'>
                            {
                                isSavingEditing === false ? <>
                                    <p className='' onClick={closeEditing}>Annuler</p>
                                    <button className='border-[1px] rounded border-primary text-[12px] px-[20px] py-[5px]' onClick={handleSaveEditing}>
                                        Enregistrer
                                    </button>
                                </> : <div className={`flex items-center gap-[10px]`}>
                                    <Spinner />
                                    <p>Entregistrement en cours...</p>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </Drawer>
    </>
}