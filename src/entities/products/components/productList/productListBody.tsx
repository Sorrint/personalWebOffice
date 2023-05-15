import { FC, KeyboardEvent, useRef, useEffect } from 'react';
import { IProduct } from '../../model/IProduct';
import ProductCard from '../productCard';
import { IProductListContentProps } from './productList';
import handleListKeydownEvent from 'shared/lib/utils/handleListKeyboardEvents';

interface IProductListBodyProps extends IProductListContentProps {
    products: IProduct[];
}

const ProductListBody: FC<IProductListBodyProps> = ({ products, parentRef, setFirstElement, ...rest }) => {
    const listRefs = useRef<(HTMLDivElement | null)[]>([]);

    const addProductToRefList = (productRef: HTMLDivElement) => {
        listRefs.current?.push(productRef);
    };

    useEffect(() => {
        listRefs.current && listRefs.current[0] && setFirstElement && setFirstElement(listRefs.current[0]);
    }, []);

    const handleListRefsActions = handleListKeydownEvent(listRefs.current, parentRef ? parentRef : undefined);

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

export default ProductListBody;
