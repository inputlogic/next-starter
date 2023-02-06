import { AutoForm } from 'components/auto-form'

const AdminIndex = () => (
  <>
    <AutoForm />
    <p>If you're seeing this page, you're special</p>
  </>
)

AdminIndex.Layouts = ['BaseLayout', 'AdminLayout']
export default AdminIndex
