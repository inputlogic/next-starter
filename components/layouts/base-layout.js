import Link from 'next/link'

import { Notification } from '@/components/notification'
import { Modals } from '@/components/modals'
import { LoginModal } from '@/components/modals/login-modal'

const BaseLayout = ({ children }) => {
  return (
    <>
      <Modals
        modals={{
          LoginModal
        }}
      />
      <Notification />

      <h1>Next Starter</h1>

      <nav>
        <Link href='/'>Home</Link>&nbsp;|&nbsp;
        <Link href='/admin'>Admin</Link>
      </nav>

      <br />

      {children}
    </>
  )
}

export default BaseLayout
