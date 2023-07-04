import {FC} from 'react'

interface IconProps {
    Icon: React.FC<React.SVGProps<SVGElement>>,
    width?: number,
    height?: number,
    className?: string
}
 
const Icon: FC<IconProps> = ({Icon, width=24, height=24, className=''}) => {
    return (<Icon  
                width={width} 
                height={height} 
                className={className}/>  
            );
}
 
export default Icon;
