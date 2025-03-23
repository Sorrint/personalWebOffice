import { type ReactNode } from 'react';
import styles from './EditProductProperty.module.scss';

interface EditProductPropertyProps {
  propertyName: string;
  children: ReactNode;
}

export const EditProductProperty = ({ propertyName, children }: EditProductPropertyProps) => {
  return (
    <div className={styles.property}>
      <div className={styles.title}>{propertyName}</div>
      {children}
    </div>
  );
};
