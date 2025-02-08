import { PackagesList } from '@entities/packages';
import { memo } from 'react';

export const Packages = memo(() => {
  return <PackagesList />;
});
