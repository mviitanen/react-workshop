import React from 'react'
import ReactDOM from 'react-dom'
import { FaTrash } from 'react-icons/fa'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button(props) {
  return (
    <button type="type" className="special-adobe-button button">
      {props.children}
    </button>
  )
}

function App() {
  return (
    <div className="app">
      <Button>
        Remove <FaTrash /> Feature
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
