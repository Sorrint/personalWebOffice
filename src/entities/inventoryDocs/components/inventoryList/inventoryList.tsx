import { memo } from 'react';
import { type IInventoryProduct, type IInventoryDocs } from '../../model/types';
import { AppLink } from '@shared/ui/appLink';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { Grid } from '@shared/ui/grid';

interface InventoryListProps {
  documents: IInventoryDocs[];
}

export const InventoryList = memo(({ documents }: InventoryListProps) => {
  const getSummary = (products: IInventoryProduct[]) => {
    return products
      .reduce((acc, product) => {
        return (acc += (product?.price || 0) * product.quantity);
      }, 0)
      .toFixed(2);
  };
  return (
    <Grid>
      <h1>Список документов</h1>
      {documents.map(({ _id, documentNumber, comment, choosenDate, products }) => (
        <AppLink key={_id} to={`${documentNumber}`} variant='panel'>
          {`Инвентаризация № ${documentNumber} от `}
          <FormatDate date={choosenDate} />
          {`. ${comment && comment + '.'} Сумма: ${getSummary(products)}`}
        </AppLink>
      ))}
    </Grid>
  );
});

InventoryList.displayName = 'InventoryList';
