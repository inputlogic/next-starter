'use client'

import { useEffect, useState, ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: ReactNode
  className?: string
  id?: string
}

export const Portal = ({ children, className, id = 'portal-root' }: PortalProps) => {
  const [el, setEl] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    let tempEl: HTMLDivElement | null = null

    // Defer DOM manipulation with requestAnimationFrame
    const timer = requestAnimationFrame(() => {
      tempEl = document.createElement('div')
      const portalRoot = document.body
      portalRoot.appendChild(tempEl)
      tempEl.setAttribute('id', id)
      if (className) {
        tempEl.setAttribute('class', className)
      }

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