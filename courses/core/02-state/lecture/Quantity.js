import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function App() {
  const [quantity, setQuantity] = useState(0)

  return (
    <div>
      <Report quantity={quantity}></Report>
      <Quantity setQuantity={setQuantity} quantity={quantity}></Quantity>
    </div>
  )
}

function Report({ quantity }) {
  return <h1>App: Quantity({quantity})</h1>
}

function Quantity({ quantity, setQuantity }) {
  const [error, setError] = useState(null)

  function subtract() {
    const newQuantity = quantity - 1
    setQuantity(newQuantity)
    if (newQuantity < 0) {
      setError('Cannot be less than 0')
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
