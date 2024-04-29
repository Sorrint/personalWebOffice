import { type IInventoryProduct } from '@entities/inventoryDocs';
import { useEffect, useState } from 'react';

const highlightByAccount = (item: IInventoryProduct) => {
  return !item?.isActiveAccount;
};

export const useHighlightProduct = () => {
  const [highlightFunc, setHighlightFunc] = useState<
    ((item: IInventoryProduct) => boolean) | undefined
  >(undefined);

  useEffect(() => {
    const highlightOn = localStorage.getItem('highlight') === 'true';
    setHighlightFunc(() => (highlightOn ? highlightByAccount : undefined));
  }, []);
};
