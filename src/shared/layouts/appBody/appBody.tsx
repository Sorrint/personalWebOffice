import { type ReactNode } from 'react';
import { Container } from '../container/container';
import style from './appBody.module.scss';
interface AppBodyProps {
  children: ReactNode;
  withoutContainer?: boolean;
}

export const AppBody = ({ children, withoutContainer }: AppBodyProps) => {
  return (
    <div className={style.component}>
      {withoutContainer
        ? children
        : <Container>{children}</Container>}
    </div>
  );
};