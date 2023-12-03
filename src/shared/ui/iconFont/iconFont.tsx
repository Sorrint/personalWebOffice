import classNames from 'classnames'
import styles from '../../assets/icon-font/style.module.scss'
import colors from './iconFont.module.scss'
export type IconName = keyof typeof styles

interface IconFontProps {
    iconName: IconName
    classname?: string
    color?: keyof typeof colors
}
export const IconFont = ({iconName, classname, color}: IconFontProps) => {
    const iconStyle = classNames(
        styles[iconName], 
        color && colors[color], 
        classname)
    
    return <i className={iconStyle}></i>
};