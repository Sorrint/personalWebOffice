import { useMemo, useState, type ReactNode } from 'react';
import { usePopper } from 'react-popper';
import type { Modifier } from '@popperjs/core';

import { useClickOutside } from '../../../lib/hooks/useClickOutside';
import { Portal } from '../../Portal';

const sameWidthModifier: Modifier<'sameWidth', object> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    const ref = state.elements.reference as HTMLElement;
    state.elements.popper.style.width = `${ref.offsetWidth}px`;
  },
};

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  referenceElement: HTMLElement;
  sameWidth?: boolean;
  children: ReactNode;
}

export const Popover = ({
  isOpen,
  onClose,
  referenceElement,
  sameWidth,
  children,
}: PopoverProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [popperElement, setPopperElement] = useState<any>();

  const modifiers = useMemo(() => (sameWidth ? [sameWidthModifier] : []), [sameWidth]);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers,
  });

  useClickOutside(popperElement, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className='popover' ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {children}
      </div>
    </Portal>
  );
};
