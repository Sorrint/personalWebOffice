import { FC } from 'react';

import './dropdown.scss';

interface IDropdownListProps {
    children: React.ReactNode;
}
const DropdownList: FC<IDropdownListProps> = ({ children }) => {
    return <div className="dropdown">{children}</div>;
};

export default DropdownList;
