import { createContext, useContext } from 'react'

const ListContext = createContext(null)

export const useListContext = () =>
  useContext(ListContext)

export const ListProvider = ({children, ...props}) => {
  return <ListContext.Provider value={props}>
    {children}
  </ListContext.Provider>
}
