import { type FC, useState } from 'react';

import { CategoriesList, ProductList, useLoadCategoriesBySearch, useLoadProductsBySearch, useLoadProductsCategories } from '@entities/products';
import { SearchInput } from '@shared/ui/searchInput';

const ProductsCategories: FC = () => {
    const [search, setSearch] = useState<string>('');
    const { data: products, isLoading: productsLoading } = useLoadProductsBySearch({
        limit: 1000,
        q: search
    });

    const { data: categories, isLoading: categoriesLoading } = search
        ? useLoadCategoriesBySearch({ limit: 1000, q: search })
        : useLoadProductsCategories({ limit: 1000, q: '' });

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
