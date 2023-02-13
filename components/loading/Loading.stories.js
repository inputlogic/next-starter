import { InlineLoader } from 'components/loading/inline'

export default {
  title: 'Components/Loading',
  component: InlineLoader,
  tags: ['autodocs'],
}

const Template = (props) => <InlineLoader {...props} />

export const Basic = Template.bind({})
Basic.args = {
  text: 'Loading...',
}
