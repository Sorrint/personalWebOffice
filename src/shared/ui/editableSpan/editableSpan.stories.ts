import type { Meta, StoryObj } from '@storybook/react';
import EditableSpan from './editableSpan';

// EditableSpan
const meta: Meta<typeof EditableSpan> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'uiKit/EditableSpan',
    component: EditableSpan
};

export default meta;

type Story = StoryObj<typeof EditableSpan>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const DefaultSpan: Story = {
    // render: () => <EditableSpan />
};
