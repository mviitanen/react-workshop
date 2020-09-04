import React, { useState, forwardRef, useRef } from 'react'

// Import or write our own:
import { useId } from '../../useId'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const disclosureId = useId()
  const panelId = `disclosure-${disclosureId}-panel`

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      onSelect,
      isOpen,
      panelId
    })
  })

  return <div className="disclosure">{children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, onSelect, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-disclosure-button=""
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, isOpen, panelId, ...props }) => {
  return (
    <div {...props} id={panelId} data-disclosure-panel="" hidden={!isOpen}>
      {children}
    </div>
  )
}
