import { memo } from 'react';

interface IdentityFunction {
  <T>(fn: T): T;
}

export const typedMemo: IdentityFunction = memo;
