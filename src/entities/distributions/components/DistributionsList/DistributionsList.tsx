import { useGetDistributionsList } from '@entities/distributions/api/distributionsApi';
import { AppLinksList } from '@shared/ui/AppLinksList';
import { memo } from 'react';

export const DistributionsList = memo(() => {
  const { data: distributionsLinks } = useGetDistributionsList();

  return (
    <>
      {distributionsLinks ? (
        <AppLinksList list={distributionsLinks} listTitle='Список распаллетовок' />
      ) : (
        'Нет распаллетовок'
      )}
    </>
  );
});
