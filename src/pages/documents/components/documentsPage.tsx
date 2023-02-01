import { Outlet } from 'react-router-dom';
import { FC } from 'react';
const DocumentsPage: FC = () => {
    return (
        <>
            <div className="app__header app__header_grid">
                <div className="app__title">Заказ покупателя</div>
                <div className="app__ribbon">
                    <div className="content__button">Заказ</div>
                    {/* {goods ? <AppRibbon links={ribbonButtons} /> : <div className="app__button">Заказ</div>} */}
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
