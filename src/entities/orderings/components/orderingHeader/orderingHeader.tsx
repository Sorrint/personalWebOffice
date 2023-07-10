import './orderingHeader.scss';

export const OrderingHeader = () => {
    return (
        <div className="ordering__headers">
            <div className="ordering__header header__number">№</div>
            <div className="ordering__header header__productName">Товары (работы, услуги)</div>
            <div className="ordering__header header__count">Количество</div>
            <div className="ordering__header header__unit">Ед.</div>
        </div>
    );
};
