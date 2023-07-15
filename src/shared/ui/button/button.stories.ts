import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import '@app/styles/style.scss';

const meta = {
    // title: 'uiKit/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        buttonType: 'submit',
        children: 'Кнопка'
    }
};
