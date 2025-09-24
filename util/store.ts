import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface Notification {
  text?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface StoreState {
  modal: string
  setModal: (modal: string) => void
  notification: Notification
  setNotification: (notification: Notification) => void
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    modal: '',
    setModal: (modal: string) => set({ modal }),
    notification: {},
    setNotification: (notification: Notification) => set({ notification }),
  }))
)
