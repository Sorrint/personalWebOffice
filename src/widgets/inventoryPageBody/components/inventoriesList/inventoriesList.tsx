import { type IInventoryDocs, InventoryList, useLoadAllDocuments } from '@entities/inventoryDocs';
import { Container } from '@shared/layouts/container/container';
import { Grid } from '@shared/ui/grid';
import { LinkButton } from '@shared/ui/linkButton/linkButton';

export const InventoriesList = () => {
  const { data: documents, isLoading } = useLoadAllDocuments({});

  const renderDocuments = (list: IInventoryDocs[] | undefined) =>
    list ? <InventoryList documents={list} /> : <h2>Документов нет</h2>;

  return (
    <Container>
      <Grid>
        <LinkButton href={'./create'}>Новый документ</LinkButton>
        {isLoading ? <h2>Идет загрузка</h2> : renderDocuments(documents)}
      </Grid>
    </Container>
  );
};
