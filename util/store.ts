import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface Notification {
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  [key: string]: unknown
}

interface StoreState {
  modal: string
  setModal: (modal: string) => void
  notification: Notification
  setNotification: (notification: Notification) => void
}

export const useStore = create<StoreState>()(
  devtools((set, get) => ({
    modal: '',
    setModal: (modal: string) => set({ modal }),
    notification: {},
    setNotification: (notification: Notification) => set({ notification }),
  }))
)