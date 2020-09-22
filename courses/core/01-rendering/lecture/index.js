import React from 'react'
import ReactDOM from 'react-dom'
import { FaPlus } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function App() {
  function addToCart() {
    console.log('add to the shopping cart')
  }

  return (
    <div>
      <Button onClick={addToCart}>
        <MdShoppingCart />
        Add to cart
      </Button>
    </div>
  )
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
