import { AdminLayout } from './admin-layout'

export default {
  title: 'Layouts/AdminLayout',
  component: AdminLayout,
}

const Template = (props) => <AdminLayout {...props} />

export const Basic = Template.bind({})

Basic.args = {
  children: (
    <div style={{ background: '#afafaf', padding: '1em' }}>CHILDREN</div>
  ),
}
