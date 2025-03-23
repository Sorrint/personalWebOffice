import { type IProductCategory } from '../../model/types/IDreamkasProduct';

import './CategoryStyles.scss';

interface ICategoryCardProps {
  category: IProductCategory;
}
export const CategoryCard = ({ category }: ICategoryCardProps) => {
  const { name, productCount } = category;
  return (
    <div className='category-card'>
      <div className='category-card__title'>{name}</div>
      <div className='category-card__count'>{productCount}</div>
    </div>
  );
};

export default CategoryCard;
