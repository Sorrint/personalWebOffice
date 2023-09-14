import { Portal } from '@shared/ui/portal';
import FocusLock from 'react-focus-lock';

import './PopupWithFocusTrap.scss';

interface PopupWithFocusTrapProps {
    children: React.ReactNode
    onClose: () => void
    isOpened: boolean
}

export const PopupWithFocusTrap= ({ children, onClose, isOpened }: PopupWithFocusTrapProps) => {
    if (!isOpened) {
        return null;
    }

    return (
        <Portal>
            <FocusLock>
                <div className="popup__container" role="dialog">
                    <div className="popup__overlay" role="button" onClick={onClose}></div>
                    {children}
                </div>
            </FocusLock>
        </Portal>
    );
};
