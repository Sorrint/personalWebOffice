import { type ReactNode } from 'react';
import { isComponentWithName } from './typeGuards';

export function hasComponentName (child: ReactNode, name: string) {
    return isComponentWithName(child) && child.type.name === name;
}
