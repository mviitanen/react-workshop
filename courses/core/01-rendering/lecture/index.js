import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
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
  function onClick() {
    // removing some spam
  }

  return (
    <div>
      <Button onClick={onClick}>Remove Spam</Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
