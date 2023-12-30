import { type Meta, type StoryObj } from '@storybook/react';
import { Dropdown } from './dropdown';

const meta: Meta<typeof Dropdown> = {
    title: 'module/dropdown',
    component: Dropdown,
}
export default meta
type Story = StoryObj<typeof Dropdown>;

export const Normal: Story = {}
Normal.args = {
    title: 'Меню'
}