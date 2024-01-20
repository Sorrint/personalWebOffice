import { type ReactNode, useState } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { type Placement } from '@popperjs/core';

interface PopoverProps {
  button: ReactNode;
  children: ReactNode;
  placementPanel?: Placement;
  offsetX?: number;
  offsetY?: number;
}

export const Popover = ({ button, children, placementPanel, offsetX, offsetY }: PopoverProps) => {
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
    <HPopover>
      <HPopover.Button as='div' ref={setReferenceElement}>
        {button}
      </HPopover.Button>
      <HPopover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
