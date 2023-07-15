import { type Meta, type StoryObj } from '@storybook/react';
import { SelectComboBox } from './selectComboBox';
import './selectComboBox.scss';

const meta: Meta<typeof SelectComboBox> = {
    title: 'module/selectComboBox',
    component: SelectComboBox
};
export default meta;
type Story = StoryObj<typeof SelectComboBox>;

export const Normal: Story = {};
Normal.args = {};
