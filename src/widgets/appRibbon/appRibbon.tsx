import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGoodsListStatus } from '../../entities/goods/model/reducers/GoodsSlice';
import { INavLinkObject } from '../../shared/ui/navLink/navLinkTypes';

interface ILinksProps {
    navLinks: INavLinkObject;
}

const AppRibbon: FC<ILinksProps> = ({ navLinks }) => {
    //  const isGoods = useSelector(getGoodsListStatus());

    return (
        <>
            {/* {isGoods ? ( */}
            {Object.keys(navLinks).map((link) => (
                <Link to={navLinks[link].path} key={link}>
                    <div className="content__button">{navLinks[link].title}</div>
                </Link>
            ))}
            {/* ) : ( */}
            {/* <div className="content__button">Заказ</div> */}
            {/* )} */}
        </>
    );
};

export default AppRibbon;
