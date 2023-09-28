import { type ReactNode } from 'react';
import './editProductProperty.scss';

interface EditProductPropertyProps {
    propertyName: string
    children: ReactNode
}

export const EditProductProperty = ({ propertyName, children }: EditProductPropertyProps) => {
    return <div className="productProperty">
        <div className='productProperty__title'>{propertyName}</div>
        {children}
    </div>;
};
