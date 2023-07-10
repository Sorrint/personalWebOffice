import { type FC } from 'react';

import './overlayingPopup.scss';
import { Portal } from '@shared/ui/portal';

interface OverlayingPopupProps {
    children: React.ReactNode
    onClose: () => void
    isOpened: boolean
}

export const OverlayingPopup: FC<OverlayingPopupProps> = ({ children, onClose, isOpened }) => {
    if (!isOpened) {
        return null;
    }

    return (
        <Portal>
            <div className="popup__container" role="dialog">
                <div className="popup__overlay" role="button" onClick={onClose}></div>
                {children}
            </div>
        </Portal>
    );
};
