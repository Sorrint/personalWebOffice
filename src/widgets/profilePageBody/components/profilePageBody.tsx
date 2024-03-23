import { type FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';

import { RadioButton } from '@shared/ui/radioButton';
import { TextField } from '@shared/ui/textField';
import { Button } from '@shared/ui/button';
import { Popup } from '@shared/ui/popup';

import styles from './profile.module.scss';

type Token = 'dreamToken' | 'tempDreamToken';
interface ProfileSettings {
  dataBase: string;
  dreamToken: string;
  tempDreamToken?: string;
}

export const ProfilePageBody = () => {
  const [activePopup, setActivePopup] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<Token>('dreamToken');
  const dreamToken = localStorage.getItem('dreamToken') ?? undefined;
  const tempDreamToken = localStorage.getItem('tempDreamToken');
  const dataBase = localStorage.getItem('dataBase') ?? 'localStorage';
  const handleClick = (token: Token) => {
    setInputValue(token);
    setActivePopup(true);
  };
  const showPopup = () => {
    setActivePopup(prevState => !prevState);
  };

  const setDreamToken = <T extends FieldValues>(data: T) => {
    const hasDreamtoken: boolean = data.dreamToken ?? false;
    if (hasDreamtoken) {
      localStorage.setItem(inputValue, data[inputValue]);
    }
    setActivePopup(false);
  };

  const setDatabase = <T extends FieldValues>(data: T) => {
    const hasDataBase: boolean = data.dataBase ?? false;
    if (hasDataBase) {
      localStorage.setItem('dataBase', data.dataBase);
    }
  };

  const { register, handleSubmit } = useForm<ProfileSettings>({
    mode: 'onChange',
    defaultValues: {
      dataBase,
      dreamToken,
      tempDreamToken: undefined,
    },
  });

  return (
    <>
      <div className={styles.profile}>
        <h1 className={styles.header}>Настройки профиля</h1>
        <div className={styles.settings}>
          <div className='profile__database'>
            <h2 className={styles['section-header']}>Выбор базы данных</h2>
            <RadioButton
              label='Локальная база данных'
              {...register('dataBase')}
              value='localStorage'
            />
            <RadioButton
              label='База данных Dreamkass (требуется токен)'
              {...register('dataBase')}
              value='dreamkasStorage'
              disabled={!dreamToken}
            />
            <RadioButton
              label='База данных WebOffice'
              {...register('dataBase')}
              value='webofficeStorage'
            />
          </div>
          <h2 className={styles['section-header']}>Токен для работы с Dreamkas</h2>

          {dreamToken ? (
            <>
              <div className={styles['token-access']}>Токен установлен</div>
            </>
          ) : (
            <>
              <div className={styles['token-failed']}>
                Токен не установлен{' '}
                <Button onClick={() => handleClick('dreamToken')} buttonType='cancel'>
                  УСТАНОВИТЬ ТОКЕН
                </Button>
              </div>
            </>
          )}

          {tempDreamToken ? (
            <>
              <div className={styles['token-access']}>Токен установлен</div>
            </>
          ) : (
            <>
              <div className={styles['token-failed']}>
                Резервный токен не установлен{' '}
                <Button onClick={() => handleClick('tempDreamToken')} buttonType='cancel'>
                  УСТАНОВИТЬ ТОКЕН
                </Button>
              </div>
            </>
          )}
        </div>

        <Popup isOpened={activePopup} onClose={showPopup}>
          <div className={styles['token-input']}>
            <TextField label='Введите токен' {...register(inputValue)} />
            <Button onClick={handleSubmit(setDreamToken)}>УСТАНОВИТЬ ТОКЕН</Button>
          </div>
        </Popup>
        <Button onClick={handleSubmit(setDatabase)}>СОХРАНИТЬ НАСТРОЙКИ</Button>
      </div>
    </>
  );
};
