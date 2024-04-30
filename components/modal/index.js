import {classnames} from '/util/classnames'
import { useStore } from 'util/store'
import styles from './modal.module.scss'


export const Modal = ({ children, hideClose, variant }) => {
  const setModal = useStore((state) => state.setModal)
  return (
    <div
      className={classnames(styles['modal-container'], styles[variant])}
      onClick={(ev) => {
        if (ev.target.classList.contains('modal-component-container')) {
          setModal(null)
        }
      }}
    >
      <div className={classnames(styles['modal-content'], styles[variant])}>
        {!hideClose && (
          <div className={styles['close']} onClick={() => setModal(null)}>
            close
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
