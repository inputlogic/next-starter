import Head from 'next/head'

import { Avatar } from '@/components/elements/avatar'

export default function Elements() {
  return(
    <>
      <Head>
        <title>Elements example</title>
      </Head>
      
      <Avatar />
    </>
  )
}