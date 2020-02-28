import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function BigForm({ defaultFields }) {
  let [fields, setFields] = useState(defaultFields)

  // render a bunch of inputs
}

function Quantity() {
  const [quantity, setQuantity] = useState(100)
  const [error, setError] = useState(null)

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setError('PLZ NO')
    }
  }

  function add() {
    setQuantity(quantity + 1)
    setError(null)
  }

  function onBlur(e) {
    let value = e.target.value
    if (value.length === 0) {
      setQuantity(0)
    } else if (value.match(/^[0-9]*$/)) {
      setQuantity(parseInt(e.target.value))
    }
  }

  console.log(quantity)

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={subtract}
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            defaultValue={quantity}
            onBlur={onBlur}
          />
        </div>
        <div>
          <button
            type="button"
            className="icon-button"
            onClick={add}
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: `hsl(${quantity}, 100%, 50%)`,
          width: 50,
          height: 50,
        }}
      ></div>
    </div>
  )
}

export default Quantity
