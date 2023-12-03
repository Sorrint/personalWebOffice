import { memo, type SyntheticEvent } from 'react';

import { type IInventoryProduct } from '../../model/types';
import { type InventoryContentProps} from '../inventoryContent/inventoryContent';

import './inventoryProductCard.scss';
export interface InventoryProductCardProps extends InventoryContentProps {
    product: IInventoryProduct
    itemNumber: number
}

export const InventoryProductCard = memo(({ product, itemNumber, tabIndex, onClick, onDelete }: InventoryProductCardProps) => {
    const { name, price, quantity } = product;

    const handleClick = (product: IInventoryProduct) => {
        if (onClick) onClick(product);
    };
    const handleDelete = (e: SyntheticEvent, product: IInventoryProduct) => {
        e.stopPropagation();
        if (onDelete) onDelete(product);
    };

    return (
        <div className="inventory-card" onClick={() => { handleClick(product); }} tabIndex={tabIndex}>
            <div className="inventory-card__number">{itemNumber}</div>
            <div className="inventory-card__title">{name}</div>
            <div className="inventory-card__quantity">{quantity}</div>
            <div className="inventory-card__price">{price?.toFixed(2)} ₽</div>
            <div className="inventory-card__sum">{price ? (price * quantity).toFixed(2) : 0} ₽</div>
            <div className="inventory-card__remove" onClick={(e) => { handleDelete(e, product); }}>
                x
            </div>
        </div>
    );
});
