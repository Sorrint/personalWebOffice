import { FC, useState } from 'react';

import { CategoriesList, ProductList, productsAPI } from 'entities/products';
import SearchInput from 'features/search';

const GoodsSearchList: FC = () => {
    const [search, setSearch] = useState<string>('');
    const { data: goods, isLoading: goodsLoading } = productsAPI.useLoadProductBySearchQuery({
        limit: 1000,
        q: search
    });

    const { data: categories, isLoading: categoriesLoading } = search
        ? productsAPI.useLoadCategoriesBySearchQuery({ limit: 1000, q: search })
        : productsAPI.useLoadProductsCategoriesQuery({ limit: 1000, q: '' });

    const getGoods = async (value: string) => {
        setSearch(value);
    };

    if (goodsLoading || categoriesLoading) return <h1>Идет загрузка</h1>;
    return (
        <>
            <SearchInput searchFunction={getGoods} />
            {categories && <CategoriesList categories={categories} />}
            {goods && <ProductList products={goods} selectField={false} avatar={false} displayHeaders={false} />}
        </>
    );
};

export default GoodsSearchList;
