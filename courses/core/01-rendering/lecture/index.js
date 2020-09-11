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
  return (
    <div>
      <Button onClick={() => {}}>
        <span>
          Remove <FaTrash />
          Spam
        </span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
