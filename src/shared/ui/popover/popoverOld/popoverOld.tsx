import { useRef } from 'react';
import { Popper } from 'react-popper';
import type * as PopperJS from '@popperjs/core';

import { Portal } from '../../../ui/portal';
import { ClickOutside } from '../../../lib/helpers';

interface PopoverProps {
    children: React.ReactNode
    onClose: () => void
    isOpened: boolean
    reference: HTMLElement | undefined
    placement: PopperJS.Placement
}

export const PopoverOld = ({ onClose, reference, placement, children, isOpened } : PopoverProps) => {
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
