import { useEffect, useRef, useState } from 'react';
import { useKeyPress } from '../useKeyPress/useKeyPress';

export const useSearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const firstListElement = useRef<HTMLDivElement | null>(null);

  const setFirstListElement = (el: HTMLDivElement) => {
    firstListElement.current = el;
  };
  return { searchInputRef, firstListElement, setFirstListElement };
};

export const useSearchInputPopover = (onClosePopover?: () => void) => {
  const [activePopover, setActivePopover] = useState<boolean>(false);
  const { isKeyPressed } = useKeyPress('Escape');

  useEffect(() => {
    isKeyPressed && activePopover && setActivePopover(false);
    onClosePopover?.();
  }, [activePopover, isKeyPressed, onClosePopover]);

  return { activePopover, setActivePopover };
};
