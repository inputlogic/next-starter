export const buildOpenApiTables = (openApiDoc, toolkit) => ({
  tables: Object.entries(openApiDoc.paths).reduce(
    (acc, [path, methods]) => ({
      ...acc,
      ...(!methods.get || path.endsWith('{id}')
        ? {}
        : {
            [toolkit.strings.pathToName(path)]: buildOpenApiTable({
              path,
              endpoint: methods.get,
              toolkit,
            }),
          }),
    }),
    {}
  ),
})

export const buildOpenApiTable = ({
  args,
  queries,
  path,
  endpoint,
  toolkit,
}) => {
  const Table = ({ customHeading, customCell }) => {
    const useResources = toolkit.queries[toolkit.strings.pathToQueryHook(path)]
    const [data] = useResources({ args, queries })
    // const { data } = useQuery([endpoint.description, server], () =>
    // get(`${server.url}${path}`)
    // )
    const resourceSchema =
      endpoint.responses[200].content['application/json'].schema.properties
        .resources.items.properties
    const keys = Object.keys(resourceSchema)
    if (!data) return 'loading table...'
    return (
      <>
        <table>
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{customHeading?.[key] || key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((result) => (
              <tr key={result.id}>
                {keys.map((key) => {
                  const render =
                    customCell?.[key] ||
                    ((value) =>
                      typeof value === 'object'
                        ? value === null
                          ? '-'
                          : JSON.stringify(value)
                        : value)
                  return (
                    <td key={`${result.id}-${key}`}>{render(result[key])}</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div>todo: add pagination</div>
      </>
    )
  }
  return {
    Table,
  }
}
