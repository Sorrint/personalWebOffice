import { useGetDitributionsList } from '@entities/distributions/api/distributionsApi';
import { AppLinksList } from '@shared/ui/AppLinksList';
import { memo } from 'react';

export const DistributionsList = memo(() => {
  const { data: distributionsLinks } = useGetDitributionsList();

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
