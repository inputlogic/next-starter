import { openapi } from 'util/openapi'

export const Page = () => {
  const Table = openapi.tables.adminUsers.Table
  return (
    <div style={{ padding: '2em' }}>
      <h1>Table</h1>
      <Table />
    </div>
  )
}

export default Page
