import { FC } from 'react';
import Portal from '../../../shared/ui/portal/portal';
import './overlayingPopup.scss';

interface OverlayingPopupProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpened: boolean;
}

const OverlayingPopup: FC<OverlayingPopupProps> = ({ children, onClose, isOpened }) => {
    if (!isOpened) {
        return null;
    }
    return (
        <Portal>
            <div className="popup__container" role="dialog">
                <div className="popup__overlay" role="button" tabIndex={0} onClick={onClose}></div>
                {children}
            </div>
        </Portal>
    );
};

export default OverlayingPopup;
