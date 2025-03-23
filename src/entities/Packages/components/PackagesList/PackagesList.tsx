import { AppLinksList } from '@shared/ui/AppLinksList';
import { useGetPackages } from '../../api/packagesApi';
import { memo } from 'react';

export const PackagesList = memo(() => {
  const { data: packagesLinks } = useGetPackages();
  return (
    <>
      {packagesLinks ? (
        <AppLinksList list={packagesLinks} listTitle='Список упаковок' />
      ) : (
        'Нет заказов'
      )}
    </>
  );
});
