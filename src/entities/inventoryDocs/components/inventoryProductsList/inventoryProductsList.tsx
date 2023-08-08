import {memo} from 'react';
import { InventoryProductCard } from '../inventoryProductCard/inventoryProductCard';
import { type IInventoryProduct } from '../../model/types';
import { type InventoryContentProps } from '../inventoryContent/inventoryContent';

export interface InventoryProductListBodyProps extends InventoryContentProps {
    products: IInventoryProduct[]
}

export const InventoryProductList = memo(({ products, tabIndex, onClick, onDelete }: InventoryProductListBodyProps) => {
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
});
