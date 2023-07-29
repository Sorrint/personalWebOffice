import { type Meta, type StoryObj } from '@storybook/react';
import { SelectListBox } from './selectListBox';
import './selectListBox.scss';
import '@app/styles/style.scss';

const meta: Meta<typeof SelectListBox> = {
    title: 'uikit/selectListBox',
    component: SelectListBox,
    parameters: {
        layout: 'centered'
    }
};
export default meta;
type Story = StoryObj<typeof SelectListBox>;

export const Normal: Story = {};
Normal.args = {
    options: [
        { id: '1', value: '1, 1,5 кг'},
        { id: '2', value: '2,5 3 кг низ'},
        { id: '3', value: '3, 5 кг выс'},
        { id: '4', value: '4,5 кг кан'},
    ],
    selected: { id: '2', value: '2,5 3 кг низ'},
};
