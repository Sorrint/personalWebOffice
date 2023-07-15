import { type Meta, type StoryObj } from '@storybook/react';
import { SelectListBox } from './selectListBox';
import './selectListBox.scss';
import '@app/styles/style.scss';

const meta: Meta<typeof SelectListBox> = {
    title: 'module/selectField',
    component: SelectListBox,
    parameters: {
        layout: 'centered'
    }
};
export default meta;
type Story = StoryObj<typeof SelectListBox>;

export const Normal: Story = {};
Normal.args = {};
