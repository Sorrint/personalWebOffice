import { Menu, Transition } from '@headlessui/react'
import { Button } from '../button'
import style from './dropdown.module.scss'
import classNames from 'classnames'
import { Fragment, type ReactNode } from 'react'

export interface DropdownItem {
    _id: string | number
    content: ReactNode
    disabled?: boolean
}
interface DropdownProps {
    options?: DropdownItem[]
    defaultValue?: string
    title: string
}

export const Dropdown = ({title, options} : DropdownProps) => {
    return (
        <Menu as={'div'} className={style.component}>
            {({open}) => (<>
                <Menu.Button as={Button} buttonType='dropdown' classname={style.btn}>{title}</Menu.Button>
                <Transition
                    show={open}
                    as={Fragment}
                    enter={style.transform}
                    enterFrom={style['opacity-start']}
                    enterTo={style['opacity-end']}
                >
                    <Menu.Items as='ul' className={style.list}>
                        {options?.map(item => (
                            <Menu.Item key = {item._id}>
                                {({ active }) => (
                           
                                    <li className={classNames(style.item, {[style.active]: active})}>
                                        {item.content}
                                    </li>
                                )}
                            </Menu.Item>)
                        )}
                    </Menu.Items>
                </Transition>
            </>)}

        </Menu>
    )
}