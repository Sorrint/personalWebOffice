import { memo, useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@shared/ui/checkbox';
import { type IInventoryDocs, type IInventoryProduct } from '../../model/types';
import { saveInventoryToExcel } from '../../lib/helpers';
import styles from './inventoryContent.module.scss';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { InventoryProductsTable } from '../inventoryProductsTable/inventoryProductsTable';
import { Button } from '@shared/ui/button';

export interface InventoryContentProps {
  onClick?: (product: IInventoryProduct) => void;
  onDelete?: (product: IInventoryProduct) => void;
  tabIndex?: number;
  inventoryList?: IInventoryDocs | undefined;
}

const highlightByAccount = (item: IInventoryProduct) => {
  return !item?.isActiveAccount;
};

export const InventoryContent = memo(
  ({ onClick, onDelete, tabIndex, inventoryList }: InventoryContentProps) => {
    const [highlightFunc, setHighlightFunc] = useState<
      ((item: IInventoryProduct) => boolean) | undefined
    >(undefined);

    useEffect(() => {
      const highlightOn = localStorage.getItem('highlight') === 'true';
      setHighlightFunc(() => (highlightOn ? highlightByAccount : undefined));
    }, []);
    const handleCheckboxClick = useCallback((checked: boolean) => {
      checked ? localStorage.setItem('highlight', 'true') : localStorage.setItem('highlight', '');
      setHighlightFunc(() => (checked ? highlightByAccount : undefined));
    }, []);

    const handleClick = () => {
      inventoryList && saveInventoryToExcel(inventoryList);
    };

    if (!inventoryList?.products) return 'Нет данных для отображения';

    return (
      <>
        <div className={styles.controls}>
          <Button buttonType='submit' onClick={handleClick} outline>
            Скачать в XLSX
          </Button>
          <Checkbox
            text='Выделять поля с резервного аккаунта'
            name='tempAcc'
            onChange={handleCheckboxClick}
            defaultChecked={localStorage.getItem('highlight') === 'true'}
          />
        </div>
        <h1>
          {`Инвентаризация № ${inventoryList.documentNumber} от `}
          <FormatDate date={inventoryList.choosenDate} />
          {` магазина ${inventoryList.storeName}`}
        </h1>
        <InventoryProductsTable
          highlightFunc={highlightFunc}
          inventoryList={inventoryList}
          onClick={onClick}
          onDelete={onDelete}
          tabIndex={tabIndex}
        />
      </>
    );
  },
);

InventoryContent.displayName = 'InventoryContent';
