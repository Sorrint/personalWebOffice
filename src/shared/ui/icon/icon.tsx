interface IconProps {
    Icon: React.FC<React.SVGProps<SVGElement>>
    width?: number
    height?: number
    className?: string
}

export const Icon= ({ Icon, width = 24, height = 24, className = '' }: IconProps) => {
    return (<Icon
        width={width}
        height={height}
        className={className}/>
    );
};
