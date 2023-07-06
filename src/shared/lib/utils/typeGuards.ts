import { type ReactElement, type ReactNode } from 'react';

interface IReactElementWithName {
    type: {
        name: string
    }
}
export function isReactElement (children: ReactNode): children is ReactElement {
    if (children !== null && typeof children === 'object') {
        return 'props' in children;
    } else {
        return false;
    }
}

export function isComponentWithName (child: any): child is IReactElementWithName {
    return (
        isReactElement(child) &&
        typeof child.type === 'function' &&
        'name' in child.type &&
        typeof child.type.name === 'string'
    );
}
