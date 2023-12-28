import { type Meta, type StoryObj } from '@storybook/react'
import { Panel } from './panel'

const meta: Meta<typeof Panel> = {
    component: Panel,
    title: 'Компоненты/Panel',
}
export default meta
type Story = StoryObj<typeof Panel>

export const Default: Story = {}
Default.args = {
    // title: 'Дополнительные данные для расчета',
    children: [<div key={1}>Текст</div>]
}

