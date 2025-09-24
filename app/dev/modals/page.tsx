'use client'

import { Modal, useModal } from 'components/modal'
import { Button } from 'components/button'

export default function ModalsPage() {
  const modal = useModal('inline-modal')
  const modal2 = useModal('component-modal')
  return (
    <div>
      <h2>Modals</h2>
      <div>
        <Button onClick={() => modal.open()}>inline modal</Button>
      </div>
      <br />
      <div>
        <Button onClick={() => modal2.open()}>component modal</Button>
      </div>
      <Modal id={modal.id} close={modal.close}>
        <h1>Inline Modal Example</h1>
        <button onClick={() => modal.close()}>cancel</button>
      </Modal>
      <ComponentModal id={modal2.id} close={modal2.close} onClickOpenInlineModal={() => {modal.open()}} />
    </div>
  )
}

const ComponentModal = ({onClickOpenInlineModal, ...props}: {onClickOpenInlineModal: () => void, id: string, close: () => void}) => (
  <Modal id={props.id} close={props.close}>
    <h1>Component Modal Example</h1>
    <div><button onClick={() => props.close()}>cancel</button></div>
    <div><button onClick={() => onClickOpenInlineModal()}>open inline modal</button></div>
    <div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </Modal>
)
