import { Dialog } from '@headlessui/react';
import { type ReactNode } from 'react';
import styles from './modal.module.scss';
import classNames from 'classnames';

interface ModalProps {
  children: ReactNode;
  centered?: boolean;
  isActive?: boolean;
  fullHeight?: boolean;
  animation?: boolean;
  onClose?: () => void;
}

export const Modal = ({
  children,
  centered,
  isActive,
  fullHeight,
  animation,
  onClose = () => null,
}: ModalProps) => {
  const modalClasses = classNames(styles.component, {
    [styles.centered]: centered,
  });
  const panelClasses = classNames(styles.panel, {
    [styles.animation]: animation,
    [styles.height100]: fullHeight,
  });

  return (
    <Dialog open={isActive} onClose={onClose} className={modalClasses}>
      <Dialog.Panel className={panelClasses}>{children}</Dialog.Panel>
    </Dialog>
  );
};
