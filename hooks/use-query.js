import { useQuery as useQueryBase } from '@tanstack/react-query'
import { axiosClient } from 'util/axios-client'

export const useQuery = ({url, args, params, ...rest}) => useQueryBase({
  queryKey: [url, args, params],
  queryFn: async () => {
    // TODO: apply args and params
    const response = await axiosClient.get(url)
    return response.data
  },
  ...rest
})

