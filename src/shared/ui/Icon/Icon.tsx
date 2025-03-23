import { type SVGComponent } from '@shared/types/svg';

interface IconProps {
  Icon: SVGComponent;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ Icon, width = 24, height = 24, className = '' }: IconProps) => {
  return <Icon width={width} height={height} className={className} />;
};
