import { type IDreamkasProduct } from '@entities/products/model/interfaces/IDreamkasProduct';
import { type FC, type MutableRefObject } from 'react';
import { ProductListBody } from './productListBody';
import { ProductListHeader } from './productListHeader';

import './productList.scss';

export interface IProductListContentProps<T> {
    selectField?: boolean
    avatar?: boolean
    count?: boolean
    onClick?: (product: T) => void
    parentRef?: MutableRefObject<HTMLInputElement | null>
    setFirstElement?: (el: HTMLDivElement) => void
}

interface IProductListProps extends IProductListContentProps<IDreamkasProduct> {
    products: IDreamkasProduct[]
    displayHeaders?: boolean
}

export const ProductList: FC<IProductListProps> = ({
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
};
