import React, { useRef, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

let states = []
let callOrder = -1

function useState(initialValue) {
  let [state, dispatch] = useReducer(
    (state, newValue) => newValue,
    initialValue
  )
  return [state, dispatch]
}

// Phony useState
// function useState(initialValue) {
//   let id = ++callOrder

//   if (states[id]) {
//     return states[id]
//   }

//   function setValue(newValue) {
//     states[id][0] = newValue
//     renderPhonyHooks()
//   }

//   let tuple = [initialValue, setValue]
//   states.push(tuple)
//   return tuple
// }

export default function Quantity() {
  const [quantity, setQuantity] = useState(0) // #1
  const [error, setError] = useState(null) // #2

  let subtractCount = useRef(0)

  function subtract() {
    subtractCount.current = subtractCount.current + 1
    console.log(subtractCount.current)

    if (quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setError('GET ON THE ERROR TRAIN CHOO CHOO 😡😡🥺')
    }
  }

  function add() {
    setError(null)
    setQuantity(quantity + 1)
  }

  return (
    <div>
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
          <div className="input-container">{quantity}</div>
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
      </div>
      {error && (
        <marquee scrollamount={40}>
          <font color="red">
            <div style={{ fontSize: 16 }}>
              <button onClick={() => setError(null)}>
                Dismiss
              </button>
              {error}
            </div>
          </font>
        </marquee>
      )}
    </div>
  )
}

function renderPhonyHooks() {
  callOrder = -1

  ReactDOM.render(
    <Quantity />,
    document.getElementById('root')
  )
}

renderPhonyHooks()
