import React, { useState, useContext, forwardRef, useRef } from 'react'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

const TabsContext = React.createContext()

export const Tabs = ({
  children,
  defaultIndex = 0,
  index: controlledIndex,
  onChange,
  ...props
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  const tabsId = useId()

  const isControlled = controlledIndex != null

  const context = {
    tabsId,
    selectedIndex: isControlled ? controlledIndex : selectedIndex,
    setSelected: index => {
      setSelectedIndex(index)
      onChange && onChange(index)
    }
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} data-tabs="">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabListContext = React.createContext()

export const TabList = ({ children, ...props }) => {
  const { tabsId, setSelected, selectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    const tabId = `tabs-${tabsId}-tab-${index}`
    const panelId = `tabs-${tabsId}-panel-${index}`

    const context = {
      selected: index === selectedIndex,
      onSelect: () => setSelected(index)
    }
    return <TabListContext.Provider value={context} children={child} />
  })

  return (
    <div {...props} data-tab-list="">
      {children}
    </div>
  )
}

export const Tab = ({ children, onClick, ...props }) => {
  const { onSelect, selected, tabId } = useContext(TabListContext)

  return (
    <div
      {...props}
      id={tabId}
      data-tab=""
      onClick={wrapEvent(onClick, onSelect)}
      data-selected={selected ? '' : undefined}
    >
      {children}
    </div>
  )
}

const TabPanelsContext = React.createContext()

export const TabPanels = ({ children, ...props }) => {
  const { selectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    const context = {
      selected: index === selectedIndex
    }
    return <TabPanelsContext.Provider value={context} children={child} />
  })

  return (
    <div {...props} data-tab-panels="">
      {children}
    </div>
  )
}

export const TabPanel = ({ children, ...props }) => {
  const { selected } = useContext(TabPanelsContext)
  return (
    <div {...props} data-tab-panel="" hidden={!selected}>
      {children}
    </div>
  )
}
