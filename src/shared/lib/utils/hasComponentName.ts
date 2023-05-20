import { isComponentWithName } from './typeGuards';

export function hasComponentName(child: any, name: string) {
    return isComponentWithName(child) && child.type.name === name;
}
