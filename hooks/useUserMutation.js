import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { logoutSession } from 'hooks/session'

export const useUserMutation = (options) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    mutate: logoutSessionMutation,
    isLoading: logoutSessionIsLoading,
    isError: logoutSessionIsError,
    error: logoutSessionError,
  } = useMutation({
    queryKey: ['logout'],
    mutationFn: logoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries('basicSession')
      router.push('/')
    },
    onError: (error) => {
      console.error('Logout error', error)
    },
  })

  return {
    logoutSessionMutation,
    logoutSessionIsLoading,
    logoutSessionIsError,
    logoutSessionError,
  }
}
