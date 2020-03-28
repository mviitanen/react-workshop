import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStar, FaTrash } from 'react-icons/fa'
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
  function handleClick() {
    console.log('click')
  }

  return (
    <div>
      <span>Hello again</span>
      <Button onClick={handleClick}>
        Remove User
        <FaTrash />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
