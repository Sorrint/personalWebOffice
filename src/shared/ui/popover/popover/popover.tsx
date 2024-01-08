import { type ReactNode, useState } from 'react';
import { Popover as HPopover } from '@headlessui/react';
import { usePopper } from 'react-popper';

interface PopoverProps {
  button: ReactNode;
  children: ReactNode;
}

export const Popover = ({ button, children }: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

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
