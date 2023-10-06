import { openapi } from 'util/openapi'

export const AdminUsers = () => {
  const Table = openapi.tables.adminUsers.Table
  return (
    <div>
      <Table detailRoute={({ id }) => `/admin/users/${id}`} />
    </div>
  )
}

AdminUsers.Layouts = ['AdminLayout']
export default AdminUsers
