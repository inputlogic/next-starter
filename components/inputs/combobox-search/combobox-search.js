import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { Icon } from 'components/icon'
import { InlineLoader } from 'components/loading'
import { classnames } from 'util/classnames'

import { useState, useEffect, useRef } from 'react'

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
  const [contentWidth, setContentWidth] = useState(500)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setContentWidth(rect.width)
  }, [])
  return (
    <div className={styles['container']} ref={containerRef}>
      {label && <label className={styles['select-label']}>{label}</label>}
      <Combobox
        value={value}
        onChange={onChange}
        onClose={() => setQuery('')}
        immediate
      >
        {({ open }) => (
          <div>
            <div className={classnames(styles['select-trigger-wrapper'])}>
              <ComboboxInput
                className={classnames(
                  styles['select-trigger'],
                  error && styles['error'],
                  disabled && styles['disabled']
                )}
                displayValue={(option) => option?.label}
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => setQuery('')}
              />
              <ComboboxButton className={styles['select-icon']}>
                <Icon name={open ? 'chevron-up' : 'chevron-down'} />
              </ComboboxButton>
            </div>

            <ComboboxOptions
              anchor="bottom"
              transition
              className={styles['select-content']}
              style={{ width: `${contentWidth}px` }}
            >
              {isLoading ? (
                <div className={styles['select-loader']}>
                  <InlineLoader />
                </div>
              ) : (
                options.map((option) => (
                  <ComboboxOption
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
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </div>
        )}
      </Combobox>
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  )
}
