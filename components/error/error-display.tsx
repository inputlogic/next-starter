import { FC } from 'react'

interface ErrorDisplayProps {
  error: {
    code?: string | number
    message?: {
      message?: string
    }
  }
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }) => {
  const { message, code } = error
  console.log('ERROR', code, message?.message)
  return (
    <div>
      {code}: {message?.message}
    </div>
  )
}