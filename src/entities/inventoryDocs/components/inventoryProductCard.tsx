import { FC, SyntheticEvent } from 'react';
import { IInventoryProduct } from '../model/types';
interface IInventoryProductCardProps {
    product: IInventoryProduct;
    itemNumber: number;
    onClick?: (product: IInventoryProduct) => void;
    onDelete?: (product: IInventoryProduct) => void;
}

const InventoryProductCard: FC<IInventoryProductCardProps> = ({ product, itemNumber, onClick, onDelete }) => {
    const { name, price, quantity } = product;

    const handleClick = (product: IInventoryProduct) => {
        onClick && onClick(product);
    };
    const handleDelete = (e: SyntheticEvent, product: IInventoryProduct) => {
        // console.log()
        e.stopPropagation();
        onDelete && onDelete(product);
    };

    return (
        <div className="product-card" onClick={() => handleClick(product)}>
            <div className="product-card__number">{itemNumber}</div>
            <div className="product-card__title">{name}</div>
            <div className="product-card__quantity">{quantity}</div>
            <div className="product-card__price">{price},00 ₽</div>
            <div className="product-card__sum">{price ? price * quantity : 0},00 ₽</div>
            <div className="product-card__remove" onClick={(e) => handleDelete(e, product)}>
                x
            </div>
        </div>
    );
};

export default InventoryProductCard;
