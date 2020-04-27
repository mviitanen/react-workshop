import React from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

const states = []
let calls = -1

function useState(defaultState) {
  const callId = ++calls

  if (states[callId]) {
    return states[callId]
  }

  function setState(newState) {
    states[callId][0] = newState
    calls = -1
    reRender()
  }

  const state = [defaultState, setState]
  states[callId] = state
  return state
}

function reRender() {
  ReactDOM.render(<Quantity />, document.getElementById('root'))
}

export default function Quantity() {
  const [quantity, setQuantity] = useState(7)
  const [error, setError] = useState(null)

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
        <div className="input-container">{quantity}</div>
        <div>
          <button
            onClick={() => {
              setQuantity(quantity + 1)
            }}
            type="button"
            className="icon-button"
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}
