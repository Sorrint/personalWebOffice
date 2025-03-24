import { type ProductCategory } from '../../model/types/DreamkasProduct';

import './CategoryStyles.scss';

interface CategoryCardProps {
  category: ProductCategory;
}
export const CategoryCard = ({ category }: CategoryCardProps) => {
  const { name, productCount } = category;
  return (
    <div className='category-card'>
      <div className='category-card__title'>{name}</div>
      <div className='category-card__count'>{productCount}</div>
    </div>
  );
};

export default CategoryCard;
