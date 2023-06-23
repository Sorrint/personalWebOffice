import type { Meta, StoryObj } from '@storybook/react';
import './textField.scss';
import { TextField } from './textField';
import '../../../style.scss';

const meta = {
    title: 'uiKit/TextField',
    tags: ['autodocs'],
    component: TextField,
    parameters: {
        // layout: 'centered'
    }
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextField: Story = {
    args: {
        name: 'Текстовое поле',
        label: 'Введите текст'
    }
};

export const StandardTextField: Story = {
    args: {
        variant: 'standard',
        name: 'Текстовое поле',
        label: 'Введите текст'
    }
};

export const OutlineTextField: Story = {
    args: {
        variant: 'outline',
        name: 'Текстовое поле',
        label: 'Введите текст'
    }
};
