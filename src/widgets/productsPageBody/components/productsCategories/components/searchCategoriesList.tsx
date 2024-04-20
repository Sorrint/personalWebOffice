import { CategoriesList, useLoadCategoriesBySearch } from '@entities/products';

interface SearchCategoriesListProps {
  search: string;
}
export const SearchCategoriesList = ({ search }: SearchCategoriesListProps) => {
  const { data: categories, isLoading: categoriesLoading } = useLoadCategoriesBySearch({
    limit: 1000,
    q: search,
  });

  if (categoriesLoading) return <h1>Идет загрузка</h1>;
  return <>{categories && <CategoriesList categories={categories} />}</>;
};
