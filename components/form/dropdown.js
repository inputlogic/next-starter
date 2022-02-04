import { useEffect } from 'react'
import { useStore } from 'util/store'

const isInsideElementWithClassName = (className, el) => {
  if (el.classList && el.classList.contains(className)) return true
  while (el.parentNode) {
    el = el.parentNode
    if (el.classList && el.classList.contains(className)) {
      return true
    }
  }
  return false
}

export const Dropdown = ({ uid, children, className }) => {
  const dropdown = useStore((state) => state.dropdown)
  return (
    <div
      className={`dropdown-component ${className || ''} ${
        dropdown === uid ? 'open' : 'closed'
      }`}
    >
      {children}
    </div>
  )
}

export const DropdownTrigger = ({ uid, className, children, ...props }) => {
  const dropdown = useStore((state) => state.dropdown)
  const setDropdown = useStore((state) => state.setDropdown)

  const bodyClick = (ev) => {
    if (!dropdown) {
      return
    }
    if (ev.target?.dataset?.dropdownclose === 'true') {
      return setDropdown(null)
    }
    if (ev.target?.dataset?.dropdown === 'true') {
      return
    }
    if (isInsideElementWithClassName('dropdown-trigger', ev.target)) {
      setDropdown(null)
    }
    if (isInsideElementWithClassName('dropdown-component', ev.target)) {
      setDropdown(null)
    }
    setDropdown(null)
  }

  useEffect(() => {
    document.body.addEventListener('click', bodyClick)
    return () => {
      document.body.removeEventListener('click', bodyClick)
    }
  }, [dropdown])

  return (
    <button
      className={`dropdown-trigger ${className}`}
      onClick={() => setDropdown(uid)}
      {...props}
    >
      {children}
    </button>
  )
}
