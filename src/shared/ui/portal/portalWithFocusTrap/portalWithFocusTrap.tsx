import { FC } from 'react';
import Portal from '../portal';
import FocusLock from 'react-focus-lock';

interface IDropdownListProps {
    children: React.ReactNode;
}
const PortalWithFocusTrap: FC<IDropdownListProps> = ({ children }) => {
    return (
        <FocusLock>
            <Portal>{children}</Portal>
        </FocusLock>
    );
};

export default PortalWithFocusTrap;
