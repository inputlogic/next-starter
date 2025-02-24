'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { axiosClient } from 'util/axios-client'
import { base64ToJson } from 'util/base64'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const state = base64ToJson(searchParams.get('state') || '')
    const isCancelled = searchParams.get('cancelled')
    const nextCancelled = state.nextCancelled
    
    const checkoutComplete = async () => {
      try {
        await axiosClient.post('/user/billing/billing-updated')
        const redirectPath = (isCancelled && nextCancelled) || state.next || '/demo'
        router.push(redirectPath)
      } catch (error) {
        console.error('Error completing checkout:', error)
        router.push('/demo/billing')
      }
    }
    
    checkoutComplete()
  }, [router, searchParams])
  
  return <div>Loading...</div>
}