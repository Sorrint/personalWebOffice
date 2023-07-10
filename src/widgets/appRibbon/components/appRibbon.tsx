import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { type INavLinkObject } from '@shared/types/navLinkTypes';

import './appRibbon.scss';

interface ILinksProps {
    navLinks: INavLinkObject
}

const AppRibbon: FC<ILinksProps> = ({ navLinks }) => {
    return (
        <div className="app__ribbon">
            {Object.keys(navLinks).map((link) => (
                <Link to={navLinks[link].path} key={link}>
                    <div className="content__button">{navLinks[link].title}</div>
                </Link>
            ))}
            <div className="fillElement"></div>
        </div>
    );
};

export default AppRibbon;
