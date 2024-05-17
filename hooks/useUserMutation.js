import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { logoutSession } from 'hooks/session'

export const useUserMutation = (options) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return {}
}
