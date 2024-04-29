import { useEffect } from 'react'
import { useStore } from 'util/store'

// add no-scroll class to body when
// modal is visible
const useNoScrollClass = (modal) => {
  useEffect(() => {
    if (!modal) return
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [modal])
}

// remove modal on click outside modal
const useModalClickListener = () => {
  const setModal = useStore((state) => state.setModal)
  useEffect(() => {
    const cb = (ev) => {
      if (ev.target.classList.contains('modal-container')) {
        setModal(null)
      }
    }
    document.body.addEventListener('click', cb)
    return () => document.body.removeEventListener('click', cb)
  }, [])
}

export const Modals = ({ modals }) => {
  const modalName = useStore((state) => state.modal)
  useNoScrollClass(modalName)
  useModalClickListener()
  if (!modalName) return null
  const Match = modals[modalName]
  if (!Match) console.warn('no modal named ', modalName)
  return <Match />
}
