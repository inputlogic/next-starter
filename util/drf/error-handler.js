import { capitalize } from 'util/case'

const toFormErrorMessage = (error) => {
  if (error.code === 400) {
    return 'Please fix the errors below and try again.'
  } else if (error.code === 401) {
    return "Looks like you don't have permission to do this."
  } else {
    return "An unexpected error occured. We don't think this was your fault. Please try again later."
  }
}

export const errorHandler = (setError) => (error) => {
  if (error) {
    setError('root.message', {
      type: 'server',
      message: toFormErrorMessage(error),
    })
    setError('root.raw', {
      type: 'server',
      message: error,
    })
  }
  if (error.data) {
    Object.entries(error.data).forEach(([field, errors]) => {
      if (Array.isArray(errors)) {
        errors?.forEach((error) =>
          setError(field, {
            type: 'manual',
            message: capitalize(
              error.includes('null') ||
                error.includes('blank') ||
                error.includes('required')
                ? 'This field is required'
                : error
            ),
          })
        )
      } else {
        console.warn(
          'drfErrorHandler does not know how to handle this error',
          error
        )
      }
    })
  }
}
