import { FC, useState } from 'react';

import { CategoriesList, ProductList, productsAPI } from 'entities/products';
// import SearchInput from '../../../features/search/searchInput';

const GoodsSearchList: FC = () => {
    const [search, setSearch] = useState<string>('');
    const { data: goods, isLoading: goodsLoading } = productsAPI.useLoadProductBySearchQuery(
        { limit: 1000, q: search },
        { selectFromResult: ({ data, isLoading }) => ({ data: data?.products, isLoading }) }
    );

    const { data: categories, isLoading: categoriesLoading } = search
        ? productsAPI.useLoadProductBySearchQuery(
              { limit: 1000, q: search },
              { selectFromResult: ({ data, isLoading }) => ({ data: data?.categories, isLoading }) }
          )
        : productsAPI.useLoadProductsCategoriesQuery(
              { limit: 1000, q: '' },
              { selectFromResult: ({ data, isLoading }) => ({ data: data?.categories, isLoading }) }
          );

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
