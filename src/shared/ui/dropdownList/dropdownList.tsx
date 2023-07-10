import { type FC } from 'react';

import './dropdown.scss';

interface IDropdownListProps {
    className?: string
    children: React.ReactNode
}
export const DropdownList: FC<IDropdownListProps> = ({ children, className }) => {
    return <div className={`dropdown ${className ?? ''}`}>{children}</div>;
};
