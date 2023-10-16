import { type Meta, type StoryObj } from '@storybook/react';
import { RadioButton } from './radioButton';

const meta: Meta<typeof RadioButton> = {
    title: 'module/radioButton',
    component: RadioButton
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Normal: Story = {};
Normal.args = {
    label: 'Пункт1',
    disabled: false

};
