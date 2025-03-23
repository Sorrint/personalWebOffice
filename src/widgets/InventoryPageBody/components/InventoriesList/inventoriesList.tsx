import { InventoryList, useLoadAllInventories } from '@entities/Inventories';
import { AppLinkItem } from '@shared/ui/AppLinksList';
import { Grid } from '@shared/ui/Grid';
import { LinkButton } from '@shared/ui/LinkButton';

export const InventoriesList = () => {
  const { data: documents, isLoading } = useLoadAllInventories({});

  const renderDocuments = (list: AppLinkItem[] | undefined) =>
    list ? <InventoryList documents={list} /> : <h2>Документов нет</h2>;

  return (
    <Grid>
      <LinkButton href={'./create'}>Новый документ</LinkButton>
      {isLoading ? <h2>Идет загрузка</h2> : renderDocuments(documents)}
    </Grid>
  );
};
