import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';

import './tabs.scss';


interface CustomTab {
    contentTab: string
    to?: string
}

interface TabsProps {
    classname?: string
    list: CustomTab[]
}

export const Tabs = ({ list, classname } : TabsProps) => {
    const getMenuItemClass = ({ isActive } : {isActive: boolean}) : string => 
        isActive ? 'content__button active': 'content__button';

    const tabListClass = classNames('tabsList', classname);

    return (
        <Tab.Group>
            <Tab.List className={tabListClass}>
                {Object.values(list).map((item, idx) => (
                    <Tab as={Fragment} key={idx}>                        
                        {({ selected }) => (
                            item.to 
                                ? <NavLink to={item.to} className={
                                    getMenuItemClass
                                }>{item.contentTab}</NavLink>
                                : <button
                                    className={
                                        getMenuItemClass({isActive: selected})
                                    }
                                >
                                    {item.contentTab}
                                </button>
                        )}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>);
};