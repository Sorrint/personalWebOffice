import { type INavLinkObject } from '@shared/types/navLinkTypes';
import { Tabs } from '@shared/ui/tabs';

import './appRibbon.scss';

interface AppRibbonProps {
    navLinks: INavLinkObject
}

export const AppRibbon = ({ navLinks }: AppRibbonProps) => {
    const tabs = Object.keys(navLinks).map(link => ({contentTab: navLinks[link].title}));
    return (
        <div className="app__ribbon">
            <Tabs list={tabs}></Tabs>
            <div className="fillElement"></div>
        </div>
    );
};