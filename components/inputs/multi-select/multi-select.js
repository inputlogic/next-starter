import { useState, useRef, useEffect } from 'react'
import { Root, Trigger, Portal, Content } from '@radix-ui/react-popover'
import { Icon } from 'components/icon'
import { classnames } from 'util/classnames'
import styles from './multi-select.module.scss'

export function MultiSelect({
  value,
  onChange,
  onBlur,
  label,
  options = [],
  disabled,
  placeholder = 'Select options',
  error,
}) {
  const [open, setOpen] = useState(false)
  const [contentWidth, setContentWidth] = useState(500)

  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setContentWidth(rect.width)
  }, [])

  const onRemoveValue = (optionValue) => {
    const newValues = value.filter((v) => v.value !== optionValue.value)
    onChange(newValues)
  }

  const onToggleValue = (optionValue) => {
    const exists = value.find((v) => v.value === optionValue.value)
    if (exists) {
      onRemoveValue(optionValue)
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div
      className={classnames(
        styles['multi-select'],
        disabled && styles['disabled']
      )}
    >
      {label && (
        <label
          className={classnames(
            styles['label'],
            disabled && styles['disabled']
          )}
        >
          {label}
        </label>
      )}

      <Root open={open} onOpenChange={setOpen}>
        <Trigger asChild>
          <button
            className={classnames(
              styles['listbox-button'],
              disabled && styles['disabled'],
              error && styles['error']
            )}
            ref={containerRef}
            disabled={disabled}
            onBlur={onBlur}
          >
            <div className={styles['values']}>
              {value.length > 0 ? (
                value.map((option) => (
                  <div key={option.value} className={styles['value']}>
                    <span className={styles['value-label']}>
                      {option.label}
                    </span>
                    {!disabled && (
                      <span
                        className={styles['value-icon']}
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemoveValue(option)
                        }}
                      >
                        <Icon name="x" />
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <span className={styles['placeholder']}>{placeholder}</span>
              )}
            </div>
            <div
              className={classnames(
                styles['select-arrow'],
                disabled && styles['disabled']
              )}
            >
              <Icon name={open ? 'chevron-up' : 'chevron-down'} />
            </div>
          </button>
        </Trigger>

        <Portal>
          <Content
            className={styles['listbox-options']}
            style={{ width: `${contentWidth}px` }}
            side="bottom"
            align="start"
            sideOffset={4}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={classnames(
                  styles['listbox-option'],
                  !!value.find((v) => v.value === option.value) &&
                    styles['selected']
                )}
                onClick={() => onToggleValue(option)}
              >
                {option.label}
                <span className={styles['label-description']}>
                  {!!value.find((v) => v.value === option.value) && (
                    <Icon
                      name="check"
                      variation="filled"
                      className={styles['check-icon']}
                    />
                  )}
                </span>
              </div>
            ))}
          </Content>
        </Portal>
      </Root>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
