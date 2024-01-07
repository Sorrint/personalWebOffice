import classNames from 'classnames';
import styles from '../../assets/icon-font/style.module.scss';
import colors from './iconFont.module.scss';
export type IconName = keyof typeof styles;

interface IconFontProps {
  iconName: IconName;
  classname?: string;
  color?: keyof typeof colors;
  onClick?: () => void;
}

export const IconFont = ({ iconName, classname, color, onClick }: IconFontProps) => {
  const iconStyle = classNames(styles[iconName], color && colors[color], classname);

  return <i className={iconStyle} onClick={onClick}></i>;
};
