import { useQuery as useQueryBase, UseQueryOptions } from '@tanstack/react-query'
import { axiosClient } from 'util/axios-client'

interface UseQueryParams {
  url: string
  args?: Record<string, string | number>
  params?: Record<string, any>
}

export const useQuery = <TData = any, TError = unknown>({
  url,
  args,
  params,
  ...rest
}: UseQueryParams & Partial<UseQueryOptions<TData, TError>>) => {
  const defaultQueryKey = [url, args, params]
  const defaultQueryFn = async () => {
    const response = await axiosClient.get<TData>(replacePathParams(url, args), { params })
    return response.data
  }

  return useQueryBase<TData, TError>({
    queryKey: defaultQueryKey,
    queryFn: defaultQueryFn,
    ...rest
  })
}

const replacePathParams = (path: string, args?: Record<string, string | number>): string =>
  path.replace(/:([^/]+)/g, (_, key) => args?.[key]?.toString() ?? '')