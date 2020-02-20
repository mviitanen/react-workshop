import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function QuantityInput({ quantity, onChange }) {
  return (
    <div className="input-container">
      <div>{quantity}</div>
      <input
        type="number"
        aria-label="quantity"
        value={quantity}
        onChange={event => {
          onChange(parseInt(event.target.value || 0))
        }}
      />
    </div>
  )
}

function Quantity() {
  const [quantity, setQuantity] = useState(1)

  console.log(quantity)

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button type="button" className="icon-button" onClick={() => setQuantity(quantity - 1)}>
            <FaMinusCircle />
          </button>
        </div>
        <QuantityInput quantity={quantity} onChange={setQuantity} />
        <div>
          <button type="button" className="icon-button" onClick={() => setQuantity(quantity + 1)}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
