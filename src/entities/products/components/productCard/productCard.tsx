import { type FC, type KeyboardEvent } from 'react';

import { type IDreamkasProduct, type IProductStock } from '../../model/types/IDreamkasProduct';

import styles from './productCard.module.scss';
import { type IProductListContentProps } from '../productList/productList';

interface IProductCardProps extends IProductListContentProps<IDreamkasProduct> {
    product: IDreamkasProduct
    addProductRef?: (productRef: HTMLDivElement) => void
    onCardKeyDown?: (event: KeyboardEvent, onSubmit: (...args: any[]) => void) => void
}

export const ProductCard: FC<IProductCardProps> = ({
    product,
    selectField,
    avatar,
    count,
    onClick,
    addProductRef,
    onCardKeyDown
}) => {
    const { name, price, stock, type } = product;
    const getProductRest = (stock: IProductStock[] | null) => {
        if (stock) {
            const value = stock.reduce((result: number, item: IProductStock) => {
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

    const handleClick = (product: IDreamkasProduct) => {
        if (onClick) onClick(product);
    };

    return (
        <div
            className={styles['product-card']}
            onClick={() => { handleClick(product); }}
            ref={(r) => { r !== null && addProductRef && addProductRef(r); }}
            tabIndex={0}
            onKeyDown={(e: KeyboardEvent) => { if (onCardKeyDown) onCardKeyDown(e, () => { handleClick(product); }); }}
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
