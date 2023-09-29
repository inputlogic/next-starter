import { useRouter } from 'next/router'
import { openapi } from 'util/openapi'

export const Page = () => {
  const router = useRouter()
  const Form = openapi.forms.adminUsersDetail.patch.AutoForm
  return (
    <div style={{ padding: '2em' }}>
      <h1>Form</h1>
      <Form id={router.query.id} />
    </div>
  )
}

export default Page
