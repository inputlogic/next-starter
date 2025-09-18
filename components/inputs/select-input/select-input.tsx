import { forwardRef, useState, useRef, useEffect, ReactNode } from 'react'
import { Icon } from 'components/icon'
import { ErrorMessage } from 'components/inputs/error-message'
import { classnames } from 'util/classnames'

import styles from './select.module.scss'

import {
  Root,
  Trigger,
  Value,
  Content,
  Viewport,
  Item,
  ItemText,
  Portal,
  SelectProps as RadixSelectProps,
  SelectItemProps as RadixSelectItemProps,
} from '@radix-ui/react-select'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectInputProps extends Omit<RadixSelectProps, 'children'> {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  error?: string
  options?: SelectOption[]
  required?: boolean
}

export const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      defaultValue,
      error,
      options = [],
      required,
      ...props
    },
    ref
  ) => {
    const [contentWidth, setContentWidth] = useState(500)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      // Defer layout calculation until after initial render
      if (!containerRef?.current) return

      // Use requestAnimationFrame to ensure styles are loaded
      const timer = requestAnimationFrame(() => {
        if (containerRef.current) {
          const refRect = containerRef.current.getBoundingClientRect()
          const width = refRect.width
          setContentWidth(width)
        }
      })

      return () => cancelAnimationFrame(timer)
    }, [containerRef])

    return (
      <div
        ref={containerRef}
        className={classnames([
          styles['select-input-component'],
          error ? styles.error : null,
        ])}
      >
        <Root
          defaultValue={defaultValue}
          name={name}
          required={required}
          {...props}
        >
          {label && (
            <label className={styles['select-label']} id={id}>
              {label}
            </label>
          )}
          <Trigger
            ref={ref}
            className={styles['select-trigger']}
            aria-label={label}
          >
            <Value placeholder={placeholder} />
            <div className={styles['select-arrow']}>
              <Icon name="chevron-down" />
            </div>
          </Trigger>
          <Portal>
            <Content
              className={styles['select-content']}
              position="popper"
              style={{ width: `${contentWidth}px` }}
            >
              <Viewport className="select-viewport">
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </Viewport>
            </Content>
          </Portal>
        </Root>
        {error && (
          <ErrorMessage className={styles['error-message']}>
            {error}
          </ErrorMessage>
        )}
      </div>
    )
  }
)

SelectInput.displayName = 'SelectInput'

interface SelectItemPropsInternal extends RadixSelectItemProps {
  children?: ReactNode
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemPropsInternal>(
  function SelectItem({ children, ...props }, forwardedRef) {
    return (
      <Item className={styles['select-item']} {...props} ref={forwardedRef}>
        <ItemText>{children}</ItemText>
      </Item>
    )
  }
)

SelectItem.displayName = 'SelectItem'
