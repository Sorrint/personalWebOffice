import { FC, MutableRefObject } from 'react';
import { IProduct } from '../../model/interfaces/IDreamkasProduct';
import ProductListBody from './productListBody';
import ProductListHeader from './productListHeader';

export interface IProductListContentProps {
    selectField?: boolean;
    avatar?: boolean;
    count?: boolean;
    onClick?: (product: IProduct) => void;
    parentRef?: MutableRefObject<HTMLInputElement | null>;
    setFirstElement?: (el: HTMLDivElement) => void;
}

interface IProductListProps extends IProductListContentProps {
    products: IProduct[];
    displayHeaders?: boolean;
}

const ProductList: FC<IProductListProps> = ({
    products,
    selectField = false,
    avatar = false,
    count = true,
    displayHeaders,
    ...rest
}) => {
    return (
        <>
            {products.length > 0 && (
                <div className="products-list">
                    {displayHeaders && <ProductListHeader selectField={selectField} avatar={avatar} count={count} />}
                    <ProductListBody
                        products={products}
                        avatar={avatar}
                        selectField={selectField}
                        count={count}
                        {...rest}
                    />
                </div>
            )}
        </>
    );
};

export default ProductList;
