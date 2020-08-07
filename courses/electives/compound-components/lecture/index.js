import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const context = {
    selectedIndex,
    setSelectedIndex
  }

  return (
    <TabsContext.Provider value={context}>
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }) {
  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      index
    })
  })

  return <div data-reach-tab-list>{children}</div>
}

function Tab({ children, index, disabled, ...rest }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)
  const selected = index === selectedIndex

  return (
    <button
      role="tab"
      {...rest}
      aria-selected={selected}
      disabled={disabled}
      data-reach-tab=""
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

  return <div data-reach-tab-panels="">{children}</div>
}

function TabPanel({ children, index }) {
  const { selectedIndex } = useContext(TabsContext)
  const selected = index === selectedIndex
  return (
    <div data-reach-tab-panel="" hidden={!selected}>
      {children}
    </div>
  )
}

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab aria-label="foo">Login</Tab>
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
