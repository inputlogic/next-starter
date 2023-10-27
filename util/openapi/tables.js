import { useRouter } from 'next/router'
import Link from 'next/link'
import { camelCaseToSnakeCase } from 'util/case'
import { Pagination } from 'components/admin/pagination'
import { Table as BaseTable, Th, Checkbox } from 'components/admin/table'
import { Input } from 'components/admin/input'
import { Filters } from 'components/admin/filters'
import { Clear } from 'components/admin/filters/clear'
import { Loading } from 'components/loading'

const noNulls = (obj) =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    if (v === null || v === '') {
      return acc
    }
    acc[k] = v
    return acc
  }, {})

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

const parseQuery = (id, query) =>
  Object.entries(query).reduce((acc, [k, v]) => {
    if (k.startsWith(`${id}.`)) {
      if (k.startsWith(`${id}.f.`)) {
        acc.filters = {
          ...(acc.filters || {}),
          [k.slice(id.length + 3)]: v,
        }
      } else {
        acc[k.slice(id.length + 1)] = v
      }
    }
    return acc
  }, {})

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
    detailRoute,
    id = 'table',
    pageSize = 10,
  }) => {
    const router = useRouter()
    const useResources = toolkit.queries[toolkit.strings.pathToQueryHook(path)]
    const query = parseQuery(id, router.query)
    const page = query.page || 1
    const ordering = query.ordering
    const [_data, { count }] = useResources({
      args,
      query: { ...queries, ...(query.filters || {}), offset: 0, limit: 0 },
    })
    const [data] = useResources({
      args,
      query: {
        ...queries,
        ...(query.filters || {}),
        ordering,
        limit: pageSize,
        offset: Math.max(pageSize * (page - 1), 0),
      },
    })
    const resourceSchema =
      endpoint.responses[200].content['application/json'].schema.properties
        .resources.items.properties
    const keys = Object.keys(resourceSchema)
    const onChangeQuery = (name, value) => {
      router.replace({
        pathname: router.pathname,
        query: noNulls({
          ...router.query,
          [`${id}.page`]: 1,
          [`${id}.f.${name}`]: value,
        }),
      })
    }
    return (
      <>
        <Filters>
          <Input
            value={query.filters?.search || ''}
            placeholder="Search..."
            onChange={(ev) => {
              ev.preventDefault()
              onChangeQuery('search', ev.target.value)
            }}
          />
          {Object.keys(query.filters || {}).length > 0 && (
            <Clear
              onClick={() => {
                router.replace({
                  pathname: router.pathname,
                  query: Object.entries(router.query).reduce(
                    (acc, [k, v]) =>
                      k.startsWith(`${id}.f.`) ? acc : { ...acc, [k]: v },
                    {}
                  ),
                })
              }}
            >
              clear
            </Clear>
          )}
        </Filters>
        <br />
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
                    const snakeKey = camelCaseToSnakeCase(key)
                    router.replace({
                      pathname: router.pathname,
                      query: noNulls({
                        ...router.query,
                        [`${id}.ordering`]:
                          ordering === snakeKey
                            ? `-${snakeKey}`
                            : ordering === `-${snakeKey}`
                            ? ''
                            : snakeKey,
                      }),
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
            {data?.length === 0 && (
              <tr>
                <td
                  colSpan={1000}
                  style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    opacity: '0.5',
                  }}
                >
                  No results
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
                        <Link href={detailRoute?.(result) || '#'}>
                          {result[key]}
                        </Link>
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
                        : typeof value === 'boolean'
                        ? value
                          ? 'Yes'
                          : 'No'
                        : value)
                  return <td key={i}>{render(result[key])}</td>
                })}
              </tr>
            ))}
          </tbody>
        </BaseTable>
        <br />
        {!!count && (
          <Pagination
            pageCount={Math.ceil(count / pageSize)}
            page={page}
            hrefForPage={(page) => ({
              pathname: router.pathname,
              query: { ...router.query, [`${id}.page`]: page },
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
