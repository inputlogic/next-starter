import { Notification } from '@/components/notification'
import { Modals } from '@/components/modals'
import { LoginModal } from '@/components/modals/login-modal'
import { useStore} from '@/util/store'

export const Layout = ({ children }) => {
  const setModal = useStore(state => state.setModal)
  const modal = useStore(state => state.modal)
  return (
    <>
      <Modals value={modal} syncState={setModal}>
        <LoginModal />
      </Modals>
      <Notification />
      {children}
    </>
  )
}