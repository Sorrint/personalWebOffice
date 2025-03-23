import classNames from 'classnames';
import styles from '../../assets/icon-font/style.module.scss';
import colors from './IconFont.module.scss';
export type IconName = keyof typeof styles;

interface IconFontProps {
  iconName: IconName;
  className?: string;
  color?: keyof typeof colors;
  onClick?: () => void;
  bold?: boolean;
}

export const IconFont = ({ bold, iconName, className, color, onClick }: IconFontProps) => {
  const iconStyle = classNames(
    styles[iconName],
    color && colors[color],
    { [colors.bold]: bold },
    className,
  );

  return <i className={iconStyle} onClick={onClick}></i>;
};
