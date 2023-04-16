import { FC } from 'react';

import { IProduct, IProductStock } from '../model/IProducts';

import './productStyles.scss';

interface IProductCardProps {
    product: IProduct;
    selectField?: boolean;
    avatar?: boolean;
    count?: boolean;
    onClick?: (product: IProduct) => void;
}

const ProductCard: FC<IProductCardProps> = ({ product, selectField, avatar, count, onClick }) => {
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

    const handleClick = (product: IProduct) => {
        onClick && onClick(product);
    };

    return (
        <div className="product-card" onClick={() => handleClick(product)}>
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
