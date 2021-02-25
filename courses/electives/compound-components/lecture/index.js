import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = React.createContext()

export function Tabs({ children, ...props }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const context = {
    selectedIndex,
    setSelectedIndex,
  }

  return (
    <TabsContext.Provider value={context}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }) {
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      isSelected: index === selectedIndex,
      onClick: () => setSelectedIndex(index),
    })
  })

  return <div className="tab-list">{children}</div>
}

function Tab({ children, isSelected, onClick, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      aria-selected={isSelected}
      className="tab"
      data-selected={isSelected ? '' : undefined}
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
      isSelected: index === selectedIndex,
    })
  })

  return <div className="tab-panels">{children}</div>
}

function TabPanel({ children, isSelected, ...props }) {
  return isSelected ? (
    <div className="tab-panel" {...props}>
      {children}
    </div>
  ) : null
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
        <TabPanel id="the-end">
          <SignupForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
