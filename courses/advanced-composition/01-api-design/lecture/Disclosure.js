import React, { useState, forwardRef, useRef } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
// import { useId } from '../../useId'

let id = 0
function useId() {
  const { current } = useRef(++id)
  return current
}

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const id = useId()
  const panelId = `disclosure-panel-${id}`

  function onSelect() {
    setIsOpen(!isOpen)
    if (typeof onChange === 'function') {
      onChange(!isOpen)
    }
  }

  children = React.Children.map(children, child => {
    return React.cloneElement(child, { onSelect, isOpen, panelId })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, onSelect, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = React.forwardRef(
  ({ children, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        id={panelId}
        ref={forwardedRef}
        data-disclosure-panel=""
        data-state={isOpen ? 'open' : 'collapsed'}
        hidden={!isOpen}
      >
        {children}
      </div>
    )
  }
)

DisclosurePanel.displayName = 'DisclosurePanel'
