import classNames from 'classnames'
import { type ReactNode, memo, useCallback, useEffect, useMemo, useState } from 'react'

import style from './panel2.module.scss'
import { IconFont } from '../iconFont'

interface PanelProps {
  children: ReactNode
  className?: string
  onChange?: (isOpen: boolean) => void
  open?: boolean
  title?: string
}
export const Panel = memo(({ children, className, onChange, open, title }: PanelProps) => {
    const [isOpen, setIsOpen] = useState(open)

    useEffect(() => {
        if (isOpen !== undefined && open !== isOpen) {
            setIsOpen(open)
            onChange?.(isOpen)
        }
    }, [open])

    const onClick = useCallback(() => {
        setIsOpen((prev) => !prev)
        if (isOpen !== undefined) {
            onChange?.(isOpen)
        }
    }, [open, isOpen])

    const showIcon = useMemo(() => (<IconFont iconName={isOpen ? 'icon-arrow_up' : 'icon-arrow_down'}/>), [isOpen])
    const componentClass = classNames(style.component, className)

    const renderContent = useCallback(()=> {
        if (!title || (title && open === undefined) || (title && open !== undefined && isOpen)) {
            return <div className={classNames(style.content, {[style['content-top']]: title || isOpen})}>{children}</div>
        }
    }, [title, open, isOpen, children])

    return (
        <div className={componentClass} onClick={onClick}>
            {title && (
                <div className={style.head}>
                    <h3 className={style.title}>
                        {title}
                    </h3>
                    {open !== undefined && showIcon}
                </div>
            )}
            {renderContent()}
        </div>
    )
})
Panel.displayName = 'Panel'
