import { type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { type INavLinkObject } from '@shared/types/navLinkTypes';

import './appRibbon.scss';

interface ILinksProps {
    navLinks: INavLinkObject
}

export const AppRibbon: FC<ILinksProps> = ({ navLinks }) => {

    const getMenuItemClass = ({ isActive }: {isActive: boolean}): string => 
        isActive ? 'content__button active': 'content__button';
      
    return (
        <div className="app__ribbon">
            {Object.keys(navLinks).map((link) => (
                <NavLink to={navLinks[link].path} key={link} className={getMenuItemClass}>
                    <div className="content__button">{navLinks[link].title}</div>
                </NavLink>
            ))}
            <div className="fillElement"></div>
        </div>
    );
};

