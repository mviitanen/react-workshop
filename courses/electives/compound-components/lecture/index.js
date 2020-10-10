import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

export function Tabs({ data, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="tabs">
      <div className="tab-list">
        {data.map((tab, index) => {
          const selected = index === selectedIndex
          return (
            <button
              key={index}
              role="tab"
              {...props}
              aria-selected={selected}
              className="tab"
              data-selected={selected ? '' : undefined}
              onClick={() => setSelectedIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="tab-panels">
        <div className="tab-panel">{data[selectedIndex].content}</div>
      </div>
    </div>
  )
}

function TabList({ children }) {
  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      index
    })
  })

  return <div>{children}</div>
}

function Tab({ children, index }) {
  return <button onClick={() => setSelectedIndex(index)}></button>
}

function App() {
  return (
    <Tabs>
      <TabList extra>
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
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
