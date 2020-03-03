import React, { useState, useReducer } from 'react'
import { FaSignInAlt, FaExclamationCircle } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import Notice from 'YesterTech/Notice'
import Centered from 'YesterTech/Centered'
import api from 'YesterTech/api'

function useMyState(initialValue) {
  let [state, setState] = useReducer(
    (state, newState) => newState,
    initialValue
  )
  return [state, setState]
}

function LoginForm({ onAuthenticated }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ATTEMPTED_SIGNUP':
          return { ...state, loading: true }
        case 'AUTH_ERROR':
          return { ...state, loading: false, error: action.error }
        case 'USERNAME_INPUT':
          return { ...state, user: action.user }
        case 'PASSWORD_INPUT':
          return { ...state, password: action.pw }
        case 'TOGGLE_SHOW_PASSWORD':
          return { ...state, showPassword: !state.showPassword }
        default:
          return state
      }
    },
    {
      username: '',
      password: '',
      error: null,
      loading: false,
      showPassword: false
    }
  )

  let { username, password, error, loading, showPassword } = state
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [showPassword, setShowPassword] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    dispatch({ type: 'ATTEMPTED_SIGNUP' })
    // setLoading(true)
    api.auth
      .login(username, password)
      .then(user => {
        if (typeof onAuthenticated === 'function') {
          onAuthenticated(user)
        }
      })
      .catch(error => {
        dispatch({ type: 'AUTH_ERROR', error })
        // setError(error)
        // setLoading(false)
      })
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            aria-label="Username"
            onChange={e => {
              dispatch({
                type: 'USERNAME_INPUT',
                user: e.target.value
              })
              // setUsername(e.target.value)
            }}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="form-field">
          <input
            aria-label="Password"
            onChange={e => {
              dispatch({ type: 'PASSWORD_INPUT', pw: e.target.value })
              // setPassword(e.target.value)
            }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => {
                dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })
                // setShowPassword(!showPassword)
              }}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{' '}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default LoginForm
