import { Loading } from 'components/loading'

export default {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
}

const Template = (props) => <Loading {...props} />

export const Basic = Template.bind({})
export const NoPadding = Template.bind({})
NoPadding.args = { noPadding: true }
