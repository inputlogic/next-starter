import Head from 'next/head'

import { useEffect } from 'react'
import { useStore } from 'util/store'
import { apiUrl } from 'util/urls'

const Index = () => {
  const setModal = useStore((state) => state.setModal)
  const setNotification = useStore((state) => state.setNotification)

  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <h2>Home</h2>
      <button onClick={() => setModal('SignupModal')}>Signup</button>
      <button
        onClick={() =>
          setNotification({
            type: 'error',
            text: 'This is a notification',
            duration: 2000,
          })
        }
      >
        Show Notification
      </button>
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
