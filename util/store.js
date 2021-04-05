import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStore = create(devtools(set => ({
  form: {},
  setForm: (form) => set(state => ({ form: Object.assign(state.form, form) })),
  
  count: 0,
  setCount: (count) => set({ count }),
  
  posts: [],
  setPosts: (posts) => set({ posts })
})))
