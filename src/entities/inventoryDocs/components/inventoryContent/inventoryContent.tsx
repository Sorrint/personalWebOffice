import { memo, useState } from 'react';

import { Checkbox } from '@shared/ui/checkbox';
import { transformDate } from '@shared/lib/helpers';

import { InventoryProductList } from '../inventoryProductsList/inventoryProductsList';
import { type IInventoryDocs, type IInventoryProduct } from '../../model/types';
import { saveInventoryToExcel } from '../../lib/helpers/saveInventoryToExcel';
import styles from './inventoryContent.module.scss';

export interface InventoryContentProps {
  onClick?: (product: IInventoryProduct) => void;
  onDelete?: (product: IInventoryProduct) => void;
  tabIndex?: number;
  inventoryList?: IInventoryDocs | undefined;
}

export const InventoryContent = memo(
  ({ onClick, onDelete, tabIndex, inventoryList }: InventoryContentProps) => {
    if (!inventoryList) return 'Нет данных для отображения';
    const [highlight, setHighlight] = useState(
      localStorage.getItem('highlight') === 'true' ? true : false,
    );

    const handleCheckboxClick = (checked: boolean) => {
      checked ? localStorage.setItem('highlight', 'true') : localStorage.setItem('highlight', '');
      setHighlight(checked);
    };

    if (inventoryList != null) {
      const sum = inventoryList.products?.reduce(
        (result: number, product: IInventoryProduct) =>
          product.price ? result + product.quantity * product.price : result,
        0,
      );
      const date = transformDate(inventoryList.choosenDate);
      const handleClick = () => {
        saveInventoryToExcel(inventoryList);
      };

      return (
        <>
          <div className={styles.controls}>
            <button className={styles['create-xlsx']} onClick={handleClick}>
              Скачать в формате XLSX
            </button>
            <Checkbox
              text='Выделять поля с резервного аккаунта'
              name='tempAcc'
              onChange={handleCheckboxClick}
              defaultChecked={highlight}
            />
          </div>
          <h1>{`Инвентаризация № ${inventoryList.documentNumber} от ${date} магазина ${inventoryList.storeName}`}</h1>
          <div className={styles['inventory-products-list']}>
            <InventoryProductList
              highlight={highlight}
              products={inventoryList.products}
              onClick={onClick}
              onDelete={onDelete}
              tabIndex={tabIndex}
            />
            <div className={styles.total}>
              <div>Итого</div>
              <div className={styles.sum}>{sum.toFixed(2)} ₽</div>
            </div>
          </div>
        </>
      );
    }
  },
);
