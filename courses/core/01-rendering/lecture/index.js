import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button" type="button">
      {children}
    </button>
  )
}

function App() {
  function removeCard() {
    console.log('remove card')
  }

  function removeUser() {
    console.log('remove user')
  }

  return (
    <div>
      <Button onClick={removeCard}>
        Remove <FaTrash></FaTrash>
        <span>Card</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
