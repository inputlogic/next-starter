import { FormInput as AdminFormInput } from 'components/admin/input'
import { FormTextField as AdminFormTextField } from 'components/admin/text-field'
import { FormCheckboxField as AdminFormCheckboxField } from 'components/admin/checkbox-field'
import { buildOpenApiToolkit } from 'util/openapi/build-openapi-toolkit'
import doc from './openapi-doc.json'

/**
 * This openapi object has a bunch of helpful network tools
 * Do a global search of openapi to see examples.
 * It can also be useful to console.log this to see
 * everything that is available.
 * - url builder
 * - http methods
 * - react-query hooks and mutations
 */
export const openapi = buildOpenApiToolkit(doc, {
  server: {
    url: process.env.NEXT_PUBLIC_API_URL,
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
        predicate: (name, details) => details.type === 'string',
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
    ],
  },
})
