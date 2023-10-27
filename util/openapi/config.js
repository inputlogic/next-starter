import { useUser } from 'hooks/use-user'
import { FormInput as AdminFormInput } from 'components/admin/input'
import { FormTextField as AdminFormTextField } from 'components/admin/text-field'
import { FormCheckboxField as AdminFormCheckboxField } from 'components/admin/checkbox-field'

export const config = {
  server: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },
  useToken: () => {
    const [user] = useUser()
    return user?.token
  },
  form: {
    fields: [
      {
        name: 'Input',
        predicate: (name, details) =>
          ['string', 'number', 'integer'].includes(details.type),
        priority: 0,
        component: (name, details) => (props) =>
          (
            <AdminFormInput
              name={name}
              type={
                details.type === 'number'
                  ? 'number'
                  : details.type === 'integer'
                  ? 'integer'
                  : name.toLowerCase().includes('email')
                  ? 'email'
                  : name.toLowerCase().includes('password')
                  ? 'password'
                  : 'text'
              }
              {...props}
            />
          ),
      },
      {
        name: 'TextField',
        priority: 1,
        predicate: (name, details) =>
          ['string', 'number', 'integer'].includes(details.type),
        component: (name, details) => (props) =>
          (
            <AdminFormTextField
              name={name}
              type={
                name.toLowerCase().includes('email')
                  ? 'email'
                  : name.toLowerCase().includes('password')
                  ? 'password'
                  : 'text'
              }
              {...props}
            />
          ),
      },
      {
        name: 'CheckboxField',
        priority: 1,
        predicate: (name, details) => details.type === 'boolean',
        component: (name, details) => (props) =>
          <AdminFormCheckboxField name={name} {...props} />,
      },
      {
        name: 'CheckboxField',
        priority: 1,
        theme: 'fancy',
        predicate: (name, details) => details.type === 'boolean',
        component: (name, details) => (props) =>
          <div>Fancy Checkbox for {name}</div>,
      },
    ],
  },
}
