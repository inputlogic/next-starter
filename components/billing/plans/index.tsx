'use client'

import { useQuery } from 'hooks/use-query'
import { useList, List, ListProvider } from 'components/list'
import { Form, useForm, SubmitButton } from 'components/form'
import { goToStripeCheckout } from 'components/billing/utils'
import { Suspense } from 'react'
import styles from './plans.module.scss'

interface Price {
  stripeId: string
  stripeData: {
    unitAmount: number
    recurring: {
      interval: string
    }
  }
}

interface Product {
  id: string
  stripeData: {
    name: string
    description?: string
  }
  prices: Price[]
}

interface PlanProps {
  product: Product
  trialPeriodDays?: number
  includeTrial?: boolean
  next?: string
  nextCancelled?: string
}

interface PlansContentProps {
  next?: string
  nextCancelled?: string
  includeTrial?: boolean
}

interface PlansProps extends PlansContentProps {}

const centsToDollars = (cents: number) => (cents / 100).toFixed(2)

const Plan = ({product, trialPeriodDays, includeTrial = true, next, nextCancelled}: PlanProps) => {
  const price = product.prices[0]
  const methods = useForm({
    onSubmit: () => goToStripeCheckout({state: {next, nextCancelled}, priceId: price.stripeId})
  })
  return <div className={styles.plan} >
    <h3>{product.stripeData.name}</h3>
    {product.stripeData.description && <div>{product.stripeData.description}</div>}
    <div>${centsToDollars(price.stripeData.unitAmount)}/{price.stripeData.recurring.interval}</div>
    {includeTrial && trialPeriodDays && <div>{trialPeriodDays} day free trial</div>}
    <Form methods={methods} >
      <SubmitButton>Subscribe</SubmitButton>
    </Form>
  </div>
}

const PlansContent = ({next = '/app', nextCancelled = '/app', includeTrial = true}: PlansContentProps) => {
  const list = useList({
    useQuery: (params) => {
      const trialQuery = useQuery<{trialPeriodDays: number}>({url: '/public/billing/trial-period'})
      const plansQuery = useQuery<{results: Product[]}>({url: '/public/billing/products', params})
      return {
        ...plansQuery,
        isLoading: trialQuery.isLoading || plansQuery.isLoading,
        isSuccess: trialQuery.isSuccess && plansQuery.isSuccess,
        data: plansQuery.data && trialQuery.data ? {
          ...plansQuery.data,
          ...trialQuery.data
        } : undefined
      } as any
    }
  })
  return <div>
    <ListProvider {...list} >
      <List>
        {(results: Product[]) => results.map(product =>
          <Plan
            key={product.id}
            product={product}
            includeTrial={includeTrial}
            next={next}
            nextCancelled={nextCancelled}
            trialPeriodDays={list.query.data?.trialPeriodDays}
          />
        )}
      </List>
    </ListProvider>
  </div>
}

export const Plans = (props: PlansProps) => {
  return (
    <Suspense fallback={<div>Loading plans...</div>}>
      <PlansContent {...props} />
    </Suspense>
  )
}