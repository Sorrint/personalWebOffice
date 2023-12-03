import { type FC } from 'react';

import CategoryCard from '../categoryCard/categoryCard';
import { type IProductCategory } from '../../model/types/IDreamkasProduct';

interface ICategoriesListProps {
    categories: IProductCategory[]
}

export const CategoriesList: FC<ICategoriesListProps> = ({ categories }) => {
    return (
        <>
            {categories.map((item) => (
                <CategoryCard category={item} key={item.id} />
            ))}
        </>
    );
};
