import { FC, useState } from 'react';
import SearchInput from '../../../features/search/searchInput';
import axios from 'axios';
import { IProduct, IProductCategory, IProductQueryTrace } from '../../../entities/products/model/IProducts';
import ProductList from '../../../entities/products/components/productList';

interface ISearchResult {
    categories: IProductCategory[];
    products: IProduct[];
    _queryTrace: IProductQueryTrace[];
}

const AcceptanceDocs: FC = () => {
    const [goods, setGoods] = useState<IProduct[]>([]);
    const getGoods = async (value: string): Promise<ISearchResult> => {
        const { data } = await axios.get<ISearchResult>(
            `http://localhost:3000/dreamkass/search?q=${encodeURI(value)}&limit=1000`
        );
        if (data.products.length > 0) setGoods(data.products);
        return data;
    };
    return (
        <>
            <h1>Нет документов</h1>
            <SearchInput searchFunction={getGoods} />
            <ProductList products={goods} selectField={true} avatar={false} />
        </>
    );
};

export default AcceptanceDocs;
