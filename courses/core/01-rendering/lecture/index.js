import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash, FaPlus } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
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
        Remove<FaTrash></FaTrash> Spam
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
