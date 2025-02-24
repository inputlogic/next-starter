import { omit } from 'ramda'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

/**
 * Custom hook to manage list query parameters and router interactions.
 *
 * The returned object should be passed along to ListProvider, eg.
 * const result = useList(...)
 * return <ListProvider {...result} >...</ListProvider>
 * 
 * @param {Object} options - Configuration options.
 * @param {string} [options.id='l'] - The identifier prefix for query parameters.
 * @param {Object} [options.defaultParams={limit: 25}] - Default query parameters.
 * @param {Function} options.useQuery - Hook to perform the query. It will be given the current params and should return a react-query useQuery result
 * 
 * @returns {Object} An object containing router, parameters, and methods to manipulate query parameters.
 * @returns {Object} return.router - The next router (the result of useRouter()).
 * @returns {Object} return.params - The current query parameters for the list.
 * @returns {Function} return.setParam - Function to set a query parameter.
 * @param {string} return.setParam.name - The name of the parameter.
 * @param {string} return.setParam.value - The value of the parameter.
 * @param {Object} [return.setParam.options={removeIfFalsy: true}] - Options for setting the parameter.
 * @param {boolean} [return.setParam.options.removeIfFalsy=true] - Flag to remove the parameter if the value is falsy.
 * @returns {Function} return.removeParam - Function to remove a query parameter.
 * @param {string} return.removeParam.name - The name of the parameter to remove.
 * @returns {number|undefined} return.count - The count of items from the count query.
 * @returns {Object} return.query - The result of the query (the result of calling the useQuery passed as an argument).
 */
export const useList = ({id = 'l', defaultParams = {limit: 25}, useQuery}) => {
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
  
  const countQuery = useQuery({...params, limit: 0, offset: 0})
  const query = useQuery(params)
  
  // Create a URL with updated search parameters
  const createUrl = (newParams) => {
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
    setParam: (name, value, {removeIfFalsy = true} = {removeIfFalsy: true}) => {
      const paramName = queryName({id, name})
      const params = {}
      
      // Remove offset when changing search params
      const offsetName = queryName({id, name: 'offset'})
      params[offsetName] = null
      
      // Set or remove the parameter value
      if (removeIfFalsy && !value) {
        params[paramName] = null
      } else {
        params[paramName] = value
      }
      
      return createUrl(params)
    },
    removeParam: (name) => {
      const paramName = queryName({id, name})
      const params = {}
      params[paramName] = null
      return createUrl(params)
    },
    count: countQuery.data?.count,
    query
  }
}

const queryName = ({id, name}) => id ? `${id}.${name}` : name
