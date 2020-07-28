import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
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
  function removeSpam() {
    console.log('remove spam')
  }

  function addUser() {
    console.log('add user')
  }

  return (
    <div>
      <Button onClick={removeSpam}>
        <span>Remove</span>
        <FaTrash />
        Spam
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
