import { type FC } from 'react';

import { Portal } from '@shared/ui/portal/portal/portal';
import FocusLock from 'react-focus-lock';

import './overlayingPopupWithFocusTrap.scss';

interface OverlayingPopupWithFocusTrapProps {
    children: React.ReactNode
    onClose: () => void
    isOpened: boolean
}

export const OverlayingPopupWithFocusTrap: FC<OverlayingPopupWithFocusTrapProps> = ({ children, onClose, isOpened }) => {
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
