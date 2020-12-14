import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
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
    console.log('click')
  }
  return (
    <div>
      <Button onClick={onClick}>
        <MdShoppingCart />
        Add to Cart
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
