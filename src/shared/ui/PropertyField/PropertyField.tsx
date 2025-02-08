import { ReactNode, memo } from 'react';
import styles from './PropertyField.module.scss';
import classNames from 'classnames';

interface PropertyFieldProps {
  propertyName: string;
  className?: string;
  children: ReactNode;
}

export const PropertyField = memo(({ propertyName, children, className }: PropertyFieldProps) => {
  return (
    <div className={classNames(styles.property, className)}>
      <div className={styles.title}>{propertyName}</div>
      {children}
    </div>
  );
});

PropertyField.displayName = 'PropertyField';
