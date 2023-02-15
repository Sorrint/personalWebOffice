import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductList, productsAPI } from '../../../entities/products';
import SearchInput from '../../../features/search/searchInput';
import './acceptanceDocs.scss';

const SearchGoods: FC = () => {
    const [search, setSearch] = useState<string>('');
    const { data: goods, isLoading: goodsLoading } = productsAPI.useLoadProductBySearchQuery(
        { limit: 1000, q: search },
        { selectFromResult: ({ data, isLoading }) => ({ data: data?.products, isLoading }) }
    );

    const getGoods = async (value: string) => {
        setSearch(value);
    };

    if (goodsLoading) return <h1>Идет загрузка</h1>;
    return (
        <>
            <div className="input-area">
                <SearchInput searchFunction={getGoods} />
                <Link to={'./create'}>Новый документ</Link>
            </div>
            {goods && <ProductList products={goods} selectField={false} avatar={false} count={false} />}
        </>
    );
};

export default SearchGoods;
