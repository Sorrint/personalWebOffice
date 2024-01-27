import { type Meta, type StoryObj } from '@storybook/react';
import { Icons } from './icons';

const meta: Meta<typeof Icons> = {
  title: 'module/icons',
  component: Icons,
};
export default meta;
type Story = StoryObj<typeof Icons>;

export const Normal: Story = {};
Normal.args = {};
