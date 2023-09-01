import { capitalize } from 'util/case'

export const errorHandler = (setError) => (error) => {
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
