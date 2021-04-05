import Head from 'next/head'

import { useEffect } from 'react'
import { useStore } from '@/util/store'

export default function Home() {
  const count = useStore((state) => state.count)
  const setCount = useStore((state) => state.setCount)
  
  const posts = useStore((state) => state.posts)
  const setPosts = useStore((state) => state.setPosts)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((resp) => resp.json())
      .then((data) => {
        setPosts(data)
      })
  }, [])

  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <h1>Yey {count}</h1>
      <button onClick={() => setCount(count + 1)}>Eriks Mom</button>
      <h2>Posts</h2>
      {posts && posts.length === 0 && <strong>Loading posts...</strong>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}