import { openapi } from 'util/openapi'
import { useRouter } from 'next/router'
import { useLoginUserMutation } from 'hooks/use-user'
import styles from './login.module.scss'

export const AdminLogin = () => {
  const router = useRouter()
  const Form = openapi.useForm('publicUserLogin', 'post')
  const loginUserMutation = useLoginUserMutation()
  const onSubmit = async (data) => {
    try {
      await loginUserMutation.mutateAsync(data)
      router.push('/admin/dashboard')
    } catch (err) {
      // For some reason next.js api endpoints return error in a different structure
      // than drf, need to get to this level of error for standard error handling.
      throw err.data
    }
  }

  return (
    <div className={styles.adminLogin}>
      <Form.Form
        onSubmit={onSubmit}
        resourceId={router.query.id}
        submitText="Log in"
      />
    </div>
  )
}

export default AdminLogin
