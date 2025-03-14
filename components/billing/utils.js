import { axiosClient } from 'util/axios-client'
import { base64FromJson } from 'util/base64'

const currentUrl = () => `${window.location.protocol}//${window.location.host}`

export const goToStripeCheckout = async ({state = {}, priceId}) => {
  const response = await axiosClient.post(
    '/user/billing/checkout-session',
    {
      successUrl: `${currentUrl()}/dev/billing/updated?state=${base64FromJson(state)}`,
      cancelUrl: `${currentUrl()}/dev/billing/updated?state=${base64FromJson(state)}&cancelled=True`,
      priceId
    }
  )
  const { url } = response.data
  window.location.href = url
}

export const goToStripePortal = async (state = {}) => {
  const response = await axiosClient.post(
    '/user/billing/portal',
    {
      returnUrl: `${currentUrl()}/dev/billing/updated?state=${base64FromJson(state)}`
    }
  )
  const { url } = response.data
  window.location.href = url
}

