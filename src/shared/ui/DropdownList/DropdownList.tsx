import './Dropdown.scss';

interface IDropdownListProps {
  className?: string;
  children: React.ReactNode;
}
export const DropdownList = ({ children, className }: IDropdownListProps) => {
  return <div className={`dropdown ${className ?? ''}`}>{children}</div>;
};
