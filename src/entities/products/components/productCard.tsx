import { FC, KeyboardEvent } from 'react';

import {  IDreamkasProduct, IProductStock } from '../model/interfaces/IDreamkasProduct';

import './productStyles.scss';
import { IProductListContentProps } from './productList/productList';

interface IProductCardProps extends IProductListContentProps {
    product: IDreamkasProduct;
    addProductRef?: (productRef: HTMLDivElement) => void;
    onCardKeyDown?: (event: KeyboardEvent, onSubmit: (...args: any[]) => void) => void;
}

const ProductCard: FC<IProductCardProps> = ({
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
                return;
        }
    };

    const handleClick = (product: IDreamkasProduct) => {
        onClick && onClick(product);
    };

    return (
        <div
            className="product-card"
            onClick={() => handleClick(product)}
            ref={(r) => r !== null && addProductRef && addProductRef(r)}
            tabIndex={0}
            onKeyDown={(e: KeyboardEvent) => onCardKeyDown && onCardKeyDown(e, () => handleClick(product))}
        >
            {selectField && <div className="product-card__selectField"></div>}
            {avatar && <div className="product-card__avatar"></div>}
            <div className="product-card__title">{name}</div>
            <div className="product-card__price">{price ? price / 100 : 0},00 ₽</div>
            {count && (
                <div className="product-card__count">
                    {getProductRest(stock)} {getProductType(type)}
                </div>
            )}
        </div>
    );
};

export default ProductCard;
