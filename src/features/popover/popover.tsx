import { useRef, FC } from 'react';
import Portal from '../../shared/ui/portal/portal';
import * as PopperJS from '@popperjs/core';
import { Popper } from 'react-popper';
import { ClickOutside } from '../popup/clickOutside';

interface PopoverProps {
    children: React.ReactNode;
    onClose: () => void;
    isOpened: boolean;
    reference: HTMLDivElement | undefined;
    placement: PopperJS.Placement;
}
const Popover: FC<PopoverProps> = ({ onClose, reference, placement, children }) => {
    const popperRef = useRef();
    return (
        <>
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
        </>
    );
};

export default Popover;
