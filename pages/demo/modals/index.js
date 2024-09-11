import { Modal, useModal } from 'components/modal'
import { Button } from 'components/button'

export const ModalsPage = () => {
  const modal = useModal('inline-modal')
  const modal2 = useModal('component-modal')
  return <div>
    <h2>Modals</h2>
    <div>
      <Button onClick={() => modal.open()} >inline modal</Button>
    </div>
    <br />
    <div>
      <Button onClick={() => modal2.open()} >component modal</Button>
    </div>
    <Modal {...modal}>
      <h1>Inline Modal Example</h1>
      <button onClick={() => modal.close()}>cancel</button>
    </Modal>
    <ComponentModal {...modal2} onClickOpenInlineModal={() => {modal.open()}} />
  </div>
}

const ComponentModal = ({onClickOpenInlineModal, ...props}) =>
  <Modal {...props} >
    <h1>Component Modal Example</h1>
    <div><button onClick={() => props.close()}>cancel</button></div>
    <div><button onClick={() => onClickOpenInlineModal()}>open inline modal</button></div>
  </Modal>

ModalsPage.Layouts = ['DemoLayout']
export default ModalsPage