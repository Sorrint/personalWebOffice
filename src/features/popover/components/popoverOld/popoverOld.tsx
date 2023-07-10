import { useRef, type FC } from 'react';
import { Popper } from 'react-popper';
import type * as PopperJS from '@popperjs/core';

import { ClickOutside } from '@features/popup';
import { Portal } from '@shared/ui/portal';

interface PopoverProps {
    children: React.ReactNode
    onClose: () => void
    isOpened: boolean
    reference: HTMLElement | undefined
    placement: PopperJS.Placement
}

export const Popover: FC<PopoverProps> = ({ onClose, reference, placement, children, isOpened }) => {
    const popperRef = useRef();
    return (
        <>
            {reference && isOpened && (
                <Portal>
                    <ClickOutside reference={popperRef.current} onClickOutside={onClose}>
                        <Popper innerRef={popperRef} referenceElement={reference} placement={placement}>
                            {({ ref, style }) => (
                                <div ref={ref} style={style} className="popover">
                                    {children}
                                </div>
                            )}
                        </Popper>
                    </ClickOutside>
                </Portal>
            )}
        </>
    );
};
