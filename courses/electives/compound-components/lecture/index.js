import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(1)

  const context = {
    selectedIndex,
    setSelectedIndex
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabList({ children, as: Comp = 'div', ...props }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex,
      onClick: () => setSelectedIndex(index)
    })
  })

  return (
    <Comp {...props} className="tab-list">
      {children}
    </Comp>
  )
}

function Tab({ children, selected, onClick, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      className="tab"
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

  return <div className="tab-panels">{children}</div>
}

function TabPanel({ children, selected, ...props }) {
  return (
    <div {...props} className="tab-panel" hidden={!selected}>
      {children}
    </div>
  )
}

function App() {
  return (
    <>
      <Tabs>
        <div>
          <TabList as="section">
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
        </div>
        <div>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignupForm />
            </TabPanel>
          </TabPanels>
        </div>
      </Tabs>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
