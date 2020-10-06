import React from 'react'
import ReactDOM from 'react-dom'

import someAngularStuff from 'angular-stuff'

const AppContext = React.createContext()

function App() {
  return (
    <AppContext.Provider value={someAngularStuff}>
      <PrimaryNav></PrimaryNav>
      <ReactBody></ReactBody>
    </AppContext.Provider>
  )
}

function ReactBody() {
  return ReactDOM.createPortal(<div>react body</div>, document.getElementById('react-body'))
}

function PrimaryNav() {
  return ReactDOM.createPortal(
    <div>created by react (c)</div>,
    document.getElementById('react-nav')
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
