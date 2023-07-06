import { type FC, useRef, useEffect } from 'react';
import ProductCard from '../productCard';
import { type IProductListContentProps } from './productList';
import handleListKeydownEvent from '@shared/lib/utils/handleListKeyboardEvents';
import { type IDreamkasProduct } from '@entities/products/model/interfaces/IDreamkasProduct';

interface IProductListBodyProps extends IProductListContentProps<IDreamkasProduct> {
    products: IDreamkasProduct[]
}

const ProductListBody: FC<IProductListBodyProps> = ({ products, parentRef, setFirstElement, ...rest }) => {
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

export default ProductListBody;
