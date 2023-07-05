import { useRef, FC } from 'react';
import { Popper } from 'react-popper';
import * as PopperJS from '@popperjs/core';

import { ClickOutside } from '../popup/clickOutside';

import Portal from '@shared/ui/portal/portal';

interface PopoverProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpened: boolean;
    reference: HTMLElement | undefined;
    placement: PopperJS.Placement;
}
const Popover: FC<PopoverProps> = ({ onClose, reference, placement, children, isOpened }) => {
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

export default Popover;
