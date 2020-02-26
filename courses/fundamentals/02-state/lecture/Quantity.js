import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

// const states = []
// let calls = -1

// function useState(value) {
//   const callId = ++calls

//   if (states[callId]) {
//     return states[callId]
//   }

//   function setValue(newValue) {
//     states[callId][0] = newValue
//     reRender()
//   }

//   const state = [value, setValue]
//   states[callId] = state
//   return state
// }

// function reRender() {
//   calls = -1
//   ReactDOM.render(<Quantity />, document.getElementById('root'))
// }

export default function Quantity() {
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState('')

  function subtractQuantity() {
    const nextQuantity = quantity - 1
    setQuantity(nextQuantity)
    if (nextQuantity < 0) {
      setError('Cannot be smaller than 0')
    }
  }

  function addQuantity() {
    setQuantity(quantity + 1)
  }

  const output = (
    <div>
      <div className="quantity-picker">
        <div>
          <div>
            <button onClick={subtractQuantity} type="button" className="icon-button">
              <FaMinusCircle />
            </button>
          </div>
          <div className="input-container">{quantity}</div>
          <div>
            <button onClick={addQuantity} type="button" className="icon-button">
              <FaPlusCircle />
            </button>
          </div>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  )

  console.log(output)
  return output
}
