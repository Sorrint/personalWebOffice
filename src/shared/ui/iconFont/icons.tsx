import icons from '../../assets/icon-font/style.module.scss';
import { IconFont, type IconName } from './iconFont';
import style from './icons.module.scss';

export const Icons = () => {
  return (
    <div className={style.container}>
      {Object.keys(icons).map((key) => (
        <div key={key}>
          <IconFont iconName={key as IconName} />
          <p className={style.text}>{icons[key as IconName].split('-').slice(1).join('-')}</p>
        </div>
      ))}
    </div>
  );
};
