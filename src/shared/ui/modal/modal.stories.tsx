import { type Meta, type StoryObj } from '@storybook/react';
import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  title: 'uikit/Modal',
  component: Modal,
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Normal: Story = {};
Normal.args = {
  centered: true,
  isActive: false,
  children: (
    <div
      style={{
        width: '400px',
        height: '150px',
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
      }}
    >
      Просто модалка
    </div>
  ),
};
