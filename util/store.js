import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useStore = create(persist(devtools((set, get) => ({
  token: null,
  setToken: (token) => set({ token }),

  user: null,
  setUser: (user) => set({ user }),

  setUserAndToken: (user, token) => set({ user, token }),

  form: {},
  setForm: (form) => set(state => ({ form: Object.assign(state.form, form) })),

  modal: '',
  setModal: (modal) => set({ modal })
})), {
  name: 'store',
  getStorage: () => sessionStorage
}))
