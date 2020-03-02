import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

// npm start lecture
// 3

function Quantity() {
  const [quantity, setQuantity] = useState(1)

  const add = () => {
    setQuantity(quantity + 1)
  }

  const minus = () => {
    setQuantity(quantity - 1)
  }

  // event -> update dom

  // event + event + event -> state -> update dom

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={minus}
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={e => {
              setQuantity(parseInt(e.target.value))
            }}
          />
        </div>
        <div>
          <button type="button" className="icon-button" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
