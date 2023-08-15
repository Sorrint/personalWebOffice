import { memo, useEffect } from 'react';
import './editProperty.scss';

interface EditPropertyFieldProps {
    propertyName: string
    renderEditField: () => JSX.Element
    className?: string
}

export const EditPropertyField = memo(({ propertyName, renderEditField, className }: EditPropertyFieldProps) => {
    useEffect(()=> {console.log('editProp render');}, []);
    return <div className={`property ${className ?? ''}`}>
        <div className='property__title'>{propertyName}</div>
        {renderEditField()}
    </div>;
});
