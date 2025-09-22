import Head from 'next/head'
import Link from 'next/link'

const Index = () => {
  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <div>
        <Link href='/dev'>Dev</Link>
      </div>
    </>
  )
}

export default Index
