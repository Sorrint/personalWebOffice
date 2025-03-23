import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export const Portal = ({ children, container = document.body }: PortalProps) => {
  return createPortal(children, container);
};
