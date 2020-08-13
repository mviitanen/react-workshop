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
      <div data-reach-tabs {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabList({ children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex,
      onClick: () => setSelectedIndex(index)
    })
  })

  return (
    <div data-reach-tab-list {...props}>
      {children}
    </div>
  )
}

function Tab({ children, selected, disabled, onClick, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      data-reach-tab=""
      disabled={disabled}
      data-selected={selected ? '' : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function TabPanels({ children }) {
  const { selectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex
    })
  })
  return <div data-reach-tab-panels="">{children}</div>
}

function TabPanel({ children, selected }) {
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
        <Tab>Login</Tab>
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
