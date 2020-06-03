import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ children }) {
  return (
    <button className="button" type="button">
      {children}
    </button>
  )
}

function App() {
  return (
    <div id="app">
      <Button>
        Remove <FaTrash />
        Report
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
