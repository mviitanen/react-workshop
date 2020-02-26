import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash, FaRegStar, FaStar } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ children }) {
  return (
    <button type="button" className="button matson-special-button">
      {children}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button>
        <FaTrash />
        Remove
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
