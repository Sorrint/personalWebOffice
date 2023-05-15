import { FC } from 'react';

import { IProductCategory } from '../model/IProduct';

import './categoryStyles.scss';

interface ICategoryCardProps {
    category: IProductCategory;
}
const CategoryCard: FC<ICategoryCardProps> = ({ category }) => {
    const { name, productCount } = category;
    return (
        <div className="category-card">
            <div className="category-card__title">{name}</div>
            <div className="category-card__count">{productCount}</div>
        </div>
    );
};

export default CategoryCard;
