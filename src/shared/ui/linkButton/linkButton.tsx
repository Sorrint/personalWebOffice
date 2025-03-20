import { type ReactNode } from 'react';
import { AppLink } from '../appLink';
import { Button, type ButtonProps } from '../button';
import styles from './linkButton.module.scss';

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
