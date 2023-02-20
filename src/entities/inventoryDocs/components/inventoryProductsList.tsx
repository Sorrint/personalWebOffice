import { FC } from 'react';
import InventoryProductCard from './inventoryProductCard';
import './inventoryList.scss';
import { IInventoryProduct } from '../model/types';
interface IInventoryProductListBodyProps {
    products: IInventoryProduct[];
    onClick?: (product: IInventoryProduct) => void;
}

const InventoryProductList: FC<IInventoryProductListBodyProps> = ({ products, onClick }) => {
    return (
        <>
            {products.map((item, index) => (
                <InventoryProductCard product={item} key={index} onClick={onClick} itemNumber={index + 1} />
            ))}
        </>
    );
};

export default InventoryProductList;
