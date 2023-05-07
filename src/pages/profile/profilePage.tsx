import './profile.scss';
import { useEffect, useState } from 'react';
import RadioButton from 'shared/ui/radioButton';
import { FieldValues, useForm } from 'react-hook-form';
import { OverlayingPopup } from 'features/popup';
import TextField from 'shared/ui/textField';
import Button from 'shared/ui/button/button';

interface ProfileSettings {
    dataBase: string;
    dreamToken: string;
}

const ProfilePage = () => {
    const [activePopup, setActivePopup] = useState<boolean>(false);
    const dreamToken = localStorage.getItem('dreamToken') || undefined;
    const handleClick = () => {
        setActivePopup(true);
    };
    const showPopup = () => {
        setActivePopup((prevState) => !prevState);
    };

    const onSubmit = <T extends FieldValues>(data: T) => {
        if (data.dreamToken) {
            localStorage.setItem('dreamToken', data.dreamToken);
            setActivePopup(false);
        }
    };

    const { register, handleSubmit, watch } = useForm<ProfileSettings>({
        mode: 'onChange',
        defaultValues: {
            dataBase: 'localStorage',
            dreamToken
        }
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <>
            <div className="profile">
                <h1 className="profile__header">Настройки профиля</h1>
                <div className="profile__settings">
                    <div className="profile__database">
                        <h2 className="profile__section-header">Выбор базы данных</h2>
                        <RadioButton label="Локальная база данных" {...register('dataBase')} value="localStorage" />
                        <RadioButton
                            label="База данных Dreamkass (требуется токен)"
                            {...register('dataBase')}
                            value="dreamkasStorage"
                            disabled={dreamToken ? false : true}
                        />
                        <RadioButton label="База данных WebOffice" {...register('dataBase')} value="webofficeStorage" />
                    </div>
                    <h2 className="profile__section-header">Токен для работы с Dreamkas</h2>

                    {dreamToken ? (
                        <>
                            <div className="tokenAccess">Токен установлен</div>
                        </>
                    ) : (
                        <>
                            <div className="tokenFailed">
                                Токен не установлен{' '}
                                <Button onClick={showPopup} buttonType="cancel">
                                    УСТАНОВИТЬ ТОКЕН
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                <OverlayingPopup isOpened={activePopup} onClose={showPopup}>
                    <div className="token-input">
                        <TextField label="Введите токен" {...register('dreamToken')} />
                        <Button onClick={handleSubmit(onSubmit)}>УСТАНОВИТЬ ТОКЕН</Button>
                    </div>
                </OverlayingPopup>
                <Button onClick={handleSubmit(onSubmit)}>СОХРАНИТЬ НАСТРОЙКИ</Button>
            </div>
        </>
    );
};

export default ProfilePage;
