import icons from '../../assets/icon-font/style.module.scss';
import { IconFont } from './IconFont';
import style from './icons.module.scss';

export const Icons = () => {
  const getIconNameWithoutPrefix = (name: string | number) => String(name).replace('icon-', '');
  return (
    <div className={style.container}>
      {Object.typedKeys(icons).map(iconName => (
        <div key={iconName}>
          <IconFont iconName={iconName} />
          <p className={style.text}>{getIconNameWithoutPrefix(iconName)}</p>
        </div>
      ))}
    </div>
  );
};
