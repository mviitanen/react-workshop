import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, setQuantity] = useState(1)

  function subtract() {
    setQuantity(quantity - 1)
  }

  function add() {
    setQuantity(quantity + 1)
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
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity + 2}
            onChange={event => {
              setQuantity(parseInt(event.target.value, 10))
            }}
          />
        </div>
        <div>
          <button onClick={add} type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
