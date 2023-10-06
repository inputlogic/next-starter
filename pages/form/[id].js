import { useRouter } from 'next/router'
import { useLoginUserMutation } from 'hooks/use-user'
import { openapi } from 'util/openapi'

export const Page = () => {
  const router = useRouter()
  // const Form = openapi.forms.adminUsersDetail.patch.AutoForm
  const Form = openapi.useForm('publicUserLogin', 'post')
  const loginUserMutation = useLoginUserMutation()
  const onSubmit = async (data) => {
    try {
      await loginUserMutation.mutateAsync(data)
    } catch (err) {
      // For some reason next.js api endpoints return error in a different structure
      // than drf, need to get to this level of error for standard error handling.
      throw err.data
    }
  }

  console.log(F2)
  return (
    <div style={{ padding: '2em' }}>
      <h1>Form</h1>
      {/* <Form id={router.query.id} /> */}
      <Form.Form
        onSubmit={onSubmit}
        resourceId={router.query.id}
        submitText="Log in"
      />

      <br />
      <br />
      {/* <Form.AutoForm resourceId={router.query.id}> */}
      {/*   <Form.Fields.Email /> */}
      {/*   <Form.Fields.IsActive /> */}
      {/*   <Form.Fields.IsSuperuser /> */}
      {/*   <Form.Fields.IsStaff /> */}
      {/*   <Form.SubmitButton>Submit</Form.SubmitButton> */}
      {/* </Form.AutoForm> */}
    </div>
  )
}

export default Page
