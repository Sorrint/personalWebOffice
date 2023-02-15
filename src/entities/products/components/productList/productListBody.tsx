import { FC } from 'react';
import { IProduct } from '../../model/IProducts';
import ProductCard from '../productCard';

interface IProductListBodyProps {
    products: IProduct[];
    selectField: boolean;
    avatar: boolean;
    count: boolean;
}

const ProductListBody: FC<IProductListBodyProps> = ({ products, selectField, avatar, count }) => {
    return (
        <>
            {products.map((item) => (
                <ProductCard product={item} key={item.id} selectField={selectField} avatar={avatar} count={count} />
            ))}
        </>
    );
};

export default ProductListBody;
