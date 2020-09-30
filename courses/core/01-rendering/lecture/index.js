import React from 'react'
import ReactDOM from 'react-dom'
// import { FaRegStar, FaStar } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ children, ...props }) {
  return (
    <button className="button" {...props}>
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
        <span>Add to cart</span>
        <MdShoppingCart />
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
