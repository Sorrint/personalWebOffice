import { Flex, FlexProps } from '../Flex/Flex';

type FlexRowProps = Omit<FlexProps, 'direction'>;

export const FlexRow = (props: FlexRowProps) => {
  return <Flex direction='row' {...props} />;
};
