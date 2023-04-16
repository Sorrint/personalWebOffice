import { FC } from 'react';

import InventoryProductCard from './inventoryProductCard';
import { IInventoryProduct } from '../model/types';

import './inventoryList.scss';

interface IInventoryProductListBodyProps {
    products: IInventoryProduct[];
    onClick?: (product: IInventoryProduct) => void;
    onDelete?: (product: IInventoryProduct) => void;
    tabIndex?: number;
}

const InventoryProductList: FC<IInventoryProductListBodyProps> = ({ products, tabIndex, onClick, onDelete }) => {
    return (
        <>
            {products.map((item, index) => (
                <InventoryProductCard
                    product={item}
                    key={index}
                    onClick={onClick}
                    itemNumber={index + 1}
                    onDelete={onDelete}
                    tabIndex={tabIndex}
                />
            ))}
        </>
    );
};

export default InventoryProductList;
