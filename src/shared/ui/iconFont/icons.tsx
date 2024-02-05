import icons from '../../assets/icon-font/style.module.scss';
import { IconFont, type IconName } from './iconFont';
import style from './icons.module.scss';

export const Icons = () => {
  const getIconNameWithoutPrefix = (name: string) => name.replace('icon-', '');
  return (
    <div className={style.container}>
      {Object.keys(icons).map((iconName) => (
        <div key={iconName}>
          <IconFont iconName={iconName as IconName} />
          <p className={style.text}>{getIconNameWithoutPrefix(iconName)}</p>
        </div>
      ))}
    </div>
  );
};
