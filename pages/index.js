import Head from 'next/head'

import { useEffect } from 'react'
import { useStore } from '@/util/store'
import { apiUrl } from '@/util/urls'

const Index = () => {
  const setModal = useStore((state) => state.setModal)

  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <h2>Home</h2>
      <button onClick={() => setModal('SignupModal')}>Signup</button>
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
