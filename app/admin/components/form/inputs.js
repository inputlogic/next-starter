'use client'

import { forwardRef } from 'react'
import { TextField, Text, Flex, Box, Select, Switch, RadioGroup, Checkbox } from '@radix-ui/themes'
import { connectByRef } from 'components/form/util/connect-by-ref'
import styles from './inputs.module.scss'

// Text Input Component
export const TextInput = forwardRef(
  (
    {
      type = 'text',
      name,
      value,
      label,
      placeholder,
      error = false,
      id,
      className,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    id = id || name

    return (
      <Box className={styles['input-wrapper']}>
        {label && (
          <Text as="label" size="2" mb="1" htmlFor={id} className={styles.label}>
            {label}
          </Text>
        )}
        <TextField.Root
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          name={name}
          color={error ? "red" : undefined}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        {error && (
          <Text size="1" color="red" mt="1" className={styles.error}>
            {error}
          </Text>
        )}
      </Box>
    )
  }
)
TextInput.displayName = 'TextInput'

// Select Input Component
export const SelectInput = forwardRef(
  (
    {
      name,
      value,
      label,
      options = [],
      placeholder = "Select an option...",
      error = false,
      id,
      className,
      ...props
    },
    ref
  ) => {
    id = id || name

    return (
      <Box className={styles['input-wrapper']}>
        {label && (
          <Text as="label" size="2" mb="1" htmlFor={id} className={styles.label}>
            {label}
          </Text>
        )}
        <Select.Root 
          defaultValue={value} 
          ref={ref}
          {...props}
        >
          <Select.Trigger id={id} className={error ? styles.error : undefined} />
          <Select.Content>
            <Select.Group>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        {error && (
          <Text size="1" color="red" mt="1" className={styles.error}>
            {error}
          </Text>
        )}
      </Box>
    )
  }
)
SelectInput.displayName = 'SelectInput'

// Checkbox Component
export const CheckboxInput = forwardRef(
  (
    {
      name,
      label,
      error = false,
      id,
      className,
      ...props
    },
    ref
  ) => {
    id = id || name

    return (
      <Box className={styles['checkbox-wrapper']}>
        <Flex gap="2" align="center">
          <Checkbox 
            id={id} 
            ref={ref}
            {...props}
          />
          {label && (
            <Text as="label" size="2" htmlFor={id} className={styles.label}>
              {label}
            </Text>
          )}
        </Flex>
        {error && (
          <Text size="1" color="red" mt="1" className={styles.error}>
            {error}
          </Text>
        )}
      </Box>
    )
  }
)
CheckboxInput.displayName = 'CheckboxInput'

// Switch Component
export const SwitchInput = forwardRef(
  (
    {
      name,
      label,
      error = false,
      id,
      className,
      ...props
    },
    ref
  ) => {
    id = id || name

    return (
      <Box className={styles['switch-wrapper']}>
        <Flex gap="2" align="center">
          <Switch 
            id={id} 
            ref={ref}
            {...props}
          />
          {label && (
            <Text as="label" size="2" htmlFor={id} className={styles.label}>
              {label}
            </Text>
          )}
        </Flex>
        {error && (
          <Text size="1" color="red" mt="1" className={styles.error}>
            {error}
          </Text>
        )}
      </Box>
    )
  }
)
SwitchInput.displayName = 'SwitchInput'

// Radio Group Component
export const RadioGroupInput = forwardRef(
  (
    {
      name,
      label,
      options = [],
      error = false,
      id,
      className,
      ...props
    },
    ref
  ) => {
    id = id || name

    return (
      <Box className={styles['radio-wrapper']}>
        {label && (
          <Text as="label" size="2" mb="1" className={styles.label}>
            {label}
          </Text>
        )}
        <RadioGroup.Root 
          ref={ref}
          {...props}
        >
          <Flex direction="column" gap="1">
            {options.map((option) => (
              <Flex key={option.value} gap="2" align="center">
                <RadioGroup.Item value={option.value} id={`${id}-${option.value}`} />
                <Text as="label" size="2" htmlFor={`${id}-${option.value}`}>
                  {option.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        </RadioGroup.Root>
        {error && (
          <Text size="1" color="red" mt="1" className={styles.error}>
            {error}
          </Text>
        )}
      </Box>
    )
  }
)
RadioGroupInput.displayName = 'RadioGroupInput'

// Connect all inputs to the form system
export const TextFormInput = connectByRef(TextInput)
export const SelectFormInput = connectByRef(SelectInput)
export const CheckboxFormInput = connectByRef(CheckboxInput)
export const SwitchFormInput = connectByRef(SwitchInput)
export const RadioGroupFormInput = connectByRef(RadioGroupInput)