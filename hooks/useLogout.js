import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { logoutSession } from 'hooks/session'

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: logoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicSession'] })
    },
    onError: (error) => {
      console.error('Logout error', error)
    },
  })

  const handleLogout = async () => {
    await logoutMutation.mutateAsync()
    router.push('/')
  }

  return { handleLogout }
}
