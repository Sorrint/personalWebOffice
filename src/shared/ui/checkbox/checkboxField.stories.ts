import { type Meta, type StoryObj } from '@storybook/react';
import { CheckboxField } from './checkboxField';

const meta: Meta<typeof CheckboxField> = {
    title: 'module/checkboxField',
    component: CheckboxField
};
export default meta;
type Story = StoryObj<typeof CheckboxField>;

export const Normal: Story = {};
Normal.args = {};
