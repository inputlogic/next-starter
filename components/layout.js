import { Notification } from '@/components/notification'

import { Modals } from '@/components/modals'
import { LoginModal } from '@/components/modals/login-modal'

export const Layout = ({ children }) => {
  return (
    <>
      <Modals
        modals={{
          LoginModal
        }}
      />
      <Notification />
      {children}
    </>
  )
}