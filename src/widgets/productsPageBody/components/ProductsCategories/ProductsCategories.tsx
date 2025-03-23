import { useState } from 'react';
import { ProductList, useLoadProductsBySearch } from '@entities/products';
import { SearchInput } from '@shared/ui/SearchInput';
import { AllCategoriesList } from './components/AllCategoriesList';
import { SearchCategoriesList } from './components/SearchCategoriesList';

const ProductsCategories = () => {
  const [search, setSearch] = useState<string>('');
  const { data: products, isLoading: productsLoading } = useLoadProductsBySearch({
    limit: 1000,
    q: search,
  });

  const getProducts = async (value: string) => {
    setSearch(value);
  };

  if (productsLoading) return <h1>Идет загрузка</h1>;
  return (
    <>
      <SearchInput searchFunction={getProducts} />
      {search ? <SearchCategoriesList search={search} /> : <AllCategoriesList />}
      {products && (
        <ProductList
          products={products}
          selectField={false}
          avatar={false}
          displayHeaders={false}
        />
      )}
    </>
  );
};

export default ProductsCategories;
