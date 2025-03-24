import { Tabs } from '@shared/ui/Tabs';
import { NavLinkObject } from '@shared/types/navLinkTypes';
import styles from './HeaderTabs.module.scss';

interface AppRibbonProps {
  navLinks: NavLinkObject;
}

export const HeaderTabs = ({ navLinks }: AppRibbonProps) => {
  const tabs = Object.typedValues(navLinks).map(({ path, title }) => ({
    contentTab: title,
    to: path,
  }));
  return (
    <div className={styles.ribbon}>
      <Tabs list={tabs}></Tabs>
      <div className={styles['fill-element']}></div>
    </div>
  );
};
