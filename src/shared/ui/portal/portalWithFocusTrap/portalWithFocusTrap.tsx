import { type FC } from 'react';
import { Portal } from '../portal/portal';
import FocusLock from 'react-focus-lock';

interface IDropdownListProps {
    children: React.ReactNode
}
export const PortalWithFocusTrap: FC<IDropdownListProps> = ({ children }) => {
    return (
        <FocusLock>
            <Portal>{children}</Portal>
        </FocusLock>
    );
};
