import {
  ComboboxProvider,
  Combobox as AriakitCombobox,
  ComboboxPopover,
  ComboboxItem,
} from '@ariakit/react'
import { useState } from 'react'
import { Icon } from 'components/icon'
import { InlineLoader } from 'components/loading'
import { classnames } from 'util/classnames'
import styles from './combobox-search.module.scss'

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
}) {
  const [open, setOpen] = useState(false)

  const onBlur = () => {
    // If the value is not in the options, reset
    if (value && !options.some((option) => option.value === value.value)) {
      onChange('')
    }
    setQuery('')
  }

  return (
    <div className={styles['container']}>
      {label && <label className={styles['select-label']}>{label}</label>}

      <ComboboxProvider value={value} setValue={onChange}>
        <div className={classnames(styles['select-trigger-wrapper'])}>
          <AriakitCombobox
            className={classnames(
              styles['select-trigger'],
              error && styles['error'],
              disabled && styles['disabled']
            )}
            value={value?.label || value}
            onChange={(event) => setQuery(event.target.value)}
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
                value={option}
                className={styles['select-item']}
              >
                {option.label}
                {value?.value === option.value && (
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
