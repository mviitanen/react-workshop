import React, { useState, useContext, useRef, forwardRef } from 'react'
import { wrapEvent, useForkedRef } from '../../utils'
import { useId } from '../../useId'

import {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  useDescendants
} from '@reach/descendants'

const DescendantContext = createDescendantContext('DescendantContext')
const AccordionContext = React.createContext()

/**
 * Accordion
 */

export const Accordion = forwardRef(
  (
    { children, onChange, index: controlledIndex, defaultIndex = 0, id, ...props },
    forwardedRef
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
    const accordionId = useId(id)

    const isControlled = controlledIndex != null
    const { current: startsControlled } = useRef(isControlled)
    if (isControlled !== startsControlled) {
      console.warn('Cannot change from controlled to uncontrolled or vice versa.')
    }

    const [descendants, setDescendants] = useDescendants()

    const context = {
      accordionId,
      selectedIndex,
      isControlled,
      controlledIndex,
      selectPanel: index => {
        onChange && onChange(index)
        if (!isControlled) {
          setSelectedIndex(index)
        }
      }
    }

    return (
      <DescendantProvider context={DescendantContext} items={descendants} set={setDescendants}>
        <AccordionContext.Provider value={context}>
          <div data-accordion="" ref={forwardedRef} {...props}>
            {children}
          </div>
        </AccordionContext.Provider>
      </DescendantProvider>
    )
  }
)

Accordion.displayName = 'Accordion'

/**
 * Accordion Item
 */

const ItemContext = React.createContext()

export const AccordionItem = forwardRef(({ children, ...props }, forwardedRef) => {
  const { accordionId, selectedIndex, isControlled, controlledIndex } = useContext(AccordionContext)
  const accordionItemRef = useRef()

  const ref = useForkedRef(accordionItemRef, forwardedRef)

  const index = useDescendant({
    context: DescendantContext,
    element: accordionItemRef.current
  })

  const context = {
    selected: isControlled ? controlledIndex === index : selectedIndex === index,
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`
  }

  return (
    <ItemContext.Provider value={context}>
      <div
        {...props}
        data-accordion-item=""
        data-state={context.selected ? 'open' : 'collapsed'}
        ref={ref}
      >
        {children}
      </div>
    </ItemContext.Provider>
  )
})

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { panelId, selected, selectPanel } = useContext(AccordionContext)

  return (
    <button
      {...props}
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
})

AccordionButton.displayName = 'AccordionButton'

/**
 * Accordion Panel
 */

export const AccordionPanel = forwardRef(({ children, ...props }, forwardedRef) => {
  const { buttonId, panelId, selected } = useContext(AccordionContext)

  return (
    <div
      role="region"
      {...props}
      id={panelId}
      aria-labelledby={buttonId}
      hidden={!selected}
      data-accordion-panel=""
      data-state={selected ? 'open' : 'collapsed'}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'
