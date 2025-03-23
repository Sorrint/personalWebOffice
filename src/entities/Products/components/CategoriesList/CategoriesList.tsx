import CategoryCard from '../CategoryCard/CategoryCard';
import { type IProductCategory } from '../../model/types/IDreamkasProduct';

interface ICategoriesListProps {
  categories: IProductCategory[];
}

export const CategoriesList = ({ categories }: ICategoriesListProps) => {
  return (
    <>
      {categories.map(item => (
        <CategoryCard category={item} key={item.id} />
      ))}
    </>
  );
};
