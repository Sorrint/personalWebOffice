import styles from './popup.module.scss';
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
            <div className={styles.container} role="dialog">
                <div className={styles.overlay} role="button" onClick={onClose}></div>
                {children}
            </div>
        </Portal>
    );
};
