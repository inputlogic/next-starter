import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { get, post } from 'util/api'
import { useStore } from 'util/store'

/**
 * Authenticate current user against server session.
 */
export const useUser = () => {
	const reactQuery = useQuery('user', async () => {
		const user = await get('/api/user')
		if (user?.token) {
			return user
		}
	})
	return [reactQuery.data, reactQuery]
}

export const useLogoutUserMutation = () => {
 const queryClient = useQueryClient()
 return useMutation(
    async () => {
			const { loggedOut } = await post('/api/logout', null)
			if (loggedOut) {
				return { status: loggedOut }
			} else {
				throw 'Error'
			}
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('user')
      },
    }
  )
}

export const useSignupUserMutation = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async () => {
			const { token, user } = await post('/api/signup', data)
			if (token && user) {
				return { token, user }
			} else {
				throw 'Error'
			}
		},
		{
			onError: (error) => {
				setNotification({
					type: 'error',
					text: error?.data?.data?.email
					? error.data.data.email[0]
					: error.message,
				})
			},
			onSuccess: (data) => {
				queryClient.setQueryData('user', data)
			},
		}
	)
}
export const useLoginUserMutation = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async () => {
      const { token, user } = await post('/api/login', data)
      if (token && user) {
        return { token, user }
      } else {
        throw 'Error'
      }
    },
    {
      onError: (error) => {
        setNotification({
          type: 'error',
          text: error?.data?.data?.non_field_errors
            ? error.data.data.non_field_errors[0]
            : error.message,
        })
      },
      onSuccess: (data) => {
        queryClient.setQueryData('user', data)
      },
    },
  )
}
