import React, {
  useState,
  createContext,
  useContext,
  Children
} from 'react'

const TabsContext = createContext()

export function Tabs2({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabListContext = createContext()

export function TabList({ children }) {
  return (
    <div data-reach-tab-list>
      {Children.map(children, (child, index) => {
        return (
          <TabListContext.Provider value={{ index }}>
            {child}
          </TabListContext.Provider>
        )
      })}
    </div>
  )
}

export function Tab({ children, disabled }) {
  const { index } = useContext(TabListContext)
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  const isActive = index === activeIndex

  return (
    <button
      key={index}
      role="tab"
      disabled={disabled}
      aria-selected={isActive}
      data-reach-tab=""
      data-selected={
        disabled ? 'disabled' : isActive ? '' : undefined
      }
      onClick={() => {
        if (!disabled) setActiveIndex(index)
      }}
    >
      {children}
    </button>
  )
}

export function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext)
  return <div data-reach-tab-panels="">{children[activeIndex]}</div>
}

export function TabPanel({ children }) {
  return <div data-reach-tab-panel="">{children}</div>
}

export function DataTabs({
  data,
  tabsPosition = 'top',
  disabled = [],
  ...props
}) {
  const tabs = (
    <TabList>
      {data.map((item, index) => {
        return (
          <Tab key={index} disabled={disabled.includes(index)}>
            {item.label}
          </Tab>
        )
      })}
    </TabList>
  )
  const panels = (
    <TabPanels>
      {data.map((item, index) => {
        return <TabPanel key={index}>{item.content}</TabPanel>
      })}
    </TabPanels>
  )

  return (
    <Tabs2>
      {tabsPosition === 'bottom' ? [panels, tabs] : [tabs, panels]}
    </Tabs2>
  )
}

export function Tabs({
  data,
  tabsPosition = 'top',
  disabled = [],
  ...props
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const tabs = (
    <div data-reach-tab-list>
      {data.map((tab, index) => {
        const selected = index === selectedIndex
        const isDisabled = disabled.includes(index)
        return (
          <button
            key={index}
            role="tab"
            {...props}
            disabled={isDisabled}
            aria-selected={selected}
            data-reach-tab=""
            data-selected={
              isDisabled ? 'disabled' : selected ? '' : undefined
            }
            onClick={() => {
              if (!isDisabled) setSelectedIndex(index)
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )

  const panels = (
    <div data-reach-tab-panels="">
      <div data-reach-tab-panel="">{data[selectedIndex].content}</div>
    </div>
  )

  return (
    <div data-reach-tabs>
      {tabsPosition === 'bottom' ? [panels, tabs] : [tabs, panels]}
    </div>
  )
}
