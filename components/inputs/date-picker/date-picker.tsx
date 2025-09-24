import React, { forwardRef, useState, useEffect, ChangeEvent } from 'react'
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { addYears, subYears, getMonth, getYear } from 'date-fns'
import { Icon } from 'components/icon'
import { TextInput } from 'components/inputs'
import { Portal } from 'components/portal'
import { classnames } from 'util/classnames'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './date-picker.module.scss'

export interface DatePickerSelectProps {
  id?: string
  name?: string
  label?: string
  value?: Date | null
  placeholder?: string
  readOnly?: boolean
  className?: string
  validationState?: 'error' | 'success' | ''
  variation?: 'default' | string
  size?: 'small' | 'medium' | 'large'
  style?: React.CSSProperties
  error?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const DatePickerSelect = forwardRef<
  HTMLInputElement,
  DatePickerSelectProps
>(
  (
    {
      id,
      name,
      label,
      value,
      placeholder = 'Click to select a date',
      readOnly,
      className,
      validationState = '',
      variation = 'default',
      size = 'medium',
      style,
      error,
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [startDate, setStartDate] = useState<Date | null>(value || null)
    const portalId = 'date-portal'
    const onChangeCallback = onValueChange || onChange

    function getYearsBetweenDates(date1: Date, date2: Date): number[] {
      let startYear = date1.getFullYear()
      const endYear = date2.getFullYear()
      const years: number[] = []

      while (startYear <= endYear) {
        years.push(startYear)
        startYear++
      }

      return years
    }

    const now = new Date()
    const years = getYearsBetweenDates(subYears(now, 200), addYears(now, 2))
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    // Update internal state when value prop changes
    useEffect(() => {
      setStartDate(value || null)
    }, [value])

    // Handle date changes
    const handleDateChange = (date: Date | null) => {
      setStartDate(date)
      if (typeof onChangeCallback === 'function') {
        // Format date as ISO string (YYYY-MM-DD).
        const formattedDate = date ? date.toISOString().split('T')[0] : null
        // Create a synthetic event object for react-hook-form compatibility
        const syntheticEvent = {
          target: {
            name: name || '',
            value: formattedDate,
          },
        } as ChangeEvent<HTMLInputElement>
        onChangeCallback(syntheticEvent)
      }
    }

    const renderCustomHeader = ({
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }: ReactDatePickerCustomHeaderProps) => (
      <div className={styles.header}>
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="button-reset"
          type="button"
        >
          <span className={styles.prev}>
            <Icon name="chevron-left" />
          </span>
        </button>
        <select
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(parseInt(value, 10))}
          className={styles.select}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          value={months[getMonth(date)]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
          className={styles.select}
        >
          {months.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="button-reset"
          type="button"
        >
          <span className={styles.next}>
            <Icon name="chevron-right" />
          </span>
        </button>
      </div>
    )

    return (
      <div
        className={classnames([
          styles.date,
          styles[variation],
          validationState ? styles[validationState] : null,
          className,
        ])}
        style={style}
      >
        <Portal className={styles.portal} id={portalId}>
          <div />
        </Portal>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          isClearable={true}
          readOnly={readOnly}
          showPopperArrow={false}
          placeholderText={placeholder}
          portalId={portalId}
          renderCustomHeader={renderCustomHeader}
          customInput={
            <TextInput
              label={label}
              placeholder={placeholder}
              error={error}
              ref={ref}
              id={id}
              name={name}
              {...props}
            />
          }
        />
      </div>
    )
  }
)

DatePickerSelect.displayName = 'Date Picker'
