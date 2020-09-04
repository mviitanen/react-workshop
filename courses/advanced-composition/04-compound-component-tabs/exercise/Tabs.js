import React, { useState, useContext, forwardRef, useRef } from 'react'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

const TabsContext = React.createContext()

export const Tabs = ({ children, defaultSelectedIndex = 0, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex)

  const context = {
    selectedIndex,
    setSelectedIndex
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} data-tabs="">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabContext = React.createContext()

export const TabList = ({ children, ...props }) => {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    const context = {
      selected: index === selectedIndex,
      onClick: () => setSelectedIndex(index)
    }
    return <TabContext.Provider children={child} value={context} />
  })

  return (
    <div {...props} data-tab-list="">
      {children}
    </div>
  )
}

export const Tab = ({ children, ...props }) => {
  const { selected, onClick } = useContext(TabContext)
  return (
    <div
      {...props}
      data-tab=""
      onClick={onClick}
      data-selected={selected ? '' : undefined}
    >
      {children}
    </div>
  )
}

const TabPanelContext = React.createContext()

export const TabPanels = ({ children, ...props }) => {
  const { selectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    const context = {
      selected: index === selectedIndex
    }
    return <TabPanelContext.Provider children={child} value={context} />
  })

  return (
    <div {...props} data-tab-panels="">
      {children}
    </div>
  )
}

export const TabPanel = ({ children, ...props }) => {
  const { selected } = useContext(TabPanelContext)
  return (
    <div {...props} data-tab-panel="" hidden={!selected}>
      {children}
    </div>
  )
}
