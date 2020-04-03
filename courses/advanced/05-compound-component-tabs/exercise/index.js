import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs'
import { TaskOne, TaskTwo, TaskThree } from './Tasks'
import Heading from 'YesterTech/Heading'
import './styles.scss'

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab index={0}>Task One</Tab>
        <Tab index={1}>Task Two</Tab>
        <Tab index={2}>Task Three</Tab>
      </TabList>
      <TabPanels>
        <TabPanel index={0} className="spacing">
          <Heading size={3}>Primary Tasks</Heading>
          <TaskOne />
        </TabPanel>
        <TabPanel index={1} className="spacing">
          <Heading size={3}>Bonus Tasks</Heading>
          <TaskTwo />
        </TabPanel>
        <TabPanel index={2} className="spacing">
          <Heading size={3}>Bonus Tasks</Heading>
          <TaskThree />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
