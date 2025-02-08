import { Tabs } from '@shared/ui/tabs';
import { INavLinkObject } from '@shared/types/navLinkTypes';
import styles from './headerTabs.module.scss';

interface AppRibbonProps {
  navLinks: INavLinkObject;
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
