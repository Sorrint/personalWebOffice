import { type FC, useState, type ReactNode } from 'react';
import { usePopper } from 'react-popper';
import { useClickOutside } from '@shared/lib/hooks/useClickOutside';
import { Portal } from '@shared/ui/portal';

interface PopoverProps {
    isOpen: boolean
    onClose: () => void
    referenceElement: HTMLElement
    children: ReactNode
}

export const PopoverNew: FC<PopoverProps> = ({ isOpen, onClose, referenceElement, children }) => {
    const [popperElement, setPopperElement] = useState<any>();

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start'
    });

    useClickOutside(popperElement, onClose);

    if (!isOpen) {
        return null;
    }

    return (
        <Portal>
            <div className="popover" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                {children}
            </div>
        </Portal>
    );
};
