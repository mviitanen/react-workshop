import React, { useState, forwardRef } from 'react'

import { useId } from '../../useId'

export function Disclosure({ children, id, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const panelId = useId(id)

  function onSelect() {
    setIsOpen(!isOpen)
  }

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      panelId,
      onSelect,
      isOpen
    })
  })

  return children
}

export const DisclosureButton = forwardRef(
  ({ children, onSelect, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        onClick={onSelect}
        data-disclosure-button=""
        aria-controls={panelId}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

export const DisclosurePanel = forwardRef(
  ({ children, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <div
        id={panelId}
        {...props}
        data-disclosure-panel=""
        hidden={!isOpen}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)
