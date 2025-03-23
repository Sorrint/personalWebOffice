import { useCallback, useEffect, type ReactNode } from 'react';

function isClickedOutside(clickedElement: Element, targetElement: Element) {
  let clickedEl: Node | null = clickedElement;

  while (clickedEl) {
    if (clickedEl === targetElement) {
      return false;
    }

    clickedEl = clickedEl.parentNode;
  }

  return document.contains(clickedElement);
}

interface ClickOutsideProps {
  children: ReactNode;
  onClickOutside: () => void;
  reference: HTMLElement | undefined;
}

export const ClickOutside = ({ children, reference, onClickOutside }: ClickOutsideProps) => {
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (!reference) {
        return;
      }

      if (isClickedOutside(reference, event.target as Element)) {
        onClickOutside();
      }
    },
    [onClickOutside, reference],
  );

  // handle clicks outside the popup
  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return <>{children}</>;
};
