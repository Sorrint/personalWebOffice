import { type KeyboardEvent } from 'react';

import { type DreamkasProduct, type ProductStock } from '../../model/types/DreamkasProduct';

import styles from './ProductCard.module.scss';
import { type ProductListContentProps } from '../ProductList/ProductList';

interface ProductCardProps extends ProductListContentProps<DreamkasProduct> {
  product: DreamkasProduct;
  addProductRef?: (productRef: HTMLDivElement) => void;
  onCardKeyDown?: (event: KeyboardEvent, onSubmit: (product: DreamkasProduct) => void) => void;
}

export const ProductCard = ({
  product,
  selectField,
  avatar,
  count,
  onClick,
  addProductRef,
  onCardKeyDown,
}: ProductCardProps) => {
  const { name, price, stock, type } = product;
  const getProductRest = (stock: ProductStock[] | null) => {
    if (stock) {
      const value = stock.reduce((result: number, item: ProductStock) => {
        result += Number(item[1]) / 1000;
        return result;
      }, 0);
      return value;
    }
    return 0;
  };

  const getProductType = (string: string) => {
    switch (string) {
      case 'COUNTABLE':
      case 'ALCOHOL':
        return 'шт.';
      case 'SCALABLE':
        return 'кг';
      default:
    }
  };

  const handleClick = (product: DreamkasProduct) => {
    if (onClick) onClick(product);
  };

  return (
    <div
      className={styles['product-card']}
      onClick={() => {
        handleClick(product);
      }}
      ref={r => {
        r !== null && addProductRef && addProductRef(r);
      }}
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => {
        if (onCardKeyDown)
          onCardKeyDown(e, () => {
            handleClick(product);
          });
      }}
    >
      {selectField && <div className={styles['select-field']}></div>}
      {avatar && <div className={styles.avatar}></div>}
      <div className={styles.title}>{name}</div>
      <div className={styles.price}>{price ? price / 100 : 0},00 ₽</div>
      {count && (
        <div className={styles.count}>
          {getProductRest(stock)} {getProductType(type)}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
