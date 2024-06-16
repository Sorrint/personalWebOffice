import classNames from 'classnames';
import styles from '../../assets/icon-font/style.module.scss';
import colors from './iconFont.module.scss';
export type IconName = keyof typeof styles;

interface IconFontProps {
  iconName: IconName;
  classname?: string;
  color?: keyof typeof colors;
  onClick?: () => void;
  bold?: boolean;
}

export const IconFont = ({ bold, iconName, classname, color, onClick }: IconFontProps) => {
  const iconStyle = classNames(
    styles[iconName],
    color && colors[color],
    { [colors.bold]: bold },
    classname,
  );

  return <i className={iconStyle} onClick={onClick}></i>;
};
