
const WARNING = `
Unable to locate modal. Make sure to provide an id to useModal, and to pass the result of useModal along to a Modal component.

const modal = useModal('my-identifier')

return <Modal {...modal}>
  <h1>Example</h1>
  <button onClick={() => modal.close()}>Close modal</button>
</Modal>
`.trim()

export const useModal = (id) => {
  return {
    open: () => {
      const dialog = document.getElementById(id)
      if (!dialog) console.warn(WARNING)
      document.querySelectorAll('dialog[open]').forEach(openDialog => {
        openDialog !== dialog && openDialog.close()
      })
      dialog?.showModal()
    },
    close: () => {
      const dialog = document.getElementById(id)
      if (!dialog) console.warn(WARNING)
      dialog?.close()
    },
    id,
  }
}
