import { type ReactNode } from 'react';
import { Container } from '../container/container';
import style from './AppBody.module.scss';
interface AppBodyProps {
  children: ReactNode;
  withoutContainer?: boolean;
}

export const AppBody = ({ children }: AppBodyProps) => {
  return <Container className={style.component}>{children}</Container>;
};
