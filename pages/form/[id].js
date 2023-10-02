import { useRouter } from 'next/router'
import { openapi } from 'util/openapi'

export const Page = () => {
  const router = useRouter()
  // const Form = openapi.forms.adminUsersDetail.patch.AutoForm
  const Form = openapi.useForm('adminUsersDetail', 'patch')
  return (
    <div style={{ padding: '2em' }}>
      <h1>Form</h1>
      {/* <Form id={router.query.id} /> */}
      <Form.AutoForm resourceId={router.query.id} />

      <br />
      <br />
      <Form.AutoForm resourceId={router.query.id}>
        <Form.Fields.Email />
        <Form.Fields.IsActive />
        <Form.Fields.IsSuperuser />
        <Form.Fields.IsStaff />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.AutoForm>
    </div>
  )
}

export default Page
