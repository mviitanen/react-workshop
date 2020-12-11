import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function App() {
  const [quantity, setQuantity] = useState(0) // 0

  return (
    <div>
      <Report quantity={quantity}></Report>
      <hr />
      <Quantity quantity={quantity} setQuantity={setQuantity} />
    </div>
  )
}

function Report({ quantity }) {
  return <div>Quantity: {quantity}</div>
}

function Quantity({ quantity, setQuantity }) {
  const [error, setError] = useState(null) // 1

  function subtract() {
    const nextQuantity = quantity - 1
    setQuantity(nextQuantity)
    if (nextQuantity < 0) {
      setError('Cannot be less than zero')
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button onClick={subtract} type="button" className="icon-button">
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button onClick={add} type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}
