'use client'

import { Plans } from 'components/billing/plans'
import { MyBilling } from 'components/billing/my-billing'

export default function BillingPage() {
  return (
    <div>
      <h1>Billing Demo</h1>
      <Plans />
      <MyBilling />
    </div>
  )
}
