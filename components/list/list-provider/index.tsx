'use client'

import { createContext, useContext, ReactNode } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface ListContextValue {
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

const ListContext = createContext<ListContextValue | null>(null)

export const useListContext = (): ListContextValue => {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error('useListContext must be used within a ListProvider')
  }
  return context
}

interface ListProviderProps extends ListContextValue {
  children: ReactNode
}

export const ListProvider = ({ children, ...props }: ListProviderProps) => {
  return <ListContext.Provider value={props}>
    {children}
  </ListContext.Provider>
}