import { Outlet } from 'react-router-dom';
import { FC } from 'react';

import AppRibbon from 'widgets/appRibbon/appRibbon';
import { readGoods } from 'entities/goods/model/reducers/GoodsSlice';
import { useAppDispatch } from 'shared/lib/hooks';
import { INavLinkObject } from 'shared/ui/navLink/navLinkTypes';
import { Helmet } from 'react-helmet';

const DocumentsPage: FC = () => {
    const dispatch = useAppDispatch();
    const handleChange = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        dispatch(readGoods(e));
    };
    const navLinks: INavLinkObject = {
        order: {
            path: '/documents/order',
            title: 'Заказ'
        },
        ordering: {
            path: '/documents/ordering',
            title: 'Порядовка'
        },
        distribution: {
            path: '/documents/distribution',
            title: 'Распаллетовка'
        }
    };

    return (
        <>
            <Helmet>
                <title>Заказ покупателя</title>
            </Helmet>
            <div className="app__header">
                <div className="app__container">
                    <div className="app__title">Заказ покупателя</div>
                    <form>
                        <input type="file" onChange={(e) => handleChange(e)} />
                    </form>

                    <div className="app__ribbon">
                        <AppRibbon navLinks={navLinks} />
                    </div>
                </div>
            </div>

            <div className="app__body">
                <div className="content__container">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DocumentsPage;
