import { useRouter } from 'next/router'
import { openapi } from 'util/openapi'
import * as y from 'yup'

export const AdminUser = () => {
  const router = useRouter()
  const Form = openapi.useForm('adminUsersDetail', 'patch')
  return (
    <div>
      <Form.Form
        resourceId={router.query.id}
        validation={{
          email: y.string().email().required().label('Email'),
        }}
      />
    </div>
  )
}

AdminUser.Layouts = ['AdminLayout']
export default AdminUser
