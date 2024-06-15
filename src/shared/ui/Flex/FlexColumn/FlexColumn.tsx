import { Flex, FlexProps } from '../Flex/Flex';

type FlexColumnProps = Omit<FlexProps, 'direction'>;

export const FlexColumn = (props: FlexColumnProps) => {
  const { align = 'start' } = props;
  return <Flex {...props} direction='column' align={align} />;
};
