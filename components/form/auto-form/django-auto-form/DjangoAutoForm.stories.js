import { DjangoAutoForm } from 'components/form/auto-form/django-auto-form'

export default {
  title: 'Form/DjangoAutoForm',
  component: DjangoAutoForm,
  tags: ['autodocs'],
}

const Template = (props) => <DjangoAutoForm {...props} />

export const SignupForm = Template.bind({})
export const LoginForm = Template.bind({})
export const AdminUserForm = Template.bind({})

LoginForm.args = {
  name: 'login',
  method: 'post',
}

SignupForm.args = {
  name: 'signup',
  method: 'post',
}

AdminUserForm.args = {
  name: 'adminUsers',
  method: 'post',
  inputs: (inputs) =>
    inputs.map((input) => {
      if (input.name !== 'password') {
        return input
      }
      return {
        ...input,
        component: (props) => (
          <div>
            password: {props.value}
            <a href="#">set password</a>
          </div>
        ),
      }
    }),
}

AdminUserEditForm.args = {
  name: 'adminUser',
  args: { id: 1 },
  method: 'post',
  inputs: (inputs) =>
    inputs.map((input) => {
      if (input.name !== 'password') {
        return input
      }
      return {
        ...input,
        component: (props) => (
          <div>
            password: {props.value}
            <a href="#">set password</a>
          </div>
        ),
      }
    }),
}
