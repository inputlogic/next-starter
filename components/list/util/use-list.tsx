'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useMemo, ReactNode } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface UseListOptions {
  id?: string
  defaultParams?: Record<string, any>
  useQuery: (params: Record<string, any>) => UseQueryResult<any, any>
}

interface UseListReturn {
  router: AppRouterInstance
  params: Record<string, any>
  setParam: (
    name: string,
    value: any,
    options?: { removeIfFalsy?: boolean }
  ) => string
  removeParam: (name: string) => string
  count?: number
  query: UseQueryResult<any, any>
}

interface WithListParamsProps extends UseListOptions {
  children: (data: UseListReturn) => ReactNode
}

/**
 * Component wrapper for useList that uses searchParams in a Suspense boundary.
 * Use this component to wrap components that call useList.
 */
export function WithListParams({ children, id, defaultParams, useQuery }: WithListParamsProps) {
  const listData = useList({ id, defaultParams, useQuery })
  return children(listData)
}

/**
 * Hook for managing list state with URL search parameters.
 * Must be used in a component wrapped with Suspense boundary.
 */
export const useList = ({ id = 'l', defaultParams = { limit: 25 }, useQuery }: UseListOptions): UseListReturn => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Convert the searchParams to an object and filter for this list
  const params = useMemo(() => {
    const result = { ...defaultParams }

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith(`${id}.`)) {
        const paramName = key.slice(id.length + 1)
        result[paramName] = value
      }
    }

    return result
  }, [searchParams, id, defaultParams])

  const countQuery = useQuery({ ...params, limit: 0, offset: 0 })
  const query = useQuery(params)

  // Create a URL with updated search parameters
  const createUrl = (newParams: Record<string, string | null>) => {
    const urlSearchParams = new URLSearchParams()

    // Add existing params that aren't being modified
    for (const [key, value] of searchParams.entries()) {
      urlSearchParams.set(key, value)
    }

    // Add/update new params
    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        urlSearchParams.set(key, value)
      } else {
        urlSearchParams.delete(key)
      }
    }

    return `${pathname}?${urlSearchParams.toString()}`
  }

  return {
    router,
    params,
    setParam: (name: string, value: any, { removeIfFalsy = true } = { removeIfFalsy: true }) => {
      const paramName = queryName({ id, name })
      const params: Record<string, string | null> = {}

      // Remove offset when changing search params
      const offsetName = queryName({ id, name: 'offset' })
      params[offsetName] = null

      // Set or remove the parameter value
      if (removeIfFalsy && !value) {
        params[paramName] = null
      } else {
        params[paramName] = value
      }

      return createUrl(params)
    },
    removeParam: (name: string) => {
      const paramName = queryName({ id, name })
      const params: Record<string, string | null> = {}
      params[paramName] = null
      return createUrl(params)
    },
    count: countQuery.data?.count,
    query
  }
}

const queryName = ({ id, name }: { id?: string; name: string }): string =>
  id ? `${id}.${name}` : name
