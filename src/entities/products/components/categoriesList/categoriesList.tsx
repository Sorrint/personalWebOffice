import { FC } from 'react';

import CategoryCard from '../categoryCard';
import { IProductCategory } from '../../model/interfaces/IDreamkasProduct';

interface ICategoriesListProps {
    categories: IProductCategory[];
}

const CategoriesList: FC<ICategoriesListProps> = ({ categories }) => {
    return (
        <>
            {categories.map((item) => (
                <CategoryCard category={item} key={item.id} />
            ))}
        </>
    );
};

export default CategoriesList;
