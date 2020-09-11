import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const context = {
    selectedIndex,
    setSelectedIndex
  }

  return (
    <TabsContext.Provider value={context}>
      <div className="tabs" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabListContext = React.createContext()

function TabList({ children, ...props }) {
  children = React.Children.map(children, (child, index) => {
    return <TabListContext.Provider value={index}>{child}</TabListContext.Provider>
  })

  return (
    <div className="tab-list" {...props}>
      {children}
    </div>
  )
}

function Tab({ children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)
  const index = useContext(TabListContext)
  const selected = index === selectedIndex
  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      className="tab"
      data-selected={selected ? '' : undefined}
      onClick={() => setSelectedIndex(index)}
    >
      {children}
    </button>
  )
}

function TabPanels({ children }) {
  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      index
    })
  })

  return <div className="tab-panels">{children}</div>
}

function TabPanel({ children, index }) {
  const { selectedIndex } = useContext(TabsContext)
  const selected = index === selectedIndex
  return (
    <div className="tab-panel" hidden={!selected}>
      {children}
    </div>
  )
}

function App() {
  return (
    <Tabs>
      <TabList>
        <span>
          <Tab>Login</Tab>
        </span>
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
      <TabList>
        <Tab>Login</Tab>
        <Tab>Signup</Tab>
      </TabList>
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
