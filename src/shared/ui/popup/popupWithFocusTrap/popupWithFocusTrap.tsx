import FocusLock from 'react-focus-lock';

import { Portal } from '../../../ui/portal';
import styles from './popupWithFocusTrap.module.scss';

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
                <div className={styles.container} role="dialog">
                    <div className={styles.overlay} role="button" onClick={onClose}></div>
                    {children}
                </div>
            </FocusLock>
        </Portal>
    );
};
