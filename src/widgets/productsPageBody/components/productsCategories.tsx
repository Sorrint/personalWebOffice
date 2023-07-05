import { FC, useEffect, useState } from 'react';

import { CategoriesList, ProductList, productsAPI } from '@entities/products';
import SearchInput from '@features/search';

const ProductsCategories: FC = () => {
    const [search, setSearch] = useState<string>('');
    const { data: products, isLoading: productsLoading } = productsAPI.useLoadProductBySearchQuery({
        limit: 1000,
        q: search
    });

    const { data: categories, isLoading: categoriesLoading } = search
        ? productsAPI.useLoadCategoriesBySearchQuery({ limit: 1000, q: search })
        : productsAPI.useLoadProductsCategoriesQuery({ limit: 1000, q: '' });

    const getProducts = async (value: string) => {
        setSearch(value);
    };

    if (productsLoading || categoriesLoading) return <h1>Идет загрузка</h1>;
    return (
        <>
            <SearchInput searchFunction={getProducts} />
            {categories && <CategoriesList categories={categories} />}
            {products && <ProductList products={products} selectField={false} avatar={false} displayHeaders={false} />}
        </>
    );
};

export default ProductsCategories;
