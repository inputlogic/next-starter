import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export const Portal = ({ children, className, id = 'portal-root' }) => {
  const [el, setEl] = useState(null)

  useEffect(() => {
    let tempEl = null;
    
    // Defer DOM manipulation with requestAnimationFrame
    const timer = requestAnimationFrame(() => {
      tempEl = document.createElement('div')
      const portalRoot = document.body
      portalRoot.appendChild(tempEl)
      tempEl.setAttribute('id', id)
      tempEl.setAttribute('class', className)

      setEl(tempEl)
    })

    return () => {
      cancelAnimationFrame(timer)
      // Clean up the element if it was created
      if (tempEl && document.body.contains(tempEl)) {
        document.body.removeChild(tempEl)
      }
    }
  }, [id, className])

  if (!el) return null

  return ReactDOM.createPortal(children, el)
}
