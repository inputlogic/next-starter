import {
  Button,
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
  Row,
  Column,
} from '@react-email/components'
import * as React from 'react'

const definition = {
  name: 'Purchase',
  description: 'Example email for a purchase with multiple items',
  version: 'purchase-confirmation-v1',
  schema: {
    type: 'object',
    required: ['items', 'order_number'],
    properties: {
      subject: {
        type: 'string',
        default: 'Purchase Confirmation',
      },
      email: {
        type: 'string',
        format: 'email',
      },
      order_number: {
        type: 'number',
      },
      total: {
        type: 'number',
      },
      languages: {
        type: 'array',
        items: {
          type: 'string',
        },
        default: ['en'],
      },
      theme: {
        type: 'string',
        default: 'default',
      },
      items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            image: {
              type: 'string',
            },
          },
          required: ['name', 'details', 'price', 'image'],
        },
        default: [
          {
            name: 'Premium Subscription',
            details: '1-year premium plan with all features included',
            price: 99.99,
            image: 'https://via.placeholder.com/60x60?text=Premium',
          },
        ],
      },
    },
  },
}

export const Purchase = ({
  subject = definition.schema.properties.subject.default,
  email,
  order_number,
  total,
  languages = definition.schema.properties.languages.default,
  theme = definition.schema.properties.theme.default,
  items = definition.schema.properties.items.default,
}) => {
  const calculatedTotal = total || items.reduce((sum, item) => sum + item.price, 0)

  return (
    <Html>
      <Head />
      <Body
        style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4' }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <Text
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
            {subject}
          </Text>

          <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
            Thank you for your purchase! Here's your order summary for order #{order_number}:
          </Text>

          <Section
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px',
            }}
          >
            {items.map((item, index) => (
              <div key={index}>
                <Row style={{ marginBottom: '16px' }}>
                  <Column style={{ width: '60px', paddingRight: '16px' }}>
                    <Img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      height="60"
                      style={{ borderRadius: '4px' }}
                    />
                  </Column>
                  <Column style={{ verticalAlign: 'top' }}>
                    <Text
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {item.details}
                    </Text>
                    <Text
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#2563eb',
                        margin: '0',
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </Text>
                  </Column>
                </Row>
                {index < items.length - 1 && (
                  <Hr style={{ margin: '16px 0', borderColor: '#e0e0e0' }} />
                )}
              </div>
            ))}

            <Hr
              style={{
                margin: '20px 0',
                borderColor: '#d0d0d0',
                borderWidth: '2px',
              }}
            />

            <Row>
              <Column>
                <Text
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'right',
                    margin: '0',
                  }}
                >
                  Total: ${calculatedTotal.toFixed(2)}
                </Text>
              </Column>
            </Row>
          </Section>

          <Button
            href="https://example.com/account"
            style={{
              background: '#2563eb',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            View Order Details
          </Button>

          <Text style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
            If you have any questions about your order, please contact our
            support team.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}


Purchase.schema = definition.schema
Purchase.definition = definition

export default Purchase
