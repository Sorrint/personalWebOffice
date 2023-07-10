import { type FC } from 'react';

import './productsListHeader.scss';

interface ProductListHeaderProps {
    selectField: boolean
    avatar: boolean
    count: boolean
};

export const ProductListHeader: FC<ProductListHeaderProps> = ({ selectField, avatar, count }) => {
    return (
        <>
            <div className="products-list__header">
                {selectField && <div className="products-list__selectColumn"></div>}
                {avatar && <div className="products-list__avatarColumn"></div>}
                <div className="products-list__nameColumn">Наименование</div>
                <div className="products-list__priceColumn">Цена</div>
                {count && <div className="products-list__countColumn">Остаток</div>}
            </div>
        </>
    );
};
