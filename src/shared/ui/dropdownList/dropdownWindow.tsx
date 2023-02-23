import { FC } from 'react';
import './dropdown.scss';

interface IDropdownWindowProps {
    children: React.ReactNode;
}
const DropdownWindow: FC<IDropdownWindowProps> = ({ children }) => {
    return <div className="dropdown">{children}</div>;
};

export default DropdownWindow;
