import { useRouter } from 'next/router'
import { useLoginUserMutation } from 'hooks/use-user'
import { openapi } from 'util/openapi'

export const Page = () => {
  const router = useRouter()
  // const Form = openapi.forms.adminUsersDetail.patch.AutoForm
  const Form = openapi.useForm('publicUserLogin', 'post')
  const F2 = openapi.useForm('towingTowingNotices', 'post')
  const loginUserMutation = useLoginUserMutation()
  const onSubmit = async (data) => {
    await loginUserMutation.mutateAsync(data)
  }

  console.log(F2)
  return (
    <div style={{ padding: '2em' }}>
      <h1>Form</h1>
      {/* <Form id={router.query.id} /> */}
      <Form.Form onSubmit={onSubmit} resourceId={router.query.id} />

      <br />
      <br />
      <F2.Form
        onSubmit={(data) => console.log('on submit', data)}
        useInitialData={() => [{ vehicle: { make: 'Tesla' } }, {}]}
      />
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
