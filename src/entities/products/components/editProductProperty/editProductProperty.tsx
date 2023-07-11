import { type FC } from 'react';
import './editProductProperty.scss';

interface EditProductPropertyProps {
    propertyName: string
    renderEditField: () => JSX.Element
}

export const EditProductProperty: FC<EditProductPropertyProps> = ({ propertyName, renderEditField }) => {
    return <div className="productProperty">
        <div className='productProperty__title'>{propertyName}</div>
        {renderEditField()}
    </div>;
};
