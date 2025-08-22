import React from 'react'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

export class ValidationError extends Error {
  constructor(message, data) {
    super(message)
    this.name = 'ValidationError'
    this.data = data
  }
}

// Cache for loaded OpenAPI spec
let openApiSpec = null

// Load OpenAPI schema
const getOpenApiSpec = () => {
  if (!openApiSpec) {
    const specPath = path.join(process.cwd(), 'email-type-list.yaml')
    const specContent = fs.readFileSync(specPath, 'utf8')
    openApiSpec = yaml.parse(specContent)
  }
  return openApiSpec
}

// Get schema for a specific email type from OpenAPI spec
const getEmailSchema = (emailType) => {
  const spec = getOpenApiSpec()
  const schemaName = `${emailType.charAt(0).toUpperCase()}${emailType.slice(1)}Email`
  
  if (!spec.components?.schemas?.[schemaName]) {
    throw new Error(`Email schema not found: ${schemaName}`)
  }
  
  return {
    ...spec.components.schemas[schemaName],
    // Include referenced schemas in definitions for Ajv
    definitions: spec.components.schemas
  }
}

export const ValidatedEmail = (Component, schema) => (props) => {
  // If schema is provided inline, use the current validation
  // Otherwise, try to get schema from OpenAPI spec
  let validationSchema = schema
  
  if (!schema && Component.definition?.version) {
    // Extract email type from template version (e.g., "forgot-password-v1" -> "forgotPassword")
    const emailType = Component.definition.version
      .split('-')
      .slice(0, -1) // Remove version suffix
      .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
    
    try {
      validationSchema = getEmailSchema(emailType)
    } catch (error) {
      console.warn(`Could not load OpenAPI schema for ${emailType}:`, error.message)
      // Fall back to inline schema if available
      validationSchema = Component.schema
    }
  }

  if (validationSchema) {
    // Create Ajv instance
    const ajv = new Ajv({ allErrors: true })
    addFormats(ajv)
    
    // Compile the schema
    const validate = ajv.compile(validationSchema)
    
    // Validate props
    const valid = validate(props)
    
    if (!valid) {
      const errors = validate.errors.map(error => ({
        field: error.instancePath?.replace('/', '') || error.params?.missingProperty,
        message: error.message,
        value: error.data,
        schemaPath: error.schemaPath
      }))
      
      throw new ValidationError(
        `Validation failed: ${errors.map(e => `${e.field}: ${e.message}`).join(', ')}`,
        { errors }
      )
    }
  }

  return <Component {...props} />
}
