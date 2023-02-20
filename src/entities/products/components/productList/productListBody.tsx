import { FC } from 'react';
import { IProduct } from '../../model/IProducts';
import ProductCard from '../productCard';

interface IProductListBodyProps {
    products: IProduct[];
    selectField: boolean;
    avatar: boolean;
    count: boolean;
    onClick?: (product: IProduct) => void;
}

const ProductListBody: FC<IProductListBodyProps> = ({ products, selectField, avatar, count, onClick }) => {
    return (
        <>
            {products.map((item) => (
                <ProductCard
                    product={item}
                    key={item.id}
                    selectField={selectField}
                    avatar={avatar}
                    count={count}
                    onClick={onClick}
                />
            ))}
        </>
    );
};

export default ProductListBody;
