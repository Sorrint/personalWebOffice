import { type IDreamkasProduct } from '@entities/products/model/types/IDreamkasProduct';
import { memo, type MutableRefObject } from 'react';
import { ProductListBody } from '../productsListBody/productListBody';
import { ProductListHeader } from '../productsListHeader/productListHeader';

import './productList.scss';

export interface IProductListContentProps<T> {
    selectField?: boolean
    avatar?: boolean
    count?: boolean
    onClick?: (product: T) => void
    parentRef?: MutableRefObject<HTMLInputElement | null>
    setFirstElement?: (el: HTMLDivElement) => void
}

interface ProductListProps extends IProductListContentProps<IDreamkasProduct> {
    products: IDreamkasProduct[]
    displayHeaders?: boolean
}

export const ProductList  = memo(({
    products,
    selectField = false,
    avatar = false,
    count = true,
    displayHeaders,
    ...rest
}: ProductListProps) => {
    return (
        <>
            {products.length > 0 && (
                <div className="products-list">
                    {displayHeaders ?? <ProductListHeader selectField={selectField} avatar={avatar} count={count} />}
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
});
