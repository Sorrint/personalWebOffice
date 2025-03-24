import { type NavLinkObject } from '@shared/types/navLinkTypes';
import { Tabs } from '@shared/ui/Tabs';

import styles from './AppRibbon.module.scss';

interface AppRibbonProps {
  navLinks: NavLinkObject;
}

export const AppRibbon = ({ navLinks }: AppRibbonProps) => {
  const tabs = Object.keys(navLinks).map(link => ({
    contentTab: navLinks[link].title,
    to: navLinks[link].path,
  }));
  return (
    <div className={styles.ribbon}>
      <Tabs list={tabs}></Tabs>
      <div className={styles['fill-element']}></div>
    </div>
  );
};
