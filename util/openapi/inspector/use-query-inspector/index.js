import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import { useState } from 'react'
import { useOpenapiToolkit } from 'util/openapi/use-openapi-toolkit'

const QueryInspector = ({ useQuery }) => {
  const response = useQuery()
  return (
    <div>
      <JsonView src={response} />
    </div>
  )
}

export const UseQueryInspector = () => {
  const openapi = useOpenapiToolkit()
  const [query, setQuery] = useState()
  return (
    <div>
      <h1>useQuery Inspector</h1>
      {openapi && (
        <div>
          <select onChange={(ev) => setQuery(ev.target.value)}>
            <option value="" />
            {Object.keys(openapi.queries).map((query) => (
              <option key={query} value={query}>
                {query}
              </option>
            ))}
          </select>
        </div>
      )}
      {openapi && query && <QueryInspector useQuery={openapi.queries[query]} />}
    </div>
  )
}
