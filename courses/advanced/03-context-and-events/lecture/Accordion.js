import React, { useState, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { wrapEvent } from '../../utils'
import { useId } from '../../useId'

/**
 * Accordion
 */

const AccordionContext = React.createContext()

export const Accordion = forwardRef(
  (
    { children, defaultIndex = 0, onChange, id, ...props },
    forwardedRef
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
    const accordionId = useId(id)

    children = React.Children.map(children, (child, index) => {
      const panelId = `accordion-${accordionId}-panel-${index}`
      const buttonId = `accordion-${accordionId}-button-${index}`
      const context = {
        buttonId,
        panelId,
        selected: selectedIndex === index,
        selectPanel: () => {
          onChange && onChange(index)
          setSelectedIndex(index)
        }
      }
      return (
        <AccordionContext.Provider value={context} children={child} />
      )
    })

    return (
      <div data-accordion="" ref={forwardedRef} {...props}>
        {children}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'
Accordion.propTypes = {
  onChange: PropTypes.func
}

/**
 * Accordion Item
 */

export const AccordionItem = forwardRef(
  ({ children, ...props }, forwardedRef) => {
    const { selected } = useContext(AccordionContext)

    return (
      <div
        {...props}
        data-accordion-item=""
        data-state={selected ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = forwardRef(
  ({ children, onClick, ...props }, forwardedRef) => {
    const { buttonId, selectPanel, selected, panelId } = useContext(
      AccordionContext
    )

    return (
      <button
        {...props}
        id={buttonId}
        onClick={wrapEvent(onClick, selectPanel)}
        data-accordion-button=""
        data-state={selected ? 'open' : 'collapsed'}
        aria-expanded={selected}
        aria-controls={panelId}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

AccordionButton.displayName = 'AccordionButton'

/**
 * Accordion Panel
 */

export const AccordionPanel = forwardRef(
  ({ children, ...props }, forwardedRef) => {
    const { buttonId, selected, panelId } = useContext(
      AccordionContext
    )

    return (
      <div
        role="region"
        {...props}
        aria-labelledby={buttonId}
        id={panelId}
        hidden={!selected}
        data-accordion-panel=""
        data-state={selected ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)

AccordionPanel.displayName = 'AccordionPanel'
