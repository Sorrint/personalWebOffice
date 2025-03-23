import { type ReactNode } from 'react';
import { AppLink } from '../AppLink';
import { Button, type ButtonProps } from '../Button';
import styles from './LinkButton.module.scss';

interface LinkButtonProps extends ButtonProps {
  href: string;
  children?: ReactNode;
}
export const LinkButton = ({ href, children, ...buttonProps }: LinkButtonProps) => {
  return (
    <Button {...buttonProps} className={styles.btn}>
      <AppLink to={href} className={styles.link} />
      {children}
    </Button>
  );
};
