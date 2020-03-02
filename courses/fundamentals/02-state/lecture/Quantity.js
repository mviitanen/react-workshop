import React from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

// I AM REACT
// let domTable = {}
// let el = Quantity(props) // initial state

// createDOM(el, domTable)
// let oldEl = el

// el = Quantity(props) // new state

// let diff = compare(oldEl, el)

// commit(diff)

const states = []
let callCount = -1

function useState(initialValue) {
  const id = ++callCount
  if (states[id]) return states[id]

  let setValue = newValue => {
    states[id][0] = newValue
    renderPhonyHook()
  }
  const tuplé = [initialValue, setValue]
  states.push(tuplé)
  return tuplé
}

export default function Quantity() {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  console.log(states)

  const add = () => {
    setQuantity(quantity + 1)
    setError(null)
  }

  const minus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setError('Greater than 0 pleeeease')
    }
  }

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
        <div className="input-container">{quantity}</div>
        <div>
          <button type="button" className="icon-button" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && (
        <marquee>
          <div style={{ color: 'red' }}>{error}</div>
          <button
            onClick={() => {
              setError(null)
            }}
            className="button"
          >
            Dismiss
          </button>
        </marquee>
      )}
    </div>
  )
}

function renderPhonyHook() {
  callCount = -1
  ReactDOM.render(<Quantity />, document.getElementById('root'))
}
