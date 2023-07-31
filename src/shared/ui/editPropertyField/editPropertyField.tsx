import { type FC } from 'react';
import './editProperty.scss';

interface EditPropertyFieldProps {
    propertyName: string
    renderEditField: () => JSX.Element
    className?: string
}

export const EditPropertyField: FC<EditPropertyFieldProps> = ({ propertyName, renderEditField, className }) => {
    return <div className={`property ${className ?? ''}`}>
        <div className='property__title'>{propertyName}</div>
        {renderEditField()}
    </div>;
};
