import { type ReactNode, memo } from 'react';
import styles from './ErrorField.module.scss';
import classNames from 'classnames';

interface ErrorFieldProps {
  className?: string;
  children: string | ReactNode;
}
export const ErrorField = memo(({ children, className }: ErrorFieldProps) => {
  if (!children) return null;

  const errorStyle = classNames(styles.error, className);
  return <small className={errorStyle}>{children}</small>;
});

ErrorField.displayName = 'ErrorField';
