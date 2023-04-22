import { FC, KeyboardEvent, MutableRefObject, useRef } from 'react';
import { IProduct } from '../../model/IProducts';
import ProductCard from '../productCard';
import { IProductListContentProps } from './productList';

interface IProductListBodyProps extends IProductListContentProps {
    products: IProduct[];
    listRefs?: MutableRefObject<(HTMLDivElement | null)[]>;
}

const ProductListBody: FC<IProductListBodyProps> = ({ products, listRefs, ...rest }) => {
    const handleCardKeyDown = (refsArray: (HTMLDivElement | null)[]) => (event: KeyboardEvent) => {
        const currentFocusIndex = refsArray.indexOf(event.target as HTMLDivElement);
        const nextElement = refsArray[currentFocusIndex + 1];
        const prevElement = refsArray[currentFocusIndex - 1];
        if (event.code === 'ArrowDown') {
            nextElement && nextElement !== refsArray[0] && nextElement.focus();
        }
        if (event.code === 'ArrowUp') {
            prevElement && prevElement.focus();
        }
    };
    const handleListRefsActions =
        listRefs && listRefs.current.length > 1 ? handleCardKeyDown(listRefs.current) : undefined;
    return (
        <>
            {products.map((item) => (
                <ProductCard product={item} key={item.id} {...rest} onCardKeyDown={handleListRefsActions} />
            ))}
        </>
    );
};

export default ProductListBody;
