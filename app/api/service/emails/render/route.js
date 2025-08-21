import { NextResponse } from 'next/server'
import { render } from '@react-email/render'
import React from 'react'
import * as BaseEmailComponents from 'emails'
import { ValidationError, ValidatedEmail } from 'emails/_util/validation'
import { checkEmailServiceAuth } from 'util/server-only/email-service'

const EmailComponents = Object.values(BaseEmailComponents).reduce(
  (acc, Component) => ({
    [Component.definition.version || Component.definition.name]: ValidatedEmail(
      Component,
      Component.definition.schema
    ),
    ...acc,
  }),
  {}
)


export async function POST(req) {
  const authError = checkEmailServiceAuth(req)
  console.log('>>> authError', authError)
  if (authError) return authError

  try {
    const body = await req.json()
    console.log('>>> body', JSON.stringify(body, null, 2))
    const { template_id, data = {} } = body

    const EmailComponent = EmailComponents[template_id]

    console.log('>>> EmailComponent', EmailComponent)
    if (!EmailComponent) {
      return NextResponse.json(
        { error: `Email template "${template_id}" not found` },
        { status: 404 }
      )
    }

    const html = await render(React.createElement(EmailComponent, data))
    return NextResponse.json({ html })
  } catch (error) {
    console.log('>>> error', error)
    console.error('Email render error:', error)
    return NextResponse.json(
      error instanceof ValidationError
        ? {
            error: error.message,
            data: error.data,
          }
        : {
            error: error instanceof Error ? error.message : 'Invalid request',
          },
      { status: 400 }
    )
  }
}
