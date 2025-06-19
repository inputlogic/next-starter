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
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef(null)
  const listRef = useRef([])

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setContentWidth(rect.width)
  }, [])

  useEffect(() => {
    if (open && focusedIndex >= 0 && listRef.current[focusedIndex]) {
      listRef.current[focusedIndex].scrollIntoView({ block: 'nearest' })
    }
  }, [focusedIndex, open])

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

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        setOpen(true)
        setFocusedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0) {
          onToggleValue(options[focusedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
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
            onKeyDown={handleKeyDown}
          >
            {options.map((option, idx) => {
              const selected = !!value.find((v) => v.value === option.value)
              const isFocused = focusedIndex === idx
              return (
                <div
                  key={option.value}
                  ref={(el) => (listRef.current[idx] = el)}
                  className={classnames(
                    styles['listbox-option'],
                    selected && styles['selected'],
                    isFocused && styles['focused']
                  )}
                  onClick={() => onToggleValue(option)}
                  tabIndex={-1}
                >
                  {option.label}
                  <span className={styles['label-description']}>
                    {selected && (
                      <Icon
                        name="check"
                        variation="filled"
                        className={styles['check-icon']}
                      />
                    )}
                  </span>
                </div>
              )
            })}
          </Content>
        </Portal>
      </Root>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
