import React from 'react'

export class ValidationError extends Error {
  constructor(message, data) {
    super(message)
    this.name = 'ValidationError'
    this.data = data
  }
}

export const ValidatedEmail = (Component, schema) => (props) => {
  // Basic validation - check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (props[field] === undefined || props[field] === null) {
        throw new ValidationError(
          `Missing required field: ${field}`,
          { field, value: props[field] }
        )
      }
    }
  }

  // Basic type and format validation
  if (schema.properties) {
    for (const [field, fieldSchema] of Object.entries(schema.properties)) {
      const value = props[field]
      if (value !== undefined) {
        // Type validation
        if (fieldSchema.type === 'string' && typeof value !== 'string') {
          throw new ValidationError(
            `Field ${field} must be a string`,
            { field, value, expectedType: 'string' }
          )
        }
        if (fieldSchema.type === 'array' && !Array.isArray(value)) {
          throw new ValidationError(
            `Field ${field} must be an array`,
            { field, value, expectedType: 'array' }
          )
        }

        // URI format validation
        if (fieldSchema.format === 'uri' && typeof value === 'string') {
          try {
            new URL(value)
          } catch {
            throw new ValidationError(
              `Field ${field} must be a valid URI`,
              { field, value, expectedFormat: 'uri' }
            )
          }
        }
      }
    }
  }

  return <Component {...props} />
}
