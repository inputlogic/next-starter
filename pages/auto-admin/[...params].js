import Link from 'next/link'
import { useRouter } from 'next/router'
import { openapi } from 'util/openapi'

const ResourceTable = ({ path }) => {
  const Table = openapi.tables[openapi.strings.pathToName(path)].Table
  return (
    <div>
      <Table
        customCell={{
          id: (id) => <Link href={`auto-admin${path}/${id}`}>{id}</Link>,
        }}
      />
    </div>
  )
}

const Edit = ({ params }) => {
  const id = params[params.length - 1]
  const openapiPath = ['', ...params.slice(1, -1), '{id}'].join('/')
  const name = openapi.strings.pathToName(openapiPath)
  console.log(openapiPath, name, openapi)
  const Form = openapi.forms[name].patch?.AutoForm
  if (Form) {
    return <Form id={id} />
  }
}

const Page = () => {
  const router = useRouter()
  console.log(router.query)
  const params = router.query.params
  const path = `/${params.join('/')}`
  const isListPage = isNaN(parseInt(params[params.length - 1]))
  return (
    <div>
      <h2>Auto Admin</h2>
      {isListPage && <ResourceTable path={path} />}
      {!isListPage && <Edit params={params} />}
    </div>
  )
}

export default Page
