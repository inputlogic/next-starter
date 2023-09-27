import { useRouter } from 'next/router'
import { Pagination } from 'components/admin/pagination'
import { Table as BaseTable, Th, Checkbox } from 'components/admin/table'
import { Loading } from 'components/loading'

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
  const Table = ({
    hasCheckbox = false,
    customHeading,
    customCell,
    pageSize = 10,
  }) => {
    const router = useRouter()
    const page = router.query.page || 1
    const ordering = router.query.ordering
    const useResources = toolkit.queries[toolkit.strings.pathToQueryHook(path)]
    const [_data, { count }] = useResources({
      args,
      query: { ...queries, offset: 0, limit: 0 },
    })
    const [data] = useResources({
      args,
      query: {
        ...queries,
        ordering,
        limit: pageSize,
        offset: Math.max(pageSize * (page - 1), 0),
      },
    })
    const resourceSchema =
      endpoint.responses[200].content['application/json'].schema.properties
        .resources.items.properties
    const keys = Object.keys(resourceSchema)
    return (
      <>
        <BaseTable>
          <thead>
            <tr>
              {hasCheckbox && (
                <Th>
                  <Checkbox key="check" />
                </Th>
              )}
              {keys.map((key) => (
                <Th
                  key={key}
                  isOrderable
                  isActiveUp={ordering === key}
                  isActiveDown={ordering === `-${key}`}
                  onClick={() => {
                    router.replace({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        ordering:
                          ordering === key
                            ? `-${key}`
                            : ordering === `-${key}`
                            ? ''
                            : key,
                      },
                    })
                  }}
                >
                  {customHeading?.[key] || key}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!data && (
              <tr>
                <td colSpan={1000}>
                  <Loading />
                </td>
              </tr>
            )}
            {data?.map((result, i) => (
              <tr key={i}>
                {hasCheckbox && (
                  <td key="checkbox">
                    <Checkbox key="check" />
                  </td>
                )}
                {keys.map((key, i) => {
                  if (i === 0) {
                    return (
                      <td key={i}>
                        <a href="#">{result[key]}</a>
                      </td>
                    )
                  }
                  const render =
                    customCell?.[key] ||
                    ((value) =>
                      typeof value === 'object'
                        ? value === null
                          ? '-'
                          : JSON.stringify(value)
                        : value)
                  return <td key={i}>{render(result[key])}</td>
                })}
              </tr>
            ))}
          </tbody>
        </BaseTable>
        <br />
        {count && (
          <Pagination
            pageCount={Math.ceil(count / pageSize)}
            page={page}
            hrefForPage={(page) => ({
              pathname: router.pathname,
              query: { ...router.query, page },
            })}
          />
        )}
      </>
    )
  }
  return {
    Table,
  }
}
