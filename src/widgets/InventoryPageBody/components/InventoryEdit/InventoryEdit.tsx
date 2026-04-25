import { memo, useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useEditProductForm, PopupEditProductForm } from '@features/EditProductForm';
import { SaveInventoryToXLSX } from '@features/SaveInventoryToXLSX';
import {
  type InventoryProduct,
  useLoadDocumentByNumber,
  InventoryProductsTable,
} from '@entities/Inventories';
import { PopoverProductsList, useLoadAllProductsCached } from '@entities/Products';
// import { FormatDate } from '@shared/ui/formatDate/FormatDate';
import { SearchInput, type SearchInputHandle } from '@shared/ui/SearchInput';
import { Checkbox } from '@shared/ui/Checkbox';
import { Grid } from '@shared/ui/Grid';
import { AsyncReduxComponent, type ReducersList } from '@shared/lib/components';
import { editProductFormReducer } from '@features/EditProductForm';
import { ScrollableBlock } from '@shared/ui/ScrollableBlock';
import { Button } from '@shared/ui/Button';

import { useSearchProductsFromCache } from '../../lib/hooks/useSearchProductsFromCache';
import { useLoadInventoryProductsBySearch } from '../../lib/hooks/useLoadInventoryProductsBySearch';
import styles from './InventoryEdit.module.scss';

const highlightByAccount = (item: InventoryProduct) => {
  return !item?.isActiveAccount;
};

const reducers: ReducersList = {
  editProductForm: editProductFormReducer,
};

export const InventoryEdit = memo(() => {
  const { number } = useParams();
  const docNumber = Number(number);

  const searchRef = useRef<SearchInputHandle>(null);

  const { activePopup, displayForm, updateError, setActivePopup, onSubmit } = useEditProductForm(
    docNumber,
    true,
    () => searchRef.current?.select(),
  );

  const [popoverOpen, setPopoverOpen] = useState(false);

  const { data: inventoryList, isLoading } = useLoadDocumentByNumber(number);
  useLoadAllProductsCached();

  const [serverSearch, setServerSearch] = useState<string>('');
  const [useCache, setUseCache] = useState(
    () => localStorage.getItem('feature_productsCache') !== 'false',
  );

  const handleCacheToggle = useCallback((checked: boolean) => {
    localStorage.setItem('feature_productsCache', String(checked));
    setUseCache(checked);
  }, []);

  const {
    goods: cacheGoods,
    isFetching: cacheFetching,
    search: searchFromCache,
  } = useSearchProductsFromCache();
  const { goods: serverGoods, isFetching: serverFetching } = useLoadInventoryProductsBySearch(
    serverSearch,
    useCache,
  );

  const goods = useCache ? cacheGoods : serverGoods;
  const isFetching = useCache ? cacheFetching : serverFetching;

  const [highlightFunc, setHighlightFunc] = useState<
    ((item: InventoryProduct) => boolean) | undefined
  >(() => (localStorage.getItem('highlight') === 'true' ? highlightByAccount : undefined));

  const handleCreate = useCallback(
    (product: InventoryProduct) => {
      displayForm('create')(product);
      setPopoverOpen(false);
      setActivePopup(true);
    },
    [displayForm, setActivePopup],
  );

  const getGoods = useCallback(
    async (value: string) => {
      setPopoverOpen(false);
      if (useCache) {
        const results = await searchFromCache(value);
        if (results.length === 1) handleCreate(results[0]);
        else setPopoverOpen(results.length > 0);
      } else {
        setServerSearch(value);
      }
    },
    [useCache, searchFromCache, handleCreate],
  );

  const createNewProduct = useCallback(() => {
    displayForm('create')({ name: '', quantity: 1, price: 1, id: uuidv4() });
    setActivePopup(true);
  }, [displayForm, setActivePopup]);

  useEffect(() => {
    if (!useCache && serverGoods) {
      serverGoods.length === 1
        ? handleCreate(serverGoods[0])
        : setPopoverOpen(serverGoods.length > 0);
    }
  }, [serverGoods, useCache, handleCreate]);

  const handleCheckboxClick = useCallback((checked: boolean) => {
    checked ? localStorage.setItem('highlight', 'true') : localStorage.setItem('highlight', '');
    setHighlightFunc(() => (checked ? highlightByAccount : undefined));
  }, []);

  if (isLoading) return 'Идет загрузка...';

  if (!inventoryList?.products) return 'Нет данных для отображения';

  const showPopover = popoverOpen && !activePopup && Boolean(goods?.length);

  return (
    <AsyncReduxComponent reducersList={reducers}>
      <Grid>
        <SearchInput
          ref={searchRef}
          onSearch={getGoods}
          loading={isFetching}
          autoFocusOnTyping
          popoverOpen={showPopover}
          onPopoverClose={() => setPopoverOpen(false)}
        >
          {showPopover && goods ? (
            <PopoverProductsList products={goods} onClick={handleCreate} />
          ) : null}
        </SearchInput>
        <div className={styles.controls}>
          <Checkbox
            text='Выделять поля с резервного аккаунта'
            name='tempAcc'
            onChange={handleCheckboxClick}
            defaultChecked={localStorage.getItem('highlight') === 'true'}
          />
          <Checkbox
            text='Поиск из кеша'
            name='useCache'
            onChange={handleCacheToggle}
            defaultChecked={useCache}
            className={styles.cacheCheckbox}
          />
          <SaveInventoryToXLSX inventoryList={inventoryList} className={styles.xlsx} />
          <Button onClick={createNewProduct}>Добавить товар</Button>
        </div>
        <h1>
          {`Инвентаризация № ${inventoryList.documentNumber} от `}
          {/* <FormatDate date={inventoryList.choosenDate} /> */}
          {` магазина ${inventoryList.storeName}`}
        </h1>
        <ScrollableBlock>
          <InventoryProductsTable
            highlightFunc={highlightFunc}
            inventoryList={inventoryList}
            onClick={displayForm('update')}
            onDelete={displayForm('delete')}
            tabIndex={activePopup ? -1 : 0}
          />
        </ScrollableBlock>
      </Grid>
      <PopupEditProductForm
        activePopup={activePopup}
        buttonClick={onSubmit}
        error={updateError}
        setActivePopup={setActivePopup}
        highlightFunc={highlightFunc}
      />
    </AsyncReduxComponent>
  );
});

InventoryEdit.displayName = 'inventoryEdit';
