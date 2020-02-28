import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

// 0
// 0 + 1 = 1
// 1 + 2 + 2

function App() {
  let [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'LOGGED_IN') {
        return { ...state, user: action.user }
      }
      throw new Error('Unknown action: ' + action.type)
    },
    { user: null }
  )

  return (
    <div>
      {state.user ? (
        <div className="align-center">
          You are logged in
        </div>
      ) : (
        <LoginForm
          onAuthenticated={user => {
            dispatch({ type: 'LOGGED_IN', user })
          }}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
