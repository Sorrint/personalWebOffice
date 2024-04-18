import { memo } from 'react';
import { type IInventoryProduct, type IInventoryDocs } from '../../model/types';
import { AppLink } from '@shared/ui/appLink';
import styles from './inventoryList.module.scss';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';

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
    <div className={styles.list}>
      <h1>Список документов</h1>
      {documents.map(({ _id, documentNumber, comment, choosenDate, products }) => (
        <AppLink key={_id} to={`${documentNumber}`} variant='panel'>
          {`Инвентаризация № ${documentNumber} от `}
          <FormatDate date={choosenDate} />
          {`. ${comment && comment + '.'} Сумма: ${getSummary(products)}`}
        </AppLink>
      ))}
    </div>
  );
});

InventoryList.displayName = 'InventoryList';
