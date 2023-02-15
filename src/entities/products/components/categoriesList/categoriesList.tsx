import { FC } from 'react';
import { IProductCategory } from '../../model/IProducts';
import CategoryCard from '../categoryCard';

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
