import {
  ComboboxProvider,
  Combobox as AriakitCombobox,
  ComboboxPopover,
  ComboboxItem,
} from '@ariakit/react'
import { useState, ChangeEvent } from 'react'
import { Icon } from 'components/icon'
import { InlineLoader } from 'components/loading'
import { classnames } from 'util/classnames'
import styles from './combobox-search.module.scss'

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxSearchProps {
  value?: ComboboxOption | string
  onChange: (value: ComboboxOption | string) => void
  setQuery: (query: string) => void
  label?: string
  placeholder?: string
  error?: string
  options: ComboboxOption[]
  isLoading?: boolean
  disabled?: boolean
}

export function ComboboxSearch({
  value = '',
  onChange,
  setQuery,
  label,
  placeholder = 'Search...',
  error,
  options,
  isLoading,
  disabled,
}: ComboboxSearchProps) {
  const [open, setOpen] = useState(false)

  const onBlur = () => {
    // If the value is not in the options, reset
    if (
      value &&
      typeof value === 'object' &&
      !options.some((option) => option.value === value.value)
    ) {
      onChange('')
    }
    setQuery('')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const getDisplayValue = () => {
    if (typeof value === 'object' && value !== null) {
      return value.label
    }
    return value as string
  }

  return (
    <div className={styles['container']}>
      {label && <label className={styles['select-label']}>{label}</label>}

      <ComboboxProvider
        value={typeof value === 'object' ? value?.value : value}
        setValue={onChange}
      >
        <div className={classnames(styles['select-trigger-wrapper'])}>
          <AriakitCombobox
            className={classnames(
              styles['select-trigger'],
              error && styles['error'],
              disabled && styles['disabled']
            )}
            value={getDisplayValue()}
            onChange={handleInputChange}
            placeholder={placeholder}
            onBlur={onBlur}
            disabled={disabled}
          />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className={styles['select-icon']}
          >
            <Icon name={open ? 'chevron-up' : 'chevron-down'} />
          </button>
        </div>

        <ComboboxPopover className={styles['select-content']} sameWidth>
          {isLoading ? (
            <div className={styles['select-loader']}>
              <InlineLoader />
            </div>
          ) : (
            options.map((option) => (
              <ComboboxItem
                key={option.value}
                value={option.value}
                className={styles['select-item']}
              >
                {option.label}
                {typeof value === 'object' && value?.value === option.value && (
                  <Icon
                    name="check"
                    className={styles['select-check']}
                    variation="filled"
                  />
                )}
              </ComboboxItem>
            ))
          )}
        </ComboboxPopover>
      </ComboboxProvider>

      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  )
}
