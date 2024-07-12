'use client'
import React, { Dispatch } from 'react'

import { Modal, ModalContent, ModalHeader } from '@nextui-org/react'
import { CrudTableColumnProps } from '.'
import { Button } from '../button'

interface CrudTableItemProps {
    open: boolean
    onClose: () => any
    columns: CrudTableColumnProps[]
    selectedItem?: any
    setSelectedItem?: Dispatch<any>
}
export default function CrudTableItem(props: CrudTableItemProps) {

    
    return <Modal
        size='3xl'
        isOpen={props.open}
        onClose={props.onClose}>
        <ModalContent>
            <div className='p-[20px]'>
                <p className='font-semibold pb-[10px]'>Détails</p>
                <hr />
                {
                    props.selectedItem !== undefined && <div>
                        {
                            props.columns.map((column, index) => {
                                return <div className='mt-[10px]'>
                                    <p className='font-light text-[12px]'>{column.label}</p>
                                    <p>{props.selectedItem[column.index]}</p>
                                </div>
                            })
                        }
                    </div>
                }
                <div className='flex justify-end mt-[20px]'>
                    <Button>Modifier</Button>
                </div>
            </div>
        </ModalContent>
    </Modal>
}