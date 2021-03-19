import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button onClick={() => {}}>
        <span>
          Remove <FaTrash color="blue" /> Task
        </span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
