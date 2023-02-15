import { FC } from 'react';
import { IProduct } from '../../model/IProducts';
import ProductListBody from './productListBody';
import ProductListHeader from './productListHeader';

interface IProductListProps {
    products: IProduct[];
    selectField?: boolean;
    avatar?: boolean;
    count?: boolean;
}

const ProductList: FC<IProductListProps> = ({ products, selectField = false, avatar = false, count = true }) => {
    return (
        <>
            {products.length > 0 && (
                <div className="products-list">
                    <ProductListHeader selectField={selectField} avatar={avatar} count={count} />
                    <ProductListBody products={products} avatar={avatar} selectField={selectField} count={count} />
                </div>
            )}
        </>
    );
};

export default ProductList;
