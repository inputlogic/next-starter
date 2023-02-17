import { useQuery, useMutation } from 'react-query'
import { forwardRef } from 'react'
import { options, get, post, patch } from 'util/api'
import { useUser } from 'hooks/use-user'
import { AutoForm } from 'components/form/auto-form'

const djangoErrorToFormError = (error) => {
  if (error.code === 400) {
    return {
      name: 'formError',
      formError: 'Please fix the fields and try again.',
      fieldErrors: Object.keys(error.data).reduce(
        (acc, k) => ({
          ...acc,
          [k]: Array.isArray(error.data[k]) ? error.data[k][0] : error.data[k],
        }),
        {}
      ),
    }
  }
  return error
}

const getComponent = (input) => {
  if (input.readOnly) {
    return (props) => <div>Read only: {input.name}</div>
  }
  if (['email', 'string', 'password'].includes(input.type)) {
    const inputType = input.name.includes('email')
      ? 'email'
      : input.name.includes('password')
      ? 'password'
      : 'text'
    return forwardRef((props, ref) => (
      <div>
        <div>
          <label>{input.label}</label>
        </div>
        <input
          type={inputType}
          placeholder={input.placeholder}
          ref={ref}
          {...props}
        />
        {props.error && <div>{props.error}</div>}
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
  return (props) => <div>No component for type {input.type}</div>
}

const metaToInputs = (meta, method) => {
  const fields = meta.actions[method.toUpperCase()]
  return Object.keys(fields).map((k) => ({
    name: k,
    ...fields[k],
  }))
}

export const DjangoAutoForm = ({
  name,
  args,
  method,
  prepareData,
  inputs: customizeInputs,
}) => {
  const [user] = useUser()
  const { data: meta } = useQuery(['test'], () => {
    const res = options(name, { args, token: user?.token })
    return res
  })
  const inputsFromMeta = (meta && metaToInputs(meta, method)) || []
  const inputs = customizeInputs
    ? typeof customizeInputs === 'function'
      ? customizeInputs(inputsFromMeta)
      : customizeInputs
    : inputsFromMeta
  console.log('inputs', inputs)
  const mutation = useMutation(
    async (data) => {
      try {
        const fetchFunction = { get, post, patch }[method.toLowerCase()]
        const res = await fetchFunction(name, prepareData?.(data) || data, {
          token: user?.token,
        })
        return res
      } catch (err) {
        const updated = djangoErrorToFormError(err)
        throw updated
      }
    },
    {
      onMutate: (data) => {
        console.log('on mutate', data)
      },
      onSuccess: (data) => {
        console.log('on success', data)
      },
    }
  )
  return (
    <AutoForm
      inputs={inputs}
      onSubmit={async (data) => {
        await mutation.mutateAsync(data)
      }}
      getComponent={getComponent}
    />
  )
}
