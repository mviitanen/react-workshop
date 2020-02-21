import React, { useState, useContext, createContext, Children, useEffect } from 'react'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

// const TabsContext = createContext()

// function TabPanels({ data }) {
//   const { activeIndex } = useContext(TabsContext)

//   return <div data-reach-tab-panels>{data[activeIndex].content}</div>
// }

// function Tab({ index, children }) {
//   const { activeIndex, disabled, setActiveIndex } = useContext(TabsContext)
//   const isActive = index === activeIndex
//   const isDisabled = disabled.includes(index)

//   return (
//     <div
//       data-reach-tab
//       key={index}
//       className={isDisabled ? 'disabled' : isActive ? 'active' : ''}
//       onClick={() => (!isDisabled ? setActiveIndex(index) : {})}
//     >
//       {children}
//     </div>
//   )
// }

// function TabList({ data }) {
//   return (
//     <div data-reach-tab-list>
//       {data.map((tab, index) => {
//         return <Tab index={index}>{tab.label}</Tab>
//       })}
//     </div>
//   )
// }

// function Tabs({ disabled = [], children }) {
//   const [activeIndex, setActiveIndex] = useState(0)

//   return (
//     <div data-reach-tabs>
//       <TabsContext.Provider
//         value={{
//           activeIndex,
//           disabled,
//           setActiveIndex,
//         }}
//       >
//         {children}
//       </TabsContext.Provider>
//     </div>
//   )
// }

// function App() {
//   const tabData = [
//     {
//       label: 'Login',
//       content: <LoginForm />,
//     },
//     {
//       label: 'Signup',
//       content: <SignupForm />,
//     },
//   ]

//   return (
//     <div>
//       <Tabs disabled={[]}>
//         <TabPanels data={tabData} />
//         <TabList data={tabData} />
//       </Tabs>
//     </div>
//   )
// }

// [state, effect]

const TimerContext = createContext()

function DoNotCare() {
  console.log('Do not rerender me', Date.now())

  return <div>Do not rerender me</div>
}

function Count() {
  const timer = useContext(TimerContext)
  const [count, setCount] = useState('--')

  useEffect(() => {
    const listener = c => setCount(c)

    timer.subscribe(listener)

    return timer.unsubscribe
  }, [timer])

  return (
    <div>
      <strong>I counted: {count}</strong>
    </div>
  )
}

const timer = (() => {
  let count = 0

  const listeners = new Set()
  setInterval(() => {
    count++
    listeners.forEach(listener => {
      listener(count)
    })
  }, 1000)

  return {
    subscribe: listener => {
      listeners.add(listener)
      listener(count)
    },
    unsubscribe: listener => {
      listeners.delete(listener)
    },
  }
})()

function App() {
  return (
    <TimerContext.Provider value={timer}>
      <div>
        {/* <h1>Hello world: {counter}</h1> */}
        <Count />
        <Count />
        <DoNotCare />
        <Count />
      </div>
    </TimerContext.Provider>
  )
}

export default App
