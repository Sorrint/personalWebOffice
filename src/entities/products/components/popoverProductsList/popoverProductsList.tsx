import { type RefObject, useEffect, useRef, type KeyboardEvent } from 'react';
import classNames from 'classnames';
import styles from './popoverProductsList.module.scss';
import handleListKeydownEvent from '@shared/lib/utils/handleListKeyboardEvents';
import { typedMemo } from '@shared/lib/components';

interface PopoverProduct {
  id?: string;
  name: string;
  price: number | null;
}

interface PopoverProductsListProps<T extends PopoverProduct> {
  className?: string;
  products: T[];
  onClick?: (product: T) => void;
  parentRef?: RefObject<HTMLInputElement> | null;
  setFirstElement?: (el: HTMLDivElement) => void;
}
const PopoverProductsList = <T extends PopoverProduct>({
  products,
  className,
  onClick,
  parentRef,
  setFirstElement,
}: PopoverProductsListProps<T>) => {
  const listRefs = useRef<Array<HTMLDivElement | null>>([]);

  const addProductToRefList = (productRef: HTMLDivElement) => {
    listRefs.current?.push(productRef);
  };

  useEffect(() => {
    listRefs.current[0] && setFirstElement && setFirstElement(listRefs.current[0]);
  }, [setFirstElement]);

  const handleListRefsActions = handleListKeydownEvent(listRefs.current, parentRef ?? undefined);

  return (
    <div className={classNames(className)}>
      {products.map(product => (
        <div
          key={product.id}
          className={styles['product-card']}
          onClick={() => {
            onClick?.(product);
          }}
          ref={r => {
            r !== null && addProductToRefList(r);
          }}
          tabIndex={0}
          onKeyDown={(e: KeyboardEvent) => {
            handleListRefsActions(e, () => {
              onClick?.(product);
            });
          }}
        >
          <div className={styles.title}>{product.name}</div>
          <div className={styles.price}>{product.price ? product.price / 100 : 0},00 ₽</div>
        </div>
      ))}
    </div>
  );
};
PopoverProductsList.displayName = 'PopoverProductsList';
export default typedMemo(PopoverProductsList);
