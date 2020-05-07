import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ children }) {
  return <button className="button">{children}</button>
}

function App() {
  return (
    <div>
      <Button>
        Submit
        <FaTrash />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
