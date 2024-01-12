import { type Meta, type StoryObj } from '@storybook/react';
import { CounterField } from './counterField';

const meta: Meta<typeof CounterField> = {
  title: 'uikit/CounterField',
  component: CounterField,
};
export default meta;
type Story = StoryObj<typeof CounterField>;

export const Normal: Story = {};
Normal.args = {};
