export const ErrorDisplay = ({ text, code }) => {
  console.log('ERROR', code && code, text)
  return (
    <div>
      {code && `${code}: `}
      {text}
    </div>
  )
}
