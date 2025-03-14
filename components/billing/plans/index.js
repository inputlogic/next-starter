import { useQuery } from 'hooks/use-query'
import { useList, List, ListProvider } from 'components/list'
import { Form, useForm, SubmitButton } from 'components/form'
import { goToStripeCheckout } from 'components/billing/utils'
import { Suspense } from 'react'
import styles from './plans.module.scss'

const centsToDollars = (cents) => (cents / 100).toFixed(2)

const Plan = ({product, trialPeriodDays, includeTrial = true, next, nextCancelled}) => {
  const price = product.prices[0]
  const methods = useForm({
    onSubmit: () => goToStripeCheckout({state: {next, nextCancelled}, priceId: price.stripeId})
  })
  return <div className={styles.plan} >
    <h3>{product.stripeData.name}</h3>
    {product.stripeData.description && <div>{product.stripeData.description}</div>}
    <div>${centsToDollars(price.stripeData.unitAmount)}/{price.stripeData.recurring.interval}</div>
    {includeTrial && <div>{trialPeriodDays} day free trial</div>}
    <Form methods={methods} >
      <SubmitButton>Subscribe</SubmitButton>
    </Form>
  </div>
}

const PlansContent = ({next = '/app', nextCancelled = '/app', includeTrial = true}) => {
  const list = useList({
    useQuery: params => {
      const trialQuery = useQuery({url: '/public/billing/trial-period'})
      const plansQuery = useQuery({url: '/public/billing/products', params})
      return {
        ...plansQuery,
        isLoading: trialQuery.isLoading || plansQuery.isLoading,
        isSuccess: trialQuery.isSuccess || plansQuery.isSuccess,
        data: plansQuery.data && trialQuery.data && {
          ...plansQuery.data,
          ...trialQuery.data
        }
      }
    }
  })
  return <div>
    <ListProvider {...list} >
      <List>
        {results => results.map(product =>
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

export const Plans = (props) => {
  return (
    <Suspense fallback={<div>Loading plans...</div>}>
      <PlansContent {...props} />
    </Suspense>
  )
}

