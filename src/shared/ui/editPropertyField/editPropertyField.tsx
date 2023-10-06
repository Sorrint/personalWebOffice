import { memo } from 'react';
import './editProperty.scss';

interface EditPropertyFieldProps {
    propertyName: string
    renderEditField: () => JSX.Element
    className?: string
}

export const EditPropertyField = memo(({ propertyName, renderEditField, className }: EditPropertyFieldProps) => {
    return <div className={`property ${className ?? ''}`}>
        <div className='property__title'>{propertyName}</div>
        {renderEditField()}
    </div>;
});
