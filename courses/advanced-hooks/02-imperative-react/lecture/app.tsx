import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { position } from './utils'
import './styles.scss'

const Portal: React.FC = ({ children }) => {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    setNode(node)
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return node ? ReactDOM.createPortal(children, node) : null
}

interface PopoverProps {
  targetRef: React.RefObject<HTMLElement | null | undefined>
}

const Popover: React.FC<PopoverProps> = ({ children, targetRef }) => {
  const [styles, setStyles] = useState({})
  const popoverRef = useRef<HTMLDivElement | null>(null)

  function initRef(node) {
    if (node && !popoverRef.current) {
      popoverRef.current = node
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setStyles(position(targetRect, popoverRect))
    }
  }

  return (
    <Portal>
      <div className="popover" style={{ position: 'absolute', ...styles }} ref={initRef}>
        {children}
      </div>
    </Portal>
  )
}

const Define: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const buttonRef = useRef()

  return (
    <>
      <button onClick={() => setOpen(!open)} className="as-link" ref={buttonRef}>
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
