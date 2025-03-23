import { type FC } from 'react';

import './Dropdown.scss';

interface IDropdownListProps {
  className?: string;
  children: React.ReactNode;
}
export const DropdownList: FC<IDropdownListProps> = ({ children, className }) => {
  return <div className={`dropdown ${className ?? ''}`}>{children}</div>;
};
