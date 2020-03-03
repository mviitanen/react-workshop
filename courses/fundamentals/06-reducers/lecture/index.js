import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

let array = [1, 2, 3, 4, 5]
let add = (x, y) => x + y
let sum = array.reduce(add, 0)
// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
// 10 + 5
// 15

const initialState = {
  count: 0,
  user: {},
  cake: true
}
const actions = [
  { type: 'ADD', by: 2 },
  { type: 'MINUS', by: 4 },
  { type: 'EAT_CAKE' }
]
function reducer(state, action) {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + action.by }
  } else if (action.type === 'MINUS') {
    return { ...state, count: state.count - action.by }
  } else if (action.type === 'EAT_CAKE') {
    return { ...state, cake: false }
  }
}

console.log(actions.reduce(reducer, initialState))

function useMyReducer() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'SET_USER') {
        return { ...state, user: action.user }
      }
    },
    {
      user: null
    }
  )
  return [state, dispatch]
}

function App() {
  // const [user, setUser] = useState(null)
  const [state, dispatch] = useMyReducer()

  let { user } = state

  return (
    <div>
      {user ? (
        <div className="align-center">You are logged in</div>
      ) : (
        <LoginForm
          onAuthenticated={user => {
            dispatch({ type: 'SET_USER', user })
          }}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
