import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={() => {
              setQuantity(quantity - 1)
            }}
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
            value={quantity}
            onChange={event => {
              setQuantity(parseInt(event.target.value, 10))
            }}
          />
        </div>
        <div>
          <button type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
