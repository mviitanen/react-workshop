import React from 'react'
import ReactDOM from 'react-dom'
// import { FaRegStar, FaStar } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <div>
      <button onClick={onClick} type="button" className="adobe-button button">
        {children}
      </button>
    </div>
  )
}

function App() {
  function onClick() {
    console.log('this is the logic for shopping cart adding')
  }
  return (
    <div>
      <Button onClick={onClick}>
        <MdShoppingCart />
        <span>Add to cart</span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
