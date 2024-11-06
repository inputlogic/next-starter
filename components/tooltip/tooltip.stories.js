import { Tooltip } from './tooltip'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    label: { control: 'text' },
    position: { type: 'select', options: ['top', 'bottom', 'left', 'right'] },
    offset: { type: 'text' },
  }
}

const Template = (args) => {
  return (
    <div style={{ padding: "50px", cursor: "pointer" }}>
      <Tooltip {...args}>
        <span>Hover Me</span>
      </Tooltip>
    </div>
  )
}

export const Top = Template.bind({})
Top.args = {
  label: 'Top',
  position: 'top',
  offset: 5,
}

export const Bottom = Template.bind({})
Bottom.args = {
  label: 'Bottom',
  position: 'bottom',
  offset: 5,
}

export const Right = Template.bind({})
Right.args = {
  label: 'Right',
  position: 'right',
  offset: 5,
}

export const Left = Template.bind({})
Left.args = {
  label: 'Left',
  position: 'left',
  offset: 5,
}