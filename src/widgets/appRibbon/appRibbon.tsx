import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { OverlayingPopup } from 'features/popup';
import { INavLinkObject } from 'shared/ui/navLink/navLinkTypes';
import TextField from 'shared/ui/textField';

import './appRibbon.scss';

interface ILinksProps {
    navLinks: INavLinkObject;
}

const AppRibbon: FC<ILinksProps> = ({ navLinks }) => {
    //  const isGoods = useSelector(getGoodsListStatus());
    const { register, handleSubmit } = useForm({
        mode: 'onChange'
    });
    const [activePopup, setActivePopup] = useState<boolean>(false);
    const dreamToken = localStorage.getItem('dreamToken');
    const handleClick = () => {
        setActivePopup(true);
    };
    const showPopup = () => {
        setActivePopup((prevState) => !prevState);
    };

    const onSubmit = <T extends FieldValues>(data: T) => {
        if (data.dreamToken) {
            localStorage.setItem('dreamToken', data.dreamToken);
        }
    };

    return (
        <>
            {Object.keys(navLinks).map((link) => (
                <Link to={navLinks[link].path} key={link}>
                    <div className="content__button">{navLinks[link].title}</div>
                </Link>
            ))}
            <div className="fillElement"></div>
            {dreamToken ? (
                <div className="tokenAccess">Токен установлен</div>
            ) : (
                <div className="tokenFail" onClick={handleClick}>
                    Установить токен
                </div>
            )}
            <OverlayingPopup isOpened={activePopup} onClose={showPopup}>
                <div className="token-input">
                    <TextField label="Введите токен" name="dreamToken" register={register} />
                    <button className="create-button" onClick={handleSubmit(onSubmit)}>
                        Установить токен
                    </button>
                </div>
            </OverlayingPopup>
        </>
    );
};

export default AppRibbon;
