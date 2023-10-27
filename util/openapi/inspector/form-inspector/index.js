import { useState } from 'react'
import styles from './form-inspector.module.scss'

const FormPreview = ({ formName, method, openapi }) => {
  const [resourceId, setResourceId] = useState()
  const Form = openapi.useForm(formName, method)
  if (Form) {
    const isDetail = formName.endsWith('Detail')
    console.log('resource id', resourceId)
    return (
      <div>
        {isDetail && (
          <input
            placeholder="resourceId"
            onChange={(ev) => setResourceId(ev.target.value)}
          />
        )}
        <Form.Form
          {...(resourceId ? { resourceId } : {})}
          {...(!isDetail || resourceId
            ? {}
            : {
                useInitialData: () => [{}, {}],
              })}
        />
      </div>
    )
  }
  return 'Something went wrong'
}

export const FormInspector = ({ openapi }) => {
  const [form, setForm] = useState(null)
  return (
    <div className={styles.formDebugger}>
      <h1>Form Inspector</h1>
      {openapi && (
        <div>
          <select onChange={(ev) => setForm(ev.target.value)}>
            <option value="" />
            {Object.keys(openapi.forms)
              .filter((name) => Object.keys(openapi.forms[name]).length > 0)
              .flatMap((name) =>
                Object.keys(openapi.forms[name]).flatMap((method) => (
                  <option key={`${name}-${method}`} value={`${name}:${method}`}>
                    {name} - {method}
                  </option>
                ))
              )}
          </select>
        </div>
      )}
      {form && (
        <FormPreview
          formName={form.split(':')[0]}
          method={form.split(':')[1]}
          openapi={openapi}
        />
      )}
    </div>
  )
}
