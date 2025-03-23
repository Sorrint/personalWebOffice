import { type FC, useRef, useEffect } from 'react';

import { handleListKeydownEvent } from '@shared/lib/utils';

import { type IProductListContentProps } from '../ProductList/ProductList';
import { type IDreamkasProduct } from '../../model/types/IDreamkasProduct';
import { ProductCard } from '../ProductCard/ProductCard';

interface IProductListBodyProps extends IProductListContentProps<IDreamkasProduct> {
  products: IDreamkasProduct[];
}

export const ProductListBody: FC<IProductListBodyProps> = ({
  products,
  parentRef,
  setFirstElement,
  ...rest
}) => {
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
