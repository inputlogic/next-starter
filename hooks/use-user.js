import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { get, post } from 'util/api'
import { useStore } from 'util/store'

/**
 * Authenticate current user against server session.
 */
export function useUser() {
  const queryClient = useQueryClient()
  const setNotification = useStore((state) => state.setNotification)

  // Main user object
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
    isFetching: userIsFetching,
  } = useQuery('user', fetchUser)

  // Register new user
  const registerUser = useMutation(
    (data) => {
      return registerUserPost(data)
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
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData('user', data)
      },
    }
  )

  // Login existing user
  const loginUser = useMutation(
    (data) => {
      return loginUserPost(data)
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
    },
    {
      onSuccess: (data) => {
        console.log('login successful', data)
        queryClient.setQueryData('user', data)
        // queryClient.invalidateQueries('user')
      },
    }
  )

  // Logout user
  const logoutUser = useMutation(
    () => {
      return logoutUserPost()
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('user')
      },
    }
  )

  return {
    user,
    userIsLoading,
    userIsError,
    userError,
    userIsFetching,
    registerUser,
    loginUser,
    logoutUser,
  }
}

// Fetch current logged-in user from API route with iron-session
export async function fetchUser() {
  return {} // @TODO: remove once backend is created
  const user = await get('/api/user')
  if (user?.token) {
    return user
  }
}

// Create new user
async function registerUserPost(data) {
  const { token, user } = await post('/api/signup', data)
  if (token && user) {
    return { token, user }
  } else {
    Promise.reject('Error')
  }
}

// Validate user login
async function loginUserPost(data) {
  const { token, user } = await post('/api/login', data)
  if (token && user) {
    return { token, user }
  } else {
    Promise.reject('Error')
  }
}

// Hit logout endpoint
async function logoutUserPost() {
  const { loggedOut } = await post('/api/logout', null)
  if (loggedOut) {
    return { status: loggedOut }
  } else {
    Promise.reject('Error')
  }
}
