import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import {
  Tabs2,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  DataTabs
} from './Tabs'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  // return (
  //   <Tabs2>
  //     <TabList>
  //       <Tab>Login</Tab>
  //       <Tab disabled>Signup</Tab>
  //       <Tab>Another Tab</Tab>
  //     </TabList>
  //     <TabPanels>
  //       <TabPanel>
  //         <LoginForm />
  //       </TabPanel>
  //       <TabPanel>
  //         <SignupForm />
  //       </TabPanel>
  //       <TabPanel>hi</TabPanel>
  //     </TabPanels>
  //     <TabList>
  //       <Tab>Login</Tab>
  //       <Tab>Signup</Tab>
  //     </TabList>
  //   </Tabs2>
  // )

  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />
    },
    {
      label: 'Signup',
      content: <SignupForm />
    }
  ]

  return <DataTabs data={tabData} />
}

ReactDOM.render(<App />, document.getElementById('root'))
