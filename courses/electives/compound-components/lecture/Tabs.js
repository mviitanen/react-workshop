import React, { useState, useContext } from 'react'

const TabContext = React.createContext()

export function Tabs({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <TabContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      <div data-reach-tabs>{children}</div>
    </TabContext.Provider>
  )
}

export function TabList({ children }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isSelected: index === selectedIndex,
      onClick: () => setSelectedIndex(index),
    })
  })

  return <div data-reach-tab-list>{children}</div>
}

export function Tab({ children, isSelected, disabled, onClick, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      disabled={disabled}
      aria-selected={isSelected}
      data-reach-tab=""
      data-selected={isSelected ? '' : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function TabPanels({ children }) {
  const { selectedIndex } = useContext(TabContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isSelected: index === selectedIndex,
    })
  })

  return <div data-reach-tab-panels="">{children}</div>
}

export function TabPanel({ children, isSelected }) {
  return (
    <div data-reach-tab-panel="" hidden={!isSelected}>
      {children}
    </div>
  )
}
