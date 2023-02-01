import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Order from '../../ui/order/order.jsx';

const AppRibbon = ({ links }) => {
    return (
        links && (
            <>
                {Object.keys(links).map((link) => (
                    <Link to={links[link].path} key={link}>
                        <div className="app__button">{links[link].title}</div>
                    </Link>
                ))}
            </>
        )
    );
};

export default AppRibbon;
