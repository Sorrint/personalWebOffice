import { type ReactNode } from 'react';

import styles from './appLayout.module.scss';
import { Grid } from '@shared/ui/grid';

interface LayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
  isSidebarOpen?: boolean;
  closeSidebar?: () => void;
}

export const AppLayout = ({
  header,
  sidebar,
  children,
  closeSidebar,
  isSidebarOpen,
}: LayoutProps) => {
  return (
    <Grid columns={'254px 1fr'}>
      {header}
      {/* <div className={styles.app__wrapper}> */}
        {sidebar}
        <div className={isSidebarOpen ? styles.backdrop : ''} onClick={() => closeSidebar?.()} />
        <div className={styles.app__content}>{children}</div>
      {/* </div> */}
    </Grid>
  );
};
