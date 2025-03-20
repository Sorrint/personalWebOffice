import { type ReactNode, useState, ElementType } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { type Placement } from '@popperjs/core';

interface PopoverProps {
  button: ReactNode;
  buttonClassName: string;
  className?: string;
  renderChildren: (props: { close: () => void }) => ReactNode;
  placementPanel?: Placement;
  offsetX?: number;
  offsetY?: number;
  as?: ElementType;
}

export const Popover = ({
  as = 'div',
  button,
  buttonClassName,
  className,
  renderChildren,
  placementPanel,
  offsetX,
  offsetY,
}: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placementPanel,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [offsetX, offsetY],
        },
      },
    ],
  });

  return (
    <HPopover className={className}>
      <HPopover.Button as={as} ref={setReferenceElement} className={buttonClassName}>
        {button}
      </HPopover.Button>
      <HPopover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {({ close }) => <>{renderChildren?.({ close })}</>}
      </HPopover.Panel>
    </HPopover>
  );
};
