import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash, FaUser } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  function handleClick() {
    console.log('click')
  }

  return (
    <div>
      <Button onClick={handleClick}>
        <FaUser />
        Add User
        <FaTrash />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
