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
    render()
  }

  const state = [defaultState, setState]
  states[callId] = state
  return state
}

function render() {
  calls = -1
  ReactDOM.render(<Quantity />, document.getElementById('root'))
}

export default function Quantity() {
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState(null)

  function subtract() {
    const newQuantity = quantity - 1
    setQuantity(newQuantity)
    if (newQuantity < 0) {
      setError('Cannot be smaller than 0')
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  return (
    <div>
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
            <button
              onClick={add}
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
