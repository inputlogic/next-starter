import Head from 'next/head'
import { useStore } from 'util/store'
import { Loading } from 'components/loading'
import { Placeholder } from 'components/placeholder'
import { useQuery } from '@tanstack/react-query'
import { useUser } from 'hooks/useUser'

const Index = () => {
  const setModal = useStore((state) => state.setModal)
  const setNotification = useStore((state) => state.setNotification)

  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <h2>Home</h2>
      <button
        onClick={() =>
          setNotification({
            type: 'success',
            text: 'This is a notification',
            duration: 2000,
          })
        }
      >
        Show Notification
      </button>
      <Placeholder name="Home" />
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
