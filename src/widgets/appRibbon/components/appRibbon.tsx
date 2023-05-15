import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { INavLinkObject } from 'shared/ui/navLink/navLinkTypes';

import './appRibbon.scss';

interface ILinksProps {
    navLinks: INavLinkObject;
}

const AppRibbon: FC<ILinksProps> = ({ navLinks }) => {
    //  const isGoods = useSelector(getGoodsListStatus());

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
