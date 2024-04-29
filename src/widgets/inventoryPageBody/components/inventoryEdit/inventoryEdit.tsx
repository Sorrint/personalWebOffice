import { memo, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useEditProductForm, PopupEditProductForm } from '@features/editProductForm';
import { SaveInventoryToXLSX } from '@features/saveInventoryToXLSX';
import {
  type IInventoryProduct,
  useLoadDocumentByNumber,
  InventoryProductsTable,
} from '@entities/inventoryDocs';
import { PopoverProductsList } from '@entities/products';
import { useSearchInput, useSearchInputPopover } from '@shared/lib/hooks';
import { Container } from '@shared/layouts/container/container';
import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { SearchInput } from '@shared/ui/searchInput';
import { Checkbox } from '@shared/ui/checkbox';
import { Grid } from '@shared/ui/grid';

import { useLoadInventoryProductsBySearch } from '../../hooks/useLoadInventoryProductsBySearch';

import styles from './inventoryEdit.module.scss';

const highlightByAccount = (item: IInventoryProduct) => {
  return !item?.isActiveAccount;
};

export const InventoryEdit = memo(() => {
  const { number } = useParams();
  const docNumber = Number(number);

  const { searchInputRef, setFirstListElement, firstListElement } = useSearchInput();

  const onCloseModal = () => {
    searchInputRef?.current?.focus();
  };

  const { activePopup, displayForm, onSubmit, updateError, formProps, setActivePopup } =
    useEditProductForm(docNumber, true, onCloseModal);
  const { activePopover, setActivePopover } = useSearchInputPopover(onCloseModal);

  // Загрузка данных
  const { data: inventoryList, isLoading } = useLoadDocumentByNumber(number);
  const { goods, isFetching, setSearch, isActiveAccount } = useLoadInventoryProductsBySearch();

  const [highlightFunc, setHighlightFunc] = useState<
    ((item: IInventoryProduct) => boolean) | undefined
  >(undefined);

  const handleCreate = useCallback(
    (product: IInventoryProduct) => {
      displayForm('create')(product);
      setActivePopover(false);
      setActivePopup(true);
    },
    [displayForm, setActivePopover, setActivePopup],
  );

  const getGoods = async (value: string) => {
    setActivePopover(false);
    setSearch(value);
  };

  const popoverCondition = goods && goods?.length !== 0 && !activePopup;

  useEffect(() => {
    if (goods) {
      goods.length === 1 ? handleCreate(goods[0]) : setActivePopover(goods?.length > 0);
    }
  }, [goods, handleCreate, setActivePopover]);

  useEffect(() => {
    const highlightOn = localStorage.getItem('highlight') === 'true';
    setHighlightFunc(() => (highlightOn ? highlightByAccount : undefined));
  }, []);

  const handleCheckboxClick = useCallback((checked: boolean) => {
    checked ? localStorage.setItem('highlight', 'true') : localStorage.setItem('highlight', '');
    setHighlightFunc(() => (checked ? highlightByAccount : undefined));
  }, []);

  if (!inventoryList?.products) return 'Нет данных для отображения';

  if (isLoading) return 'Идет загрузка...';

  const renderList = () => (
    <>
      {popoverCondition && activePopover && (
        <PopoverProductsList
          products={goods}
          onClick={handleCreate}
          parentRef={searchInputRef}
          setFirstElement={setFirstListElement}
        />
      )}
    </>
  );

  return (
    <>
      <Container>
        <Grid>
          <SearchInput
            searchFunction={getGoods}
            loading={isFetching}
            canShowPopover={popoverCondition}
            renderList={renderList}
            activePopover={activePopover}
            firstListElement={firstListElement}
            searchInputRef={searchInputRef}
            setActivePopover={setActivePopover}
          />
          <div className={styles.controls}>
            <Checkbox
              text='Выделять поля с резервного аккаунта'
              name='tempAcc'
              onChange={handleCheckboxClick}
              defaultChecked={localStorage.getItem('highlight') === 'true'}
            />
            <SaveInventoryToXLSX inventoryList={inventoryList} />
          </div>
          <h1>
            {`Инвентаризация № ${inventoryList.documentNumber} от `}
            <FormatDate date={inventoryList.choosenDate} />
            {` магазина ${inventoryList.storeName}`}
          </h1>
        </Grid>
      </Container>
      <Container scrollable>
        <InventoryProductsTable
          highlightFunc={highlightFunc}
          inventoryList={inventoryList}
          onClick={displayForm('update')}
          onDelete={displayForm('delete')}
          tabIndex={activePopup ? -1 : 0}
        />
      </Container>
      <PopupEditProductForm
        activePopup={activePopup}
        formProps={formProps}
        buttonClick={onSubmit}
        error={updateError}
        isActive={isActiveAccount}
        setActivePopup={setActivePopup}
      />
    </>
  );
});

InventoryEdit.displayName = 'inventoryEdit';
