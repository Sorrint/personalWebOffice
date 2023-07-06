import { type FC, type SyntheticEvent } from 'react';

import { type IInventoryProduct } from '../model/types';
import { type IInventoryContent } from './inventoryContent';

export interface IInventoryProductCardProps extends IInventoryContent {
    product: IInventoryProduct
    itemNumber: number
}

const InventoryProductCard: FC<IInventoryProductCardProps> = ({ product, itemNumber, tabIndex, onClick, onDelete }) => {
    const { name, price, quantity } = product;

    const handleClick = (product: IInventoryProduct) => {
        if (onClick) onClick(product);
    };
    const handleDelete = (e: SyntheticEvent, product: IInventoryProduct) => {
        e.stopPropagation();
        if (onDelete) onDelete(product);
    };

    return (
        <div className="product-card" onClick={() => { handleClick(product); }} tabIndex={tabIndex}>
            <div className="product-card__number">{itemNumber}</div>
            <div className="product-card__title">{name}</div>
            <div className="product-card__quantity">{quantity}</div>
            <div className="product-card__price">{price?.toFixed(2)} ₽</div>
            <div className="product-card__sum">{price ? (price * quantity).toFixed(2) : 0} ₽</div>
            <div className="product-card__remove" onClick={(e) => { handleDelete(e, product); }}>
                x
            </div>
        </div>
    );
};

export default InventoryProductCard;
