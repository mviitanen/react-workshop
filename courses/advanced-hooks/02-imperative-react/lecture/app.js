import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { position } from './utils'
import './styles.scss'

function Portal({ children }) {
  const nodeRef = useRef(null)
  const [_, forceUpdate] = useState({})

  useLayoutEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    nodeRef.current = node // mutable ref
    forceUpdate({})
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return nodeRef.current ? ReactDOM.createPortal(children, nodeRef.current) : null
}

function Popover({ children, targetRef }) {
  const popoverRef = useRef()
  const [styles, setStyles] = useState({})

  function initPopoverRef(node) {
    if (!popoverRef.current && node) {
      popoverRef.current = node
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setStyles(position(targetRect, popoverRect))
    }
  }

  return (
    <Portal>
      <div
        onClick={event => {
          event.stopPropagation()
        }}
        className="popover"
        ref={initPopoverRef}
        style={{ position: 'absolute', ...styles }}
      >
        {children}
      </div>
    </Portal>
  )
}

function Define({ children }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef()

  useEffect(() => {
    const listener = event => {
      if (event.target !== buttonRef.current) {
        setOpen(false)
      }
    }
    window.addEventListener('click', listener)
    return () => {
      window.removeEventListener('click', listener)
    }
  }, [])

  return (
    <>
      <button onClick={() => setOpen(!open)} ref={buttonRef} className="as-link">
        {children}
      </button>
      {open && (
        <Popover targetRef={buttonRef}>Hooks are a way to compose behavior into components</Popover>
      )}
    </>
  )
}

export default function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>. They work with function-components and
      they give us an ability to use state and other React features similarly to class-based
      components.
    </p>
  )
}
