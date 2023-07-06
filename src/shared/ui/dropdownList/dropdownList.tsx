import { type FC } from 'react';

import './dropdown.scss';

interface IDropdownListProps {
    children: React.ReactNode
}
export const DropdownList: FC<IDropdownListProps> = ({ children }) => {
    return <div className="dropdown">{children}</div>;
};
