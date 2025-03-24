import { useRef, useEffect } from 'react';

import { handleListKeydownEvent } from '@shared/lib/utils';

import { type ProductListContentProps } from '../ProductList/ProductList';
import { type DreamkasProduct } from '../../model/types/DreamkasProduct';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductListBodyProps extends ProductListContentProps<DreamkasProduct> {
  products: DreamkasProduct[];
}

export const ProductListBody = ({
  products,
  parentRef,
  setFirstElement,
  ...rest
}: ProductListBodyProps) => {
  const listRefs = useRef<Array<HTMLDivElement | null>>([]);

  const addProductToRefList = (productRef: HTMLDivElement) => {
    listRefs.current?.push(productRef);
  };

  useEffect(() => {
    listRefs.current[0] && setFirstElement && setFirstElement(listRefs.current[0]);
  }, [setFirstElement]);

  const handleListRefsActions = handleListKeydownEvent(listRefs.current, parentRef ?? undefined);

  return (
    <>
      {products.map(item => (
        <ProductCard
          product={item}
          key={item.id}
          {...rest}
          onCardKeyDown={handleListRefsActions}
          addProductRef={addProductToRefList}
        />
      ))}
    </>
  );
};
