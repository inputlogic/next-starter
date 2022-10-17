import { useRouter } from 'next/router'
import { Modal } from 'components/modals'
import { useStore } from '@/util/store'

export function LoginModal() {
  const router = useRouter()
  const setModal = useStore((state) => state.setModal)

  return (
    <Modal variant="small">
      <h2>Empty Modal</h2>
      <p>Content</p>
    </Modal>
  )
}
