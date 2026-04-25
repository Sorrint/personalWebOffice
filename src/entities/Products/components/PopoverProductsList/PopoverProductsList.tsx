import { useRef, type KeyboardEvent } from 'react';
import classNames from 'classnames';
import styles from './PopoverProductsList.module.scss';
import { handleListKeydownEvent } from '@shared/lib/utils';
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
}
const PopoverProductsList = <T extends PopoverProduct>({
  products,
  className,
  onClick,
}: PopoverProductsListProps<T>) => {
  const listRefs = useRef<Array<HTMLDivElement | null>>([]);

  const addProductToRefList = (productRef: HTMLDivElement) => {
    listRefs.current?.push(productRef);
  };

  const handleListRefsActions = handleListKeydownEvent(listRefs.current);

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
          <div className={styles.price}>{product.price?.toFixed(2)}₽</div>
        </div>
      ))}
    </div>
  );
};
PopoverProductsList.displayName = 'PopoverProductsList';
export default typedMemo(PopoverProductsList);
