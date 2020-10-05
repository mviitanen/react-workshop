import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function ActionButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    console.log('logic for adding to the shopping cart')
  }

  return (
    <div>
      <ActionButton onClick={onClick}>
        <MdShoppingCart />
        <span></span>Add to cart
      </ActionButton>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
