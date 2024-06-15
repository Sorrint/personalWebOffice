import { type ReactNode } from 'react';
import { Container } from '../container/container';
import style from './appBody.module.scss';
interface AppBodyProps {
  children: ReactNode;
  withoutContainer?: boolean;
}

export const AppBody = ({ children }: AppBodyProps) => {
  return (
    <div className={style.component}>
      {<Container classname={style.component}>{children}</Container>}
    </div>
  );
};
