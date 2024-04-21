import { useRef } from 'react';

export const useSearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const firstListElement = useRef<HTMLDivElement | null>(null);

  const setFirstListElement = (el: HTMLDivElement) => {
    firstListElement.current = el;
  };
  return { searchInputRef, firstListElement, setFirstListElement };
};
