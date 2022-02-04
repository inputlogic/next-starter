import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { get } from 'util/api'
import { useStore } from 'util/store'

/**
 * Authenticate current user against server session.
 */
export function useUser() {
  const user = useQuery('user', fetchUser)

  return { user }
}

// Fetch current logged-in user from API route with iron-session
export async function fetchUser() {
  const user = await get('/api/user')

  if (user?.data?.token) {
    console.log('fetch user', user)
    return user
  }
}
