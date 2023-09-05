import Link from 'next/link'
import { openapi } from 'util/openapi'

const Page = () => {
  return (
    <div>
      <h2>Auto Admin</h2>
      <div>
        {Object.entries(openapi.doc.paths)
          .filter(
            ([path, methods]) => !path.includes('{id}') && methods.get
            // path.startsWith('/map-admin') &&
          )
          .map(([path]) => (
            <div key={path}>
              <Link href={`/auto-admin${path}`}>{path}</Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Page
