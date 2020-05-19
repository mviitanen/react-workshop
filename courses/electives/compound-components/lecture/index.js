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

function TabList({ children }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex,
      onClick: () => setSelectedIndex(index)
    })
  })

  return <div data-reach-tab-list>{children}</div>
}

function Tab({ children, selected, onClick, disabled, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      disabled={disabled}
      data-reach-tab=""
      data-selected={selected ? '' : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function TabPanels({ children }) {
  const { selectedIndex } = useContext(TabsContext)
  return (
    <div data-reach-tab-panels="">
      <div data-reach-tab-panel="">{children[selectedIndex]}</div>
    </div>
  )
}

function TabPanel({ children, ...rest }) {
  return React.cloneElement(children, { ...rest })
}

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Singup</Tab>
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
