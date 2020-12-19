import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, defaultIndex, onChange, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  const context = {
    selectedIndex,
    setSelectedIndex: (index) => {
      setSelectedIndex(index)
      onChange && onChange(index)
    },
  }

  return (
    <TabsContext.Provider value={context}>
      <div className="tabs" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsListContext = React.createContext()

function TabList({ children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    const context = {
      selected: index === selectedIndex,
      onSelect: () => setSelectedIndex(index),
    }

    return <TabsListContext.Provider value={context}>{child}</TabsListContext.Provider>
  })

  return (
    <div className="tab-list" {...props}>
      {children}
    </div>
  )
}

export function wrapEvent(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}

function Tab({ children, onClick, className, ...props }) {
  const { selected, onSelect } = useContext(TabsListContext)

  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      className={`tab ${className}`}
      data-selected={selected ? '' : undefined}
      onClick={wrapEvent(onClick, onSelect)}
    >
      {children}
    </button>
  )
}

function TabPanels({ children, ...props }) {
  const { selectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex,
    })
  })

  return (
    <div className="tab-panels" {...props}>
      {children}
    </div>
  )
}

function TabPanel({ children, selected, ...props }) {
  return (
    <div className="tab-panel" hidden={!selected} {...props}>
      {children}
    </div>
  )
}

function App() {
  const [index, setIndex] = useState(1)

  return (
    <div>
      <p>Tab: {index}</p>
      <Tabs defaultIndex={index} onChange={setIndex}>
        <TabList>
          <Tab
            onClick={(event) => {
              console.log('click login')
            }}
          >
            Login
          </Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
