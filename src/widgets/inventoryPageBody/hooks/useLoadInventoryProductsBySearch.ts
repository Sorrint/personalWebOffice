import { useEffect, useState, useMemo } from 'react';
import { useLoadProductsBySearch } from '@entities/products';
import { useAppDispatch } from '@shared/lib/hooks';
import { tokenActions } from '@shared/lib/store';
import { transformProducts } from '../lib/helpers/transformProducts';

export const useLoadInventoryProductsBySearch = () => {
  const [search, setSearch] = useState<string>('');
  const [isActiveAccount, setIsActiveAccount] = useState(true);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const dispatch = useAppDispatch();
  const { setToken } = tokenActions;

  useEffect(() => {
    dispatch(setToken(null));
    setIsActiveAccount(true);
    setRequestCompleted(false);
  }, [search, dispatch, setToken]);

  const {
    data: goods,
    isFetching,
    refetch,
  } = useLoadProductsBySearch({ limit: 1000, q: search }, { pollingInterval: 0 });

  useEffect(() => {
    if (!isFetching && goods && goods.length === 0 && !requestCompleted) {
      const tempToken = localStorage.getItem('tempDreamToken');
      if (tempToken) {
        dispatch(setToken(tempToken));
        setIsActiveAccount(false);
        refetch();
        setRequestCompleted(true);
      }
    }
  }, [goods, isFetching, dispatch, setToken, refetch, requestCompleted]);

  const result = useMemo(() => transformProducts(goods), [goods]);

  return { goods: result, isFetching, setSearch, isActiveAccount };
};
