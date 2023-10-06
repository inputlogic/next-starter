import { FormInput as AdminFormInput } from 'components/admin/input'
import { FormTextField as AdminFormTextField } from 'components/admin/text-field'
import { FormCheckboxField as AdminFormCheckboxField } from 'components/admin/checkbox-field'
import { useState, useEffect } from 'react'
import { buildOpenApiToolkit } from 'util/openapi/build-openapi-toolkit'
import styles from './form-inspector.module.scss'

const FormPreview = ({ formName, method, openapi }) => {
  const Form = openapi.useForm(formName, method)
  return <Form.Form />
}

export const FormInspector = () => {
  const [openapiUrl, setOpenapiUrl] = useState('')
  const [openapi, setOpenapi] = useState(null)
  const [form, setForm] = useState(null)
  useEffect(() => {
    const buildToolkit = async () => {
      const res = await fetch(openapiUrl, {
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await res.json()
      setOpenapi(
        buildOpenApiToolkit(json, {
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
        })
      )
      console.log('yooo', json)
    }
    if (openapiUrl) {
      buildToolkit()
    }
  }, [openapiUrl])
  console.log('openapi', openapi)
  return (
    <div className={styles.formDebugger}>
      <h1>Form Inspector</h1>
      <input
        placeholder="openapi json url"
        onChange={(ev) => setOpenapiUrl(ev.target.value)}
      />
      {openapi && (
        <div>
          <select onChange={(ev) => setForm(ev.target.value)}>
            <option value="" />
            {Object.keys(openapi.forms)
              .filter((name) => Object.keys(openapi.forms[name]).length > 0)
              .flatMap((name) =>
                Object.keys(openapi.forms[name]).flatMap((method) => (
                  <option key={`${name}-${method}`} value={`${name}-${method}`}>
                    {name} - {method}
                  </option>
                ))
              )}
          </select>
        </div>
      )}
      {form && (
        <FormPreview
          formName={form.split('-')[0]}
          method={form.split('-')[1]}
          openapi={openapi}
        />
      )}
    </div>
  )
}
