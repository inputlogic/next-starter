'use client'

import { useQuery } from 'hooks/use-query'
import { PortalForm } from 'components/billing/portal-form'

interface Card {
  expMonth: number
  expYear: number
}

interface PaymentMethod {
  stripeId: string
  stripeData: {
    card: Card
  }
}

interface Customer {
  stripeData: {
    invoiceSettings: {
      defaultPaymentMethod: string
    }
  }
}

interface SubscriptionData {
  status: string
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: number
  plan: {
    product: string
  }
  defaultPaymentMethod?: string
}

interface Subscription {
  stripeData: SubscriptionData & {
    defaultPaymentMethod?: string
  }
}

interface Product {
  id: string
  name: string
  stripeData: {
    name: string
  }
}

interface BillingData {
  customer: Customer
  currentSubscription?: Subscription
  paymentMethods?: PaymentMethod[]
}

interface ProductsData {
  results: Product[]
}

interface SubscriptionProps {
  subscription: SubscriptionData
  paymentMethod?: {
    card: Card
  }
  products: Array<{ id: string; name: string }>
}

const niceDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleString()

const willExpireSoon = (stripeData: { card: Card }) => {
  const { expMonth, expYear } = stripeData.card
  const expirationDate = new Date(expYear, expMonth)
  const now = new Date()
  const oneMonthFromNow = new Date()
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1)
  return oneMonthFromNow >= expirationDate && expirationDate > now
}

const hasExpired = (stripeData: { card: Card }) => {
  const { expMonth, expYear } = stripeData.card
  const expirationDate = new Date(expYear, expMonth)
  const now = new Date()
  return expirationDate < now
}

const Subscription = ({subscription, paymentMethod, products}: SubscriptionProps) => {
  const isActive = ['active', 'trialing'].includes(subscription.status)
  const product = products.find(p => p.id === subscription.plan.product)
  const hasPaymentMethod = Boolean(paymentMethod)
  const paymentMethodWillExpireSoon = paymentMethod && willExpireSoon(paymentMethod)
  const paymentMethodHasExpired = paymentMethod && hasExpired(paymentMethod)
  return <div>
    <h4>Current Subscription</h4>
    <div>name: {product?.name}</div>
    <div>status: {subscription.cancelAtPeriodEnd ? 'active (cancelled at period end)' : subscription.status}</div>
    {isActive && <>
      {!subscription.cancelAtPeriodEnd && <div>next billing period: {niceDate(subscription.currentPeriodEnd)}</div>}
      {subscription.cancelAtPeriodEnd && <div>subscription will be cancelled: {niceDate(subscription.currentPeriodEnd)}</div>}
    {!hasPaymentMethod && <div>warning: you do not have an active payment method, please use the billing portal to add one</div>}
    {paymentMethodWillExpireSoon && <div>warning: your payment method will expire soon, please use the billing portal to update your payment methods</div>}
    {paymentMethodHasExpired && <div>warning: your payment method has expired, please use the billing portal to update your payment methods</div>}
    </>}
  </div>
}

export const MyBilling = () => {
  const billing = useQuery<BillingData>({url: '/user/billing/my-billing'})
  const products = useQuery<ProductsData>({url: '/public/billing/products'})
  const {customer, currentSubscription, paymentMethods} = billing.data || {}
  const paymentMethod = paymentMethods?.find(pm => pm.stripeId === (currentSubscription?.stripeData as any)?.defaultPaymentMethod)
    || paymentMethods?.find(pm => pm.stripeId === customer?.stripeData.invoiceSettings.defaultPaymentMethod)
  return <div>
    {billing.isSuccess && products.isSuccess && currentSubscription && products.data && <Subscription products={products.data.results.map(p => ({ id: p.id, name: p.stripeData.name }))} subscription={currentSubscription.stripeData} paymentMethod={paymentMethod?.stripeData}/>}
    {billing.isSuccess && !currentSubscription && <div>This user does not have a subscription</div> }
    <br />
    <h4>Billing Portal</h4>
    <PortalForm state={{next: '/dev/billing'}} buttonText='Billing Portal' />
  </div>
}