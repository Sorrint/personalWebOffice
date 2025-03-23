import { PackagesList } from '@entities/Packages';
import { memo } from 'react';

export const Packages = memo(() => {
  return <PackagesList />;
});
