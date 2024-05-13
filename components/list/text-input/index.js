import { useListContext } from 'components/list/list-provider'
import { TextInput as TextInputBase } from 'components/inputs'

export const TextInput = ({name, ...props}) => {
  const { router, setParam, params } = useListContext()
  return <TextInputBase
    onChange={(ev) => router.replace(setParam(name, ev.target.value)) }
    value={params[name] || ''}
    {...props}
  />
}
