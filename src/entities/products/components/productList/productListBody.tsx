import { FC } from 'react';
import { IProduct } from '../../model/IProducts';
import ProductCard from '../productCard';

interface IProductListBodyProps {
    products: IProduct[];
    selectField: boolean;
    avatar: boolean;
}

const ProductListBody: FC<IProductListBodyProps> = ({ products, selectField, avatar }) => {
    return (
        <>
            {products.map((item) => (
                <ProductCard product={item} key={item.id} selectField={selectField} avatar={avatar} />
            ))}
        </>
    );
};

export default ProductListBody;
