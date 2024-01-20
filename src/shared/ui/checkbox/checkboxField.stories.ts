import { type Meta, type StoryObj } from '@storybook/react';
import { CheckboxField } from './checkboxField';

const meta: Meta<typeof CheckboxField> = {
  title: 'uikit/checkboxField',
  component: CheckboxField,
};
export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Normal: Story = {};
Normal.args = {};
