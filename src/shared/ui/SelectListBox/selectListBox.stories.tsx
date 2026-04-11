import { type Meta, type StoryObj } from '@storybook/react';
import { SelectListBox } from './SelectListBox';
// import './selectListBox.scss';

const meta: Meta<typeof SelectListBox> = {
  title: 'uikit/selectListBox',
  component: SelectListBox,
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof SelectListBox>;

export const Normal: Story = {};
Normal.args = {
  options: [
    { id: '1', content: '1, 1,5 кг' },
    { id: '2', content: '2,5 3 кг низ' },
    { id: '3', content: '3, 5 кг выс' },
    { id: '4', content: '4,5 кг кан' },
  ],
  value: '2,5 3 кг низ',
  defaultValue: 'Кнопка',
};
