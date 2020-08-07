import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function App() {
  const [quantity, setQuantity] = useState(0)

  return (
    <div>
      <Quantity quantity={quantity} setQuantity={setQuantity} />
      <Report quantity={quantity} />
    </div>
  )
}

function Report({ quantity }) {
  return <div>Report: {quantity}</div>
}

function Quantity({ quantity, setQuantity }) {
  function subtract() {
    setQuantity(quantity - 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={subtract}
            type="button"
            className="icon-button"
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}
