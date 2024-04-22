import { Notification } from 'components/notification/'
import { Modals } from 'components/modals'
import { ForgotPasswordModal } from 'components/modals/forgot-password-modal'
import { LoginModal } from 'components/modals/login-modal'
import { SignupModal } from 'components/modals/signup-modal'
import { TemporaryNav } from 'components/temporary-nav'
import { SvgDefs } from 'components/svg-defs'

export const BaseLayout = ({ children }) => {
  return (
    <>
      <TemporaryNav />
      <Modals
        modals={{
          ForgotPasswordModal,
          LoginModal,
          SignupModal,
        }}
      />
      <Notification />
      {children}
      <SvgDefs />
    </>
  )
}
