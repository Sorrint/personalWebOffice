import { type FC } from 'react';

import InventoryProductCard from './inventoryProductCard';
import { type IInventoryProduct } from '../model/types';

import './inventoryList.scss';
import { type IInventoryContent } from './inventoryContent';

export interface IInventoryProductListBodyProps extends IInventoryContent {
    products: IInventoryProduct[]
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
