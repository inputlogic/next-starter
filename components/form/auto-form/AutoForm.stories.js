import { forwardRef } from 'react'
import { post } from 'util/api'
import { AutoForm } from 'components/form/auto-form'

export default {
  title: 'Form/AutoForm',
  component: AutoForm,
  tags: ['autodocs'],
  argTypes: { onClick: { action: 'onSubmit' } },
}

const Template = (props) => <AutoForm {...props} />

export const SignupForm = Template.bind({})
export const LoginForm = Template.bind({})

LoginForm.args = {
  onSubmit: async (data) => {
    const res = await post('http://localhost:8000/auth/login', data)
    localStorage.setItem('token', res.token)
  },
  getComponent: (input) => {
    if (input.type === 'string') {
      const inputType = input.name.includes('email')
        ? 'email'
        : input.name.includes('password')
        ? 'password'
        : 'text'
      return forwardRef((props, ref) => (
        <div>
          <input
            type={inputType}
            placeholder={input.placeholder}
            ref={ref}
            {...props}
          />
        </div>
      ))
    }
    if (input.type === 'boolean') {
      return forwardRef((props, ref) => (
        <div>
          <label>
            {input.label} <input type="checkbox" ref={ref} {...props} />
          </label>
        </div>
      ))
    }
    return `No component for type ${input.type}`
  },
  inputs: [
    { name: 'email', type: 'string', placeholder: 'Email' },
    { name: 'password', type: 'string', placeholder: 'Password' },
  ],
}

SignupForm.args = {
  onSubmit: (data) => {},
  getComponent: (input) => {
    if (input.type === 'string') {
      const inputType = input.name.includes('email')
        ? 'email'
        : input.name.includes('password')
        ? 'password'
        : 'text'
      return forwardRef((props, ref) => (
        <div>
          <input
            type={inputType}
            placeholder={input.placeholder}
            ref={ref}
            {...props}
          />
        </div>
      ))
    }
    if (input.type === 'boolean') {
      return forwardRef((props, ref) => (
        <div>
          <label>
            {input.label} <input type="checkbox" ref={ref} {...props} />
          </label>
        </div>
      ))
    }
    return `No component for type ${input.type}`
  },
  inputs: [
    { name: 'fullName', type: 'string', placeholder: 'Full Name' },
    { name: 'email', type: 'string', placeholder: 'Email' },
    { name: 'password', type: 'string', placeholder: 'Password' },
    { name: 'subscribe', type: 'boolean', label: 'Subscribe to Newsletter' },
  ],
}

// AvatarWithImage.args = {
//   ...AvatarNoImage.args,
//   src: 'https://media.licdn.com/dms/image/C560BAQESPbFa_JOfYA/company-logo_200_200/0/1652984433019?e=2147483647&v=beta&t=67fnAHMzzMt2gMpb8ldY2GoQCWCUB6gjUVpJ_E84UPk',
// }
