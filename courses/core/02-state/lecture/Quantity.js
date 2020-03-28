import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  const [quantity, setQuantity] = useState(4)
  const [error, setError] = useState(null)

  function subtractQuantity() {
    const newQuantity = quantity - 1
    setQuantity(newQuantity)
    if (newQuantity < 0) {
      setError('Cannot be smaller than 0')
    }
  }

  function addQuantity() {
    setQuantity(quantity + 1)
  }

  return (
    <div>
      <div className="quantity-picker">
        <div>
          <div>
            <button
              onClick={subtractQuantity}
              type="button"
              className="icon-button"
            >
              <FaMinusCircle />
            </button>
          </div>
          <div className="input-container">{quantity}</div>
          <div>
            <button
              onClick={addQuantity}
              type="button"
              className="icon-button"
            >
              <FaPlusCircle />
            </button>
          </div>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}
