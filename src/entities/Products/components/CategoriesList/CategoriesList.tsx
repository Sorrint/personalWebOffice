import CategoryCard from '../CategoryCard/CategoryCard';
import { type ProductCategory } from '../../model/types/DreamkasProduct';

interface CategoriesListProps {
  categories: ProductCategory[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <>
      {categories.map(item => (
        <CategoryCard category={item} key={item.id} />
      ))}
    </>
  );
};
