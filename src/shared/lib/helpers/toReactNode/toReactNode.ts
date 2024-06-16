import { ReactNode } from 'react';

export const toReactNode = (
  value: string | number | ReactNode | (() => ReactNode) | undefined,
): ReactNode => {
  if (!value) {
    return '';
  }

  if (typeof value === 'function') {
    return value();
  }

  return value.toString();
};
