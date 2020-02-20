import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const initialState = {
  canceled: false,
  status: 'idle', // 'loading' 'success'
  user: null,
}

function loginReducer(state, action) {
  console.log(action)
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        ...state,
        status: 'loading',
      }
    case 'AUTHENTICATED':
      if (state.canceled) {
        return state
      }

      return {
        ...state,
        user: action.user,
        status: 'success',
      }
    case 'CANCEL':
      return {
        ...state,
        canceled: true,
        status: 'canceled',
      }

    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState)

  // const user = state.user;
  const { user } = state

  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: 'CANCEL' })
        }}
      >
        Cancel login
      </button>
      {state.status === 'loading' && <h2>Loading...</h2>}
      {state.status === 'canceled' && <h2>Want to try logging in again?</h2>}
      {user ? (
        <div className="align-center">You are logged in</div>
      ) : (
        <LoginForm
          onLoading={() => {
            dispatch({ type: 'AUTHENTICATE' })
          }}
          onAuthenticated={resultUser => {
            setTimeout(() => {
              console.log('Sending AUTHENTICATED')
              dispatch({
                type: 'AUTHENTICATED',
                user: resultUser,
              })
            }, 3000)
          }}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
