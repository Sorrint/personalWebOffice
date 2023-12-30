import { Menu, Transition } from '@headlessui/react'
import { Button } from '../button'
import style from './dropdown.module.scss'
import classNames from 'classnames'
import { Fragment } from 'react'

const items: DropdownItem[] = [
    {_id: 1, content: 'Account settings' },
    {_id: 2, content: 'Documentation' },
    {_id: 3, content: 'Invite a friend (coming soon!)'},
]

interface DropdownItem {
    _id: string | number
    content: string
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
                <Menu.Button as={Button} buttonType='dropdown'>{title}</Menu.Button>
                <Transition
                    show={open}
                    as={Fragment}
                    enter={style.transform}
                    enterFrom={style['opacity-start']}
                    enterTo={style['opacity-end']}
                >
                    <Menu.Items as='ul' className={style.list}>
                        {items?.map(item => (
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