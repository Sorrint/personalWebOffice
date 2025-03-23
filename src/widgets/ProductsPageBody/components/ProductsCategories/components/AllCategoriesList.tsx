import { CategoriesList, useLoadProductsCategories } from '@entities/Products';

export const AllCategoriesList = () => {
  const { data: categories, isLoading: categoriesLoading } = useLoadProductsCategories({
    limit: 1000,
    q: '',
  });

  if (categoriesLoading) return <h1>Идет загрузка</h1>;
  return <>{categories && <CategoriesList categories={categories} />}</>;
};
