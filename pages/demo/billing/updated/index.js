import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { axiosClient } from 'util/axios-client'
import { base64ToJson } from 'util/base64'

const CheckoutPage = () => {
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) return
    const state = base64ToJson(router.query.state)
    const isCancelled = router.query.cancelled
    const nextCancelled = state.nextCancelled
    const checkoutComplete = async () => {
      await axiosClient.post('/user/billing/billing-updated')
      router.replace((isCancelled && nextCancelled) || state.next || '/app')
    }
    checkoutComplete()
  }, [router.isReady])
  return <div>Loading...</div>
}

export default CheckoutPage

