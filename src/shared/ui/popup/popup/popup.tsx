import './popup.scss';
import { Portal } from '../../../ui/portal';

interface PopupProps {
    children: React.ReactNode
    onClose: () => void
    isOpened: boolean
}

export const Popup = ({ children, onClose, isOpened }: PopupProps) => {
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
