import { useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

import { store } from '@/util/store'


export default function Home() {
  const [count, setCount] = store.use(['erik', 'mom'], 0, {override: true})
  return (
    <>
      <h1>Yey {count}</h1>
      <button onClick={() => setCount(count + 1)}>Eriks Mom</button>
    </>
  )
}
