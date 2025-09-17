'use client'

import { useCallback, ChangeEvent, ComponentProps } from 'react'
import { useListContext } from 'components/list/list-provider'
import { TextInput as TextInputBase } from 'components/inputs'
import { debounce } from 'util/debounce'

interface TextInputProps extends ComponentProps<typeof TextInputBase> {
  name: string
}

export const TextInput = ({ name, ...props }: TextInputProps) => {
  const { router, setParam, params } = useListContext()

  const setValue = useCallback(
    debounce((value: string) => router.push(setParam(name, value)), 500) as (value: string) => void,
    [name, router, setParam]
  )

  return (
    <TextInputBase
      onChange={(ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value)}
      defaultValue={params[name] || ''}
      {...props}
    />
  )
}
