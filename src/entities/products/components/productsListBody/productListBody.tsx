import { type FC, useRef, useEffect } from 'react';

import handleListKeydownEvent from '@shared/lib/utils/handleListKeyboardEvents';

import { type IProductListContentProps } from '../productList/productList';
import { type IDreamkasProduct } from '../../model/types/IDreamkasProduct';
import ProductCard from '../productCard/productCard';

interface IProductListBodyProps extends IProductListContentProps<IDreamkasProduct> {
    products: IDreamkasProduct[]
}

export const ProductListBody: FC<IProductListBodyProps> = ({ products, parentRef, setFirstElement, ...rest }) => {
    const listRefs = useRef<Array<HTMLDivElement | null>>([]);

    const addProductToRefList = (productRef: HTMLDivElement) => {
        listRefs.current?.push(productRef);
    };

    useEffect(() => {
        listRefs.current[0] && setFirstElement && setFirstElement(listRefs.current[0]);
    }, []);

    const handleListRefsActions = handleListKeydownEvent(listRefs.current, parentRef ?? undefined);

    return (
        <>
            {products.map((item) => (
                <ProductCard
                    product={item}
                    key={item.id}
                    {...rest}
                    onCardKeyDown={handleListRefsActions}
                    addProductRef={addProductToRefList}
                />
            ))}
        </>
    );
};
