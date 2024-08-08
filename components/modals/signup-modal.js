import { Modal } from 'components/modal'
import { useStore } from 'util/store'
import { Signup as SignupForm } from 'components/forms/signup'

export function SignupModal() {
  const setModal = useStore((state) => state.setModal)
  return (
    <Modal variant="small">
      <h2>Signup</h2>
      <SignupForm onSuccess={() => setModal(null)} useForm={{showErrorBanner: true}} />
    </Modal>
  )
}
