import { type FC, useState, useEffect, type ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    children: ReactNode
}

export const Portal: FC<PortalProps> = ({ children }) => {
    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);
        return () => {
            document.body.removeChild(container);
        };
    }, []);
    return ReactDOM.createPortal(children, container);
};
