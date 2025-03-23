import { useEffect, useRef } from 'react';
import { Portal } from '../Portal/Portal';

interface PortalWithFocusTrapProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export const PortalWithFocusTrap = ({
  children,
  container = document.body,
}: PortalWithFocusTrapProps) => {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    return () => {
      previousFocus.current?.focus();
    };
  }, []);

  return <Portal container={container}>{children}</Portal>;
};
