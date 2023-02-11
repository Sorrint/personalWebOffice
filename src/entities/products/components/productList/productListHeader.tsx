import { FC } from 'react';

interface ProductListHeaderProps {
    selectField: boolean;
    avatar: boolean;
}

const ProductListHeader: FC<ProductListHeaderProps> = ({ selectField, avatar }) => {
    return (
        <>
            <div className="products-list__header">
                {selectField && <div className="products-list__selectColumn"></div>}
                {avatar && <div className="products-list__avatarColumn"></div>}
                <div className="products-list__nameColumn">Наименование</div>
                <div className="products-list__priceColumn">Цена</div>
                <div className="products-list__countColumn">Остаток</div>
            </div>
        </>
    );
};

export default ProductListHeader;
