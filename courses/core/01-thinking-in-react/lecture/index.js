import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  function onClick() {
    // logic adding to cart
    console.log('here')
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
