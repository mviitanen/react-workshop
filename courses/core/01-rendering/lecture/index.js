import React from 'react'
import ReactDOM from 'react-dom'
import { FaPlus } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function addUser() {
    console.log('add user')
  }
  return (
    <div>
      <Button onClick={addUser}>
        Add User
        <FaPlus />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
