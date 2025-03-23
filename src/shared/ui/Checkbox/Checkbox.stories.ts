import { type Meta, type StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'uikit/Checkbox',
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Normal: Story = {};
Normal.args = { text: 'Checkbox' };
