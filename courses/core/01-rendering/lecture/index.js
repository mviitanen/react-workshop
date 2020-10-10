import React from 'react'
import ReactDOM from 'react-dom'
import { MdShoppingCart } from 'react-icons/md'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Button({ handleClick, children }) {
  return (
    <button onClick={handleClick} className="button">
      {children}
    </button>
  )
}

function App() {
  function handleClick() {
    console.log('add stuff to our cart')
  }
  return (
    <div>
      <Button handleClick={handleClick}>
        <MdShoppingCart />
        <span>
          Add to
          <MdShoppingCart /> cart
        </span>
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
