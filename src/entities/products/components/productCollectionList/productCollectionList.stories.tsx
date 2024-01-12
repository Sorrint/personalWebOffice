import type { Meta, StoryObj } from '@storybook/react';
import { ProductCollectionList } from './productCollectionList';

const meta: Meta<typeof ProductCollectionList> = {
  title: 'entities/productCollectionList',
  component: ProductCollectionList,
};
export default meta;
type Story = StoryObj<typeof ProductCollectionList>;

export const Normal: Story = {};
Normal.args = {};
