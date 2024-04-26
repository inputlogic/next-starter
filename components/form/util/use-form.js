import { useForm as useFormBase } from 'react-hook-form'

export const useForm = ({onSubmit, ...rest} = {}) => {
  const methods = useFormBase(rest)
  return {
    onSubmit: methods.handleSubmit(async data => {
      try {
        const response = await onSubmit(data)
        return response
      } catch (err) {
        const message = err.response?.data?.detail
        if (message) {
          methods.setError('formError', {type: 'manual', message})
        } else {
          console.log('TODO, handle error', err)
        }
      }
    }),
    ...methods
  }
}
