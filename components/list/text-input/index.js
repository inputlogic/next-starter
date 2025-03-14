import { useCallback } from 'react'
import { useListContext } from 'components/list/list-provider'
import { TextInput as TextInputBase } from 'components/inputs'
import { debounce } from 'util/debounce'

export const TextInput = ({name, ...props}) => {
  const { router, setParam, params } = useListContext()
  const setValue = useCallback(
    debounce((value) => router.push(setParam(name, value)), 500),
    [name, router, setParam]
  )
  return <TextInputBase
    onChange={ev => setValue(ev.target.value)}
    defaultValue={params[name] || ''}
    {...props}
  />
}
