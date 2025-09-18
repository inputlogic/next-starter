import { useForm as useFormBase, UseFormProps, UseFormReturn, FieldValues } from 'react-hook-form'
import { useStore } from 'util/store'

interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
  ctx?: {
    reason?: string
    error?: string
  }
}

interface ErrorResponse {
  response?: {
    data?: {
      detail?: string | ValidationError[]
    }
  }
}

interface UseFormOptions<T extends FieldValues = FieldValues> extends UseFormProps<T> {
  onSubmit?: (data: T) => Promise<unknown>
  showErrorBanner?: boolean
  showErrorNotification?: boolean
}

interface UseFormResult<T extends FieldValues = FieldValues> extends UseFormReturn<T> {
  onSubmit: (event: React.FormEvent) => void
}

export const useForm = <T extends FieldValues = FieldValues>({
  onSubmit,
  showErrorBanner = true,
  showErrorNotification = false,
  ...rest
}: UseFormOptions<T> = {}): UseFormResult<T> => {
  const methods = useFormBase<T>(rest)
  const setNotification = useStore((state) => state.setNotification)
  return {
    onSubmit: (ev: React.FormEvent) => {
      methods.clearErrors('root' as never)
      methods.handleSubmit(async (data: T) => {
        try {
          const response = await onSubmit?.(data)
          return response
        } catch (err) {
          errorHandler({ err: err as ErrorResponse, methods: methods as UseFormReturn<Record<string, unknown>>, setNotification, showErrorBanner, showErrorNotification })
        }
      })(ev)
    },
    ...methods
  }
}

interface ErrorHandlerOptions {
  err: ErrorResponse
  methods: UseFormReturn<Record<string, unknown>>
  setNotification: (notification: { type: 'success' | 'error' | 'warning' | 'info'; text: string }) => void
  showErrorBanner: boolean
  showErrorNotification: boolean
}

const errorHandler = ({ err, methods, setNotification, showErrorBanner, showErrorNotification }: ErrorHandlerOptions) => {
  console.error('form error', err)
  const detail = err.response?.data?.detail
  if (detail && typeof detail === 'string') {
    if (showErrorBanner) methods.setError('root.formError' as never, { type: 'manual', message: detail })
    if (showErrorNotification) setNotification({ type: 'error', text: detail })
    return
  } else if (detail) {
    const messages = parseFieldErrors(detail as ValidationError[])
    messages.forEach(err => methods.setError(err.field as never, { type: 'manual', message: err.message }))
    const formError = 'Looks like there was an error, please try again.'
    if (showErrorBanner) methods.setError('root.formError' as never, { type: 'manual', message: formError })
    if (showErrorNotification) setNotification({ type: 'error', text: formError })
    return
  }
  const message = 'An unexpected error occured. Try again later.'
  if (showErrorBanner) methods.setError('root.formError' as never, { type: 'manual', message })
  if (showErrorNotification) setNotification({ type: 'error', text: message })
}

const parseFieldErrors = (detail: ValidationError[]) => {
  return detail.map((item) => ({
    field: item.loc[item.loc.length - 1] as string,
    message: item.type === 'missing' ? 'This field is required' : (item.ctx?.reason || item.ctx?.error || item.msg),
  }))
}