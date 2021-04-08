import Head from 'next/head'

import { useEffect } from 'react'
import { useStore } from '@/util/store'

import { Layout } from '@/components/layout'

export default function Home() {
  const count = useStore((state) => state.count)
  const setCount = useStore((state) => state.setCount)
  
  const posts = useStore((state) => state.posts)
  const setPosts = useStore((state) => state.setPosts)
  
  const setModal = useStore((state) => state.setModal)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((resp) => resp.json())
    .then((data) => {
      setPosts(data)
    })
  }, [])
  
  const openLoginModal = () => {
    setModal('LoginModal')
  }

  return (
    <Layout>
      <Head>
        <title>Next Starter</title>
      </Head>
      <h1>Counter {count}</h1>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
      <br /><br />
      <button onClick={openLoginModal}>Log In Popup</button>
      <br /><br />
      <h2>Posts</h2>
      {posts && posts.length === 0 && <strong>Loading posts...</strong>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </Layout>
  )
}
