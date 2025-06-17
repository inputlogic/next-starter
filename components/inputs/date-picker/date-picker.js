import React, { forwardRef, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { addYears, subYears, getMonth, getYear, format } from 'date-fns'
import { Icon } from 'components/icon'
import { TextInput } from 'components/inputs'
import { Portal } from 'components/portal'
import { classnames } from 'util/classnames'

import baseStyles from 'react-datepicker/dist/react-datepicker.css'
import styles from './date-picker.module.scss'

export const DatePickerSelect = forwardRef(
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
    const [startDate, setStartDate] = useState(value)
    const portalId = 'date-portal'
    const onChangeCallback = onValueChange || onChange

    function getYearsBetweenDates(date1, date2) {
      let startYear = date1.getFullYear()
      const endYear = date2.getFullYear()
      const years = []

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
      setStartDate(value)
    }, [value])

    // Handle date changes
    const handleDateChange = (date) => {
      setStartDate(date)
      if (typeof onChangeCallback === 'function') {
        // Format date as ISO string (YYYY-MM-DD).
        const formattedDate = date ? date.toISOString().split('T')[0] : null
        // Create a synthetic event object for react-hook-form compatibility
        const syntheticEvent = {
          target: {
            name: name,
            value: formattedDate,
          },
        }
        onChangeCallback(syntheticEvent)
      }
    }

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
        <Portal className={styles.portal} id={portalId} />
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          isClearable={true}
          readOnly={readOnly}
          showPopperArrow={false}
          placeholderText={placeholder}
          portalId={portalId}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
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
                onChange={({ target: { value } }) => changeYear(value)}
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
          )}
          customInput={
            <TextInput
              label={label}
              placeholder={placeholder}
              error={error}
              ref={ref}
              id={id}
              size={size}
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
