import type { Meta, StoryObj } from '@storybook/react';
import { EditableContent } from './editableContent';

// EditableSpan
const meta: Meta<typeof EditableContent> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'uiKit/EditableContent',
    component: EditableContent
};

export default meta;

type Story = StoryObj<typeof EditableContent>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const DefaultSpan: Story = {
    // render: () => <EditableSpan />
};
