import { openapi } from 'util/openapi'

console.log(openapi)

export const Page = () => {
  const Table = openapi.tables.adminUsers.Table
  return (
    <div>
      <h1>Table</h1>
      <Table />
    </div>
  )
}

export default Page
